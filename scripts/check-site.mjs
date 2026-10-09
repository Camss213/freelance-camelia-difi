import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
const errors = [];
// Vite preview has no form backend. Simulate acceptance without sending any email.
await page.route('http://127.0.0.1:5173/', async route => {
  if (route.request().method() !== 'POST') return route.continue();
  const body = new URLSearchParams(route.request().postData());
  assert.equal(body.get('form-name'), 'contact');
  assert.equal(body.get('language'), 'fr');
  assert.equal(body.get('email'), 'camille@example.com');
  await route.fulfill({ status: 200, body: 'Accepted' });
});
page.on('pageerror', error => errors.push(error.message));
await mkdir('artifacts', { recursive: true });

try {
  const noJavaScript = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJavaScript.newPage();
  await staticPage.goto('http://127.0.0.1:5173');
  assert.match(await staticPage.locator('h1').innerText(), /Développeuse web freelance à Lyon/i);
  assert.equal(await staticPage.locator('h1').count(), 1);
  assert.equal(await staticPage.locator('#expertises').isVisible(), true);
  assert.equal(await staticPage.locator('#contact').isVisible(), true);
  assert.equal(await staticPage.locator('link[rel="canonical"]').getAttribute('href'), 'https://freelance.camelia-difi.com/');
  assert.match(await staticPage.title(), /Développeuse web freelance à Lyon/);
  const structuredData = JSON.parse(await staticPage.locator('script[type="application/ld+json"]').textContent());
  assert.equal(structuredData['@graph'].find(entity => entity['@type'] === 'Person').name, 'Camelia Difi');
  const sitemap = await staticPage.request.get('http://127.0.0.1:5173/sitemap.xml');
  assert.equal(sitemap.status(), 200);
  assert.match(await sitemap.text(), /<loc>https:\/\/freelance.camelia-difi.com\/<\/loc>/);
  const robots = await staticPage.request.get('http://127.0.0.1:5173/robots.txt');
  assert.equal(robots.status(), 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/freelance.camelia-difi.com\/sitemap.xml/);
  const socialCard = await staticPage.request.get('http://127.0.0.1:5173/social-card.png');
  assert.equal(socialCard.status(), 200);
  assert.match(socialCard.headers()['content-type'], /image\/png/);
  await noJavaScript.close();
  console.log('SEO: visible HTML without JavaScript, canonical, metadata, structured data, sitemap, robots and social image OK.');
  for (const [name, width, height] of [['desktop', 1440, 1050], ['tablet', 768, 1024], ['mobile', 390, 844], ['small-mobile', 320, 740]]) {
    await page.setViewportSize({ width, height });
    await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
    await page.locator('h1').waitFor();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    if (overflow) console.log(await page.evaluate(() => [...document.querySelectorAll('body *')].map(element => ({ tag: element.tagName, className: element.getAttribute('class'), right: element.getBoundingClientRect().right, left: element.getBoundingClientRect().left })).filter(element => element.right > innerWidth || element.left < 0)));
    assert.equal(overflow, false, `${name}: horizontal overflow`);
    if (width < 800) {
      await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
      await page.locator('#main-nav').getByRole('link', { name: 'Expertises', exact: true }).click();
      assert.equal(await page.getByRole('button', { name: 'Ouvrir le menu' }).getAttribute('aria-expanded'), 'false');
    }
    await page.getByRole('button', { name: 'Travaillez-vous à distance ?' }).click();
    assert.equal(await page.locator('#answer-0').isVisible(), true);
    await page.getByRole('button', { name: 'Comment sont calculés les tarifs ?' }).click();
    assert.equal(await page.locator('#answer-0').isVisible(), false);
    assert.equal(await page.locator('#answer-1').isVisible(), true);
    await page.locator('#name').fill('Camille Test');
    await page.locator('#email').fill('camille@example.com');
    await page.locator('#message').fill('Bonjour, je souhaite créer une application métier.');
    await page.getByRole('button', { name: 'Envoyer mon message' }).click();
    await page.getByRole('status').waitFor();
    assert.match(await page.getByRole('status').innerText(), /Votre message a bien été envoyé/);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.screenshot({ path: `artifacts/${name}.png`, fullPage: true });
    console.log(`${name}: layout, FAQ, contact${width < 800 ? ', mobile navigation' : ''} OK`);
  }
  assert.deepEqual(errors, [], 'Browser runtime errors');
  console.log('No browser runtime errors.');
} finally {
  await browser.close();
}
