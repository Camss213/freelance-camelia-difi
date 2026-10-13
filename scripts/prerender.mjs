import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createServer } from 'vite';

// Generate HTML from the same React components used in the browser.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx');
  const path = new URL('../dist/index.html', import.meta.url);
  const template = await readFile(path, 'utf8');
  if (!template.includes('<div id="root"></div>')) throw new Error('Missing prerender placeholder');
  await writeFile(path, template.replace('<div id="root"></div>', `<div id="root">${render('fr')}</div>`));
  const title = 'Camelia Difi | Freelance Web, Software & Mobile Developer in Lyon';
  const description = 'Camelia Difi, freelance developer in Lyon: custom websites, business software and mobile apps, from idea to launch.';
  let english = template
    .replace('<html lang="fr">', '<html lang="en">')
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]+/, `$1${description}`)
    .replace(/(<link rel="canonical" href=")[^"]+/, '$1https://freelance.camelia-difi.com/en/')
    .replace(/(<meta property="og:title" content=")[^"]+/, `$1${title}`)
    .replace(/(<meta name="twitter:title" content=")[^"]+/, `$1${title}`)
    .replace(/(<meta property="og:description" content=")[^"]+/, `$1${description}`)
    .replace(/(<meta name="twitter:description" content=")[^"]+/, `$1${description}`)
    .replace('content="fr_FR"', 'content="en_GB"')
    .replace(/(<meta property="og:url" content=")[^"]+/, '$1https://freelance.camelia-difi.com/en/')
    .replace('content="Camelia Difi — Développeuse freelance"', 'content="Camelia Difi — Freelance developer"')
    .replace('content="Camelia Difi — Développeuse freelance web, logiciel et mobile."', 'content="Camelia Difi — Freelance web, software and mobile developer."')
    .replaceAll('"./assets/', '"../assets/')
    .replace('href="./favicon.svg"', 'href="../favicon.svg"');
  english = english.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/, (_, start, json, end) => {
    const data = JSON.parse(json);
    for (const entity of data['@graph']) {
      if (entity.inLanguage) entity.inLanguage = 'en';
      if (entity['@type'] === 'Person') entity.jobTitle = 'Freelance web, software and mobile developer';
      if (entity['@type'] === 'WebSite') entity.name = 'Camelia Difi — Freelance developer in Lyon';
      if (entity['@type'] === 'WebPage') {
        entity['@id'] = 'https://freelance.camelia-difi.com/en/#webpage';
        entity.url = 'https://freelance.camelia-difi.com/en/';
        entity.name = title;
      }
      if (entity['@type'] === 'Service') {
        entity.name = 'Custom web, software and mobile development';
        entity.serviceType = 'Freelance web, software and mobile development';
        entity.description = 'Custom websites, business software and mobile applications.';
        entity.url = 'https://freelance.camelia-difi.com/en/#expertises';
      }
    }
    return start + JSON.stringify(data) + end;
  });
  await mkdir(new URL('../dist/en/', import.meta.url), { recursive: true });
  await writeFile(new URL('../dist/en/index.html', import.meta.url), english.replace('<div id="root"></div>', `<div id="root">${render('en')}</div>`));
  console.log('Pages FR et EN pré-rendues : contenu disponible sans JavaScript.');
} finally {
  await server.close();
}
