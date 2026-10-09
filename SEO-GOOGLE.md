# Publication et référencement

## Retirer le badge Netlify

Dans le projet Netlify : **Project configuration → General → Powered by Netlify badge**. Désactiver puis enregistrer. Le réglage s’applique à tous les visiteurs, sans nouveau déploiement. Il n’est pas dans les fichiers du site et n’a pas été changé depuis ce projet local.

Documentation : https://docs.netlify.com/manage/projects/powered-by-netlify-badge/

## Publier la version SEO

Compiler avec `npm.cmd run build`, puis déposer le dossier complet `dist` dans **Deploys** du projet existant `freelance-cameliadifi`. Pour utiliser l’archive, extraire `site-freelance-seo.zip` et déposer le dossier contenant directement `index.html`, `assets`, `robots.txt` et `sitemap.xml`.

Vérifier après publication :

- https://freelance.camelia-difi.com/ : le site s’affiche et le certificat HTTPS est valide.
- https://freelance.camelia-difi.com/robots.txt : indique l’adresse du sitemap.
- https://freelance.camelia-difi.com/sitemap.xml : contient l’URL canonique de la page d’accueil.
- https://freelance-cameliadifi.netlify.app/ : redirige vers le domaine professionnel.

Les métadonnées et les contenus HTML pré-rendus, le sitemap, robots.txt, la carte de partage et la redirection sont prêts dans les fichiers. Leur publication nécessite de remplacer le déploiement existant ; les modifications locales ne modifient pas automatiquement le site public.

## Demander l’indexation Google

1. Ouvrir https://search.google.com/search-console et se connecter avec son compte Google.
2. Ajouter une propriété de type **Domaine** : `camelia-difi.com`. Si cette propriété est déjà validée sur ce compte, la réutiliser ; elle couvre aussi les sous-domaines.
3. Copier la valeur TXT fournie par Google. Dans IONOS, ouvrir les paramètres DNS de `camelia-difi.com` et ajouter un enregistrement **TXT** au domaine racine (`@`) avec cette valeur. Ajouter cette entrée sans remplacer les autres TXT, le CNAME `freelance`, ni les réglages du portfolio ou des e-mails.
4. Revenir dans Search Console et cliquer sur **Valider**. Si Google ne trouve pas encore l’entrée, réessayer après sa propagation.
5. Dans **Sitemaps**, soumettre `https://freelance.camelia-difi.com/sitemap.xml`.
6. Dans **Inspection de l’URL**, saisir `https://freelance.camelia-difi.com/`, lancer le test en direct, puis **Demander une indexation** si la page peut être indexée.

La vérification du compte, l’ajout du TXT et la soumission ne sont pas effectués automatiquement par les fichiers du projet. Une demande ne garantit ni l’indexation ni une position donnée.

Documentation Google :

- https://support.google.com/webmasters/answer/9008080?hl=fr
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

## Développer la visibilité

La cible principale est « développeuse web freelance à Lyon », avec les besoins concrets décrits sur la page : applications métier, plateformes SaaS et développement React. Pour élargir la visibilité : publier des études de cas authentiques, ajouter depuis le portfolio un lien vers ce site avec une description claire, compléter ses profils professionnels et demander aux partenaires de citer les projets réalisés ensemble. Suivre les impressions et requêtes dans Search Console pour décider des prochains contenus utiles. Ne pas inventer de témoignages ou de résultats.

Pas de balise de mots-clés ni de pages artificielles pour multiplier les villes. Les données structurées décrivent le profil et les services réellement présentés ; elles ne promettent pas de résultat enrichi.
