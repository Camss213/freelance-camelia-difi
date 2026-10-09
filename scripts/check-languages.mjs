import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const page = await browser.newPage();
// Mock the Netlify handler; this local check never sends a real message.
await page.route('http://127.0.0.1:5173/', async route => {
  if (route.request().method() !== 'POST') return route.continue();
  const body = new URLSearchParams(route.request().postData());
  assert.equal(body.get('form-name'), 'contact');
  assert.equal(body.get('language'), 'en');
  assert.equal(body.get('email'), 'camille@example.com');
  await route.fulfill({ status: 200, body: 'Accepted' });
});
// Keep this local smoke check independent of external font services.
await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ contentType: 'text/css', body: '' }));
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
try {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await context.route('https://fonts.googleapis.com/**', route => route.fulfill({ contentType: 'text/css', body: '' }));
  const staticPage = await context.newPage();
  await staticPage.goto('http://127.0.0.1:5173/en/');
  assert.match(await staticPage.locator('h1').innerText(), /Freelance web developer in Lyon/i);
  assert.equal(await staticPage.locator('html').getAttribute('lang'), 'en');
  assert.equal(await staticPage.locator('link[rel="canonical"]').getAttribute('href'), 'https://freelance.camelia-difi.com/en/');
  assert.equal(await staticPage.locator('link[hreflang="fr"]').getAttribute('href'), 'https://freelance.camelia-difi.com/');
  assert.equal(await staticPage.locator('link[hreflang="en"]').getAttribute('href'), 'https://freelance.camelia-difi.com/en/');
  assert.match(await staticPage.title(), /Freelance web developer/);
  const data = JSON.parse(await staticPage.locator('script[type="application/ld+json"]').textContent());
  assert.equal(data['@graph'].find(entity => entity['@type'] === 'WebPage').url, 'https://freelance.camelia-difi.com/en/');
  await context.close();
  for (const width of [1440, 1024, 820, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://127.0.0.1:5173/');
    await page.getByRole('link', { name: 'English', exact: true }).click();
    await page.waitForURL('**/en/');
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `EN overflow at ${width}`);
    assert.equal(await page.getByRole('link', { name: 'Download my CV (English)' }).count(), 1);
    if (width < 800) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.locator('#main-nav').getByRole('link', { name: 'About', exact: true }).click();
      assert.equal(await page.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'), 'false');
    }
    await page.getByRole('button', { name: 'Do you work remotely?' }).click();
    assert.match(await page.locator('#answer-0').innerText(), /Yes\. I work remotely/);
    await page.locator('#name').fill('Camille Test');
    await page.locator('#email').fill('camille@example.com');
    await page.locator('#message').fill('I would like to build a business application.');
    await page.getByRole('button', { name: 'Send my message' }).click();
    await page.getByRole('status').waitFor();
    assert.match(await page.getByRole('status').innerText(), /Your message has been sent/);
    if (width === 390 || width === 1440) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: `artifacts/english-${width}.png`, fullPage: true });
    }
    await page.getByRole('link', { name: 'Français', exact: true }).click();
    await page.waitForURL('http://127.0.0.1:5173/');
    assert.equal(await page.locator('html').getAttribute('lang'), 'fr');
    console.log(`FR/EN switch, English layout and interactions: ${width}px OK`);
  }
  await page.goto('http://127.0.0.1:5173/en/legal-notice.html');
  assert.match(await page.locator('h1').innerText(), /Legal notice/);
  const cvResponse = await page.request.get('http://127.0.0.1:5173/cv/Camelia_Difi_CV_EN.pdf');
  assert.equal(cvResponse.status(), 200);
  assert.match(cvResponse.headers()['content-type'], /application\/pdf/);
  assert.deepEqual(await cvResponse.body(), await readFile('public/cv/Camelia_Difi_CV_EN.pdf'));
  assert.deepEqual(errors, [], 'Browser or hydration errors');
  console.log('English static SEO, legal notice and CV PDF download OK; no browser errors.');
} finally { await browser.close(); }
