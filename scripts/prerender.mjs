import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';

// Generate HTML from the same React components used in the browser.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx');
  const path = new URL('../dist/index.html', import.meta.url);
  const template = await readFile(path, 'utf8');
  if (!template.includes('<div id="root"></div>')) throw new Error('Missing prerender placeholder');
  await writeFile(path, template.replace('<div id="root"></div>', `<div id="root">${render()}</div>`));
  console.log('HTML React pré-rendu : contenu disponible sans JavaScript.');
} finally {
  await server.close();
}
