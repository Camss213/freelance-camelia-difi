# Camelia Difi — site freelance

Refonte du site en React avec Vite. Les composants et les contenus sont dans `src/App.jsx`, les styles responsive dans `src/styles.css`.

## Développement

```sh
npm install
npm run dev
```

Sous PowerShell, si les scripts npm sont bloqués, utilisez `npm.cmd install` et `npm.cmd run dev`.

## Production

```sh
npm run build
npm run preview
```

Le dossier `dist` contient le site à héberger. Le fichier HTML d’origine est conservé à la racine comme référence.

La compilation génère le contenu HTML depuis React, puis React reprend les interactions dans le navigateur. Le contenu est donc lisible sans exécuter JavaScript. Les métadonnées, l’URL canonique et les données structurées sont dans `index.html`. Les fichiers `robots.txt`, `sitemap.xml` et la carte de partage sont dans `public`.

Le sélecteur FR / EN relie `/` à `/en/`. Les deux versions sont pré-rendues avec leurs propres métadonnées, URL canoniques et liens `hreflang`. Les traductions sont dans `src/translations.js`. Le CV anglais fourni est conservé tel quel dans `public/cv/Camelia_Difi_CV_EN.pdf` et téléchargeable depuis la section À propos dans les deux langues. Les mentions légales anglaises se trouvent dans `public/en/legal-notice.html` ; maintenir les deux pages à jour lorsqu’une information professionnelle change.

La configuration cible `https://freelance.camelia-difi.com/`. Mettre à jour ces URL et `public/_redirects` si le domaine change. La redirection du domaine Netlify fonctionne sur les déploiements manuels grâce au fichier `_redirects` inclus dans `dist`.

Pour vérifier la version de production : `npm run preview -- --port 5173`, puis dans un autre terminal `npm run check:site`. Arrêter auparavant tout serveur utilisant ce port. Les contrôles couvrent l’affichage sans JavaScript, les métadonnées, les fichiers de découverte, la navigation mobile, le formulaire et la FAQ.

Le formulaire prépare un e-mail dans la messagerie de l’utilisateur ; il ne transmet pas de message à un serveur. Le site ne nécessite aucun backend. Les polices Google Fonts nécessitent une connexion ; des polices de remplacement sont prévues.
