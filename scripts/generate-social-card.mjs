import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const svg = await readFile(new URL('../public/social-card.svg', import.meta.url), 'utf8');
  await page.setContent(`<style>body{margin:0}</style>${svg}`);
  await page.screenshot({ path: fileURLToPath(new URL('../public/social-card.png', import.meta.url)) });
} finally {
  await browser.close();
}
