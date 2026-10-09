import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Verify the deploy-time definition and user-visible submissions share the same schema.
for (const path of ['dist/index.html', 'dist/en/index.html']) {
  const html = await readFile(path, 'utf8');
  assert.match(html, /data-netlify="true" netlify-honeypot="bot-field"/);
  for (const name of ['form-name', 'name', 'email', 'message', 'language', 'bot-field']) {
    assert.equal((html.match(new RegExp(`name="${name}"`, 'g')) || []).length, 2, `${path}: ${name}`);
  }
  assert.doesNotMatch(html, /mailto:[^"]+\?subject=/);
}
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage();
  await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ contentType: 'text/css', body: '' }));
  for (const [language, url, button, sending, success] of [
    ['fr', '/', 'Envoyer mon message', 'Envoi en cours…', /Votre message a bien été envoyé/],
    ['en', '/en/', 'Send my message', 'Sending…', /Your message has been sent/],
  ]) {
    let requests = 0;
    let release;
    const gate = new Promise(resolve => { release = resolve; });
    const pending = [];
    await page.route('http://127.0.0.1:5173/', async route => {
      if (route.request().method() !== 'POST') return route.continue();
      requests += 1;
      const data = new URLSearchParams(route.request().postData());
      assert.equal(data.get('form-name'), 'contact');
      assert.equal(data.get('language'), language);
      assert.equal(data.get('name'), 'Camille & Test');
      assert.equal(data.get('email'), 'camille@example.com');
      assert.equal(data.get('message'), 'Projet & besoins : café, React + cloud.');
      assert.equal(data.get('bot-field'), '');
      if (requests === 1) return route.fulfill({ status: 503, body: 'Unavailable' });
      pending.push(route);
      await gate;
      await route.fulfill({ status: 200, body: 'Accepted' });
    });
    await page.goto(`http://127.0.0.1:5173${url}`);
    await page.getByRole('button', { name: button, exact: true }).click();
    assert.equal(requests, 0, 'An invalid form must not submit');
    await page.locator('#name').fill('Camille & Test');
    await page.locator('#email').fill('camille@example.com');
    await page.locator('#message').fill('Projet & besoins : café, React + cloud.');
    await page.getByRole('button', { name: button, exact: true }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    assert.equal(await page.getByRole('status').count(), 0, 'No success on server error');
    assert.equal(await page.locator('#message').inputValue(), 'Projet & besoins : café, React + cloud.');
    await page.getByRole('button', { name: button, exact: true }).click();
    await expect(page.getByRole('button', { name: sending, exact: true })).toBeDisabled();
    await expect(page.locator('#message')).toBeDisabled();
    assert.equal(requests, 2);
    release();
    await expect(page.getByRole('status')).toContainText(success);
    await expect(page.locator('#message')).toHaveValue('');
    assert.equal(await page.getByRole('alert').count(), 0);
    assert.equal(page.url(), `http://127.0.0.1:5173${url}`, 'Submission stays on the page');
    await page.unroute('http://127.0.0.1:5173/');
    console.log(`${language}: validation, encoded POST, error recovery, pending state and confirmation OK (mock backend).`);
  }
  const noJavaScript = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJavaScript.newPage();
  for (const [path, action] of [['/', '/merci.html'], ['/en/', '/en/thank-you.html']]) {
    await staticPage.goto(`http://127.0.0.1:5173${path}`);
    assert.equal(await staticPage.locator('.contact-form').getAttribute('action'), action);
    assert.equal(await staticPage.locator('.contact-form').getAttribute('method'), 'POST');
    assert.equal((await staticPage.request.get(`http://127.0.0.1:5173${action}`)).status(), 200);
  }
  await noJavaScript.close();
  console.log('Netlify static detection and native no-JavaScript fallback OK. No real emails sent.');
} finally { await browser.close(); }
