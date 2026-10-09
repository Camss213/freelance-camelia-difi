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
  const title = 'Camelia Difi · Web studio | Freelance web developer in Lyon';
  const description = 'Camelia Difi, an independent web studio in Lyon. Custom websites, applications and redesigns. A freelance web developer supporting your business from idea to launch.';
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
    .replace('content="Camelia Difi — Studio web indépendant"', 'content="Camelia Difi — Independent web studio"')
    .replace('content="Camelia Difi — Studio web indépendant. Votre activité mérite un site qui lui ressemble."', 'content="Camelia Difi — Independent web studio. Your business deserves a website that feels like you."')
    .replaceAll('"./assets/', '"../assets/')
    .replace('href="./favicon.svg"', 'href="../favicon.svg"');
  english = english.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/, (_, start, json, end) => {
    const data = JSON.parse(json);
    for (const entity of data['@graph']) {
      if (entity.inLanguage) entity.inLanguage = 'en';
      if (entity['@type'] === 'Person') entity.jobTitle = 'Freelance full-stack, mobile and cloud developer';
      if (entity['@type'] === 'WebSite') entity.name = 'Camelia Difi — Independent web studio in Lyon';
      if (entity['@type'] === 'WebPage') {
        entity['@id'] = 'https://freelance.camelia-difi.com/en/#webpage';
        entity.url = 'https://freelance.camelia-difi.com/en/';
        entity.name = title;
      }
      if (entity['@type'] === 'Service') {
        entity.name = 'Custom website and application development';
        entity.serviceType = 'Freelance web development';
        entity.description = 'Business websites, custom applications, SaaS platforms and website redesigns.';
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
