import React, { useState } from 'react';
import { LanguageContext, LanguageSwitcher, useTranslation } from './i18n.jsx';

import { ArrowUpRight, ArrowRight, Code2, Smartphone, Cloud, Menu, X, MapPin, Check, Plus, Minus, Send, Download } from 'lucide-react';


const links = (t) => [[t("Expertises"), 'expertises'], [t("Univers"), 'univers'], [t("Méthode"), 'methode'], [t("À propos"), 'apropos']];
const services = (t) => [
  { icon: Code2, title: t("Votre présence en ligne, pensée pour vous."), text: t("Sites vitrines, applications métier ou plateformes SaaS : je crée des expériences claires et soignées, adaptées à vos objectifs et à vos utilisateurs."), tags: [t("Sites vitrines"), t("Plateformes SaaS"), t("Refonte & évolution")], number: '01', color: 'purple' },
  { icon: Smartphone, title: t("Votre produit, dans toutes les poches."), text: t("Des applications iOS et Android fluides, connectées à votre système et accompagnées jusqu’à leur publication sur les stores."), tags: ['iOS & Android', t("Intégration API"), t("Publication stores")], number: '02', color: 'ivory' },
  { icon: Cloud, title: t("Une infrastructure qui tient la route."), text: t("Architecture cloud, déploiement continu et supervision : des fondations fiables pour faire évoluer votre produit et maîtriser vos coûts."), tags: [t("Architecture cloud"), 'CI/CD', 'Monitoring'], number: '03', color: 'green' },
];
const steps = (t) => [
  [t("On fait connaissance."), t("Votre activité, vos objectifs, vos contraintes. On pose les bonnes questions avant d’écrire la première ligne.")],
  [t("On dessine la suite."), t("Un périmètre clair, un devis détaillé et un planning. Vous savez où nous allons, et comment.")],
  [t("On construit ensemble."), t("Des développements par étapes, des démos régulières et vos retours pour garder le bon cap.")],
  [t("Votre produit prend vie."), t("Mise en production, documentation et suivi. Vous repartez avec un produit que vous pouvez faire évoluer.")],
];
const questions = (t) => [
  [t("Travaillez-vous à distance ?"), t("Oui, je travaille à distance partout en France, et sur site à Lyon selon les besoins de la mission.")],
  [t("Comment sont calculés les tarifs ?"), t("Au forfait pour un périmètre défini, ou au taux journalier pour une mission longue. Après un premier échange, je vous propose un devis gratuit adapté à votre projet.")],
  [t("Pouvez-vous reprendre un projet existant ?"), t("Oui. Je commence par un audit du code et de l’infrastructure, puis je propose un plan d’action pour les corrections et les évolutions.")],
  [t("Quand peut-on démarrer ?"), t("Le délai dépend de mon planning et du périmètre de votre projet. Écrivez-moi pour connaître mes prochaines disponibilités.")],
];

function Brand() { const t = useTranslation(); return <a className="brand" href="#top" aria-label={t("Camelia Difi, accueil")}><span className="brand-mark">cd<span>.</span></span><span>Camelia Difi<span className="brand-caption">{t("STUDIO WEB INDÉPENDANT")}</span></span></a>; }

function Header() { const t = useTranslation();
  const [open, setOpen] = useState(false);
  return <header className="header"><div className="container nav"><Brand /><nav className={open ? 'navigation open' : 'navigation'} id="main-nav" aria-label={t("Navigation principale")}>{links(t).map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>{t("Parlons de votre projet")} <ArrowUpRight size={16} /></a></nav><LanguageSwitcher /><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? t("Fermer le menu") : t("Ouvrir le menu")}>{open ? <X /> : <Menu />}</button></div></header>;
}

function StudioSeal({ className = '' }) {
  const t = useTranslation();
  return <div className={`studio-seal ${className}`} aria-hidden="true"><span>{t("INDÉPENDANT · CRÉATIF")}</span><strong>cd<span>.</span></strong><span>LYON · FRANCE</span></div>;
}

function MockSite({ variant = 'alba' }) {
  const t = useTranslation();
  if (variant === 'forma') return <div className="mock-site mock-forma" aria-hidden="true">
    <div className="mock-nav"><strong>forma®</strong><span>{t("Un autre regard.")}</span><ArrowUpRight size={18} /></div>
    <div className="forma-title">{t("Moins, mais")}<br /><em>{t("mieux.")}</em></div>
    <div className="forma-sculpture"><i /><i /><i /><i /><i /></div>
    <div className="mock-bottom"><span>{t("OBJETS & ESPACES")}</span><span>EST. 2026</span></div>
  </div>;
  return <div className="mock-site mock-alba" aria-hidden="true">
    <div className="mock-nav"><strong>maison alba<span>®</span></strong><span>{t("L’art d’habiter.")}</span><span>MENU <Plus size={13} /></span></div>
    <div className="alba-content"><div><span className="mock-overline">{t("ARCHITECTURE & INTÉRIEURS")}</span><p>{t("Des lieux.")}<br /><em>{t("Des liens.")}</em></p><span className="mock-discover">{t("Explorer l’univers")} <ArrowUpRight size={17} /></span></div><div className="alba-scene"><div className="alba-arch"><div /></div><span className="alba-plinth" /><span className="alba-sphere" /><span className="alba-shadow" /></div></div>
    <div className="mock-bottom"><span>{t("LE BEAU, AU QUOTIDIEN.")}</span><span>01 — 03</span></div>
  </div>;
}

function Hero() {
  const t = useTranslation();
  return <><section className="hero container" id="top">
    <div className="hero-topline"><span className="eyebrow"><span />{t("STUDIO WEB INDÉPENDANT")}</span><div className="availability"><span />{t("Disponible pour de nouvelles missions")}</div></div>
    <div className="hero-title-row"><h1><span className="hero-profession">{t("Développeuse web freelance à Lyon")}</span>{t("Votre activité.")}<br /><em>{t("En grand.")}</em></h1><StudioSeal /></div>
    <div className="hero-bottom"><p className="hero-intro">{t("Une présence qui vous ressemble.")}<br />{t("Des sites web singuliers, des applications utiles. Je donne forme à vos idées, avec autant de soin pour le design que pour le code.")}</p><div><a className="button primary" href="#contact">{t("Parlons de votre projet")}<ArrowUpRight size={21} /></a><p className="hero-note">{t("Premier échange gratuit, sans engagement.")}</p></div><a className="explore-link" href="#univers"><span>{t("Découvrir l’univers")}</span><ArrowRight size={22} /></a></div>
    <div className="hero-showcase"><div className="showcase-label"><span>{t("DU CARACTÈRE. JUSQU’AU DERNIER PIXEL.")}</span><span>{t("CONCEPT VISUEL · DÉMONSTRATION")}</span></div><div className="hero-browser"><div className="browser-bar"><span><i /><i /><i /></span><span>maison-alba.example</span><ArrowUpRight size={12} /></div><MockSite /></div><div className="hero-visual-note">{t("Votre prochain chapitre commence ici.")} <span>↗</span></div></div>
  </section><div className="facts"><div className="container facts-inner"><div><MapPin size={16} /><span>{t("Basée à")} <strong>Lyon</strong> {t("· Remote partout en France")}</span></div><div><Check size={16} /><span>{t("Un interlocuteur,")} <strong>{t("de l’idée au déploiement")}</strong></span></div><div><ArrowUpRight size={16} /><span>{t("Une réponse")} <strong>{t("sous 48 h")}</strong></span></div></div></div></>;
}

function Showcase() {
  const t = useTranslation();
  return <section className="section container showcase-section" id="univers"><div className="heading-row"><SectionHeading eyebrow={t("LA SIGNATURE DU STUDIO")} title={<>{t("Des univers singuliers.")}<br /><em>{t("Des idées qui prennent forme.")}</em></>} /><p>{t("Chaque activité a sa personnalité.")}<br />{t("Votre site doit l’exprimer.")}</p></div>
    <div className="concept-grid"><article className="concept-card"><div className="concept-frame concept-alba"><MockSite /></div><div className="concept-caption"><div><h3>Maison Alba</h3><p>{t("Concept visuel · Architecture & intérieurs")}</p></div><span>01 /</span></div></article><article className="concept-card"><div className="concept-frame concept-forma"><MockSite variant="forma" /></div><div className="concept-caption"><div><h3>Forma</h3><p>{t("Concept visuel · Design & objets")}</p></div><span>02 /</span></div></article></div>
    <p className="concept-disclaimer">{t("Ces explorations visuelles illustrent la direction créative du studio. Ce sont des concepts, pas des projets clients.")}</p><a className="text-link" href="https://camelia-difi.com" target="_blank" rel="noopener noreferrer">{t("Voir mes réalisations sur le portfolio")}<ArrowUpRight size={18} /></a>
  </section>;
}

function SectionHeading({ eyebrow, title, text }) { return <div className="section-heading"><span className="eyebrow"><span />{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>; }

function Expertise() {
  const t = useTranslation();
  return <section className="section container" id="expertises"><div className="heading-row"><SectionHeading eyebrow={t("CE QUE JE PEUX FAIRE POUR VOUS")} title={<>{t("Du beau.")} <em>{t("Du sens.")}</em><br />{t("Et du solide.")}</>} /><p>{t("Une identité juste en surface.")}<br />{t("Des fondations fiables en profondeur.")}</p></div><div className="service-grid">{services(t).map(({ icon: Icon, title, text, tags, number }) => <article className="service-card" key={number}><span className="service-number">/{number}</span><div className="service-heading"><span className="service-category">{number === '01' ? t("DÉVELOPPEMENT WEB") : number === '02' ? t("APPLICATIONS MOBILES") : 'CLOUD & DEVOPS'}</span><h3>{title}</h3></div><div className="service-detail"><p>{text}</p><div className="tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><a className="service-link" href="#contact" aria-label={`${t("Parlons-en")} — ${title}`}><ArrowUpRight size={26} /></a></article>)}</div></section>;
}

function Stack() { const t = useTranslation(); const groups = [['Front-end', ['TypeScript', 'React', 'HTML / CSS']], ['Back-end', ['Node.js', 'API REST', 'SQL & NoSQL']], ['Mobile', ['React Native', 'Flutter']], ['Cloud & DevOps', ['AWS', 'Azure', 'GCP', 'Docker', 'CI/CD', 'Terraform']]]; return <section className="stack-section" id="stack"><div className="container stack-layout"><SectionHeading eyebrow={t("MA BOÎTE À OUTILS")} title={<>{t("La bonne technologie.")}<br />{t("Pour le bon besoin.")}</>} text={t("Des outils éprouvés, choisis selon votre contexte. Avec la fiabilité et la maintenabilité en tête.")} /><div className="stack-groups">{groups.map(([title, tools], i) => <div className="stack-row" key={title}><span className="stack-index">0{i + 1}</span><h3>{title}</h3><div>{tools.map(tool => <span key={tool}>{tool}</span>)}</div></div>)}</div></div></section>; }

function Method() { const t = useTranslation(); return <section className="section container" id="methode"><SectionHeading eyebrow={t("COMMENT ON TRAVAILLE ENSEMBLE")} title={<>{t("Un cap clair.")}<br /><em>{t("À chaque étape.")}</em></>} text={t("Pas de boîte noire : vous savez ce qui avance, ce qui vient ensuite et ce que cela coûte.")} /><div className="steps">{steps(t).map(([title, text], i) => <article className="step" key={title}><div className="step-track"><span>0{i + 1}</span><ArrowRight size={18} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>; }

function About() { const t = useTranslation(); return <section className="container about" id="apropos"><div className="about-art" aria-hidden="true"><span className="about-coordinates">{t("STUDIO WEB INDÉPENDANT")}</span><span className="about-monogram">cd<span>.</span></span><div className="about-art-bottom"><span><MapPin size={14} /> Lyon, France</span><span>{t("Votre identité. En ligne.")}</span></div><div className="about-star">↗</div></div><div className="about-copy"><SectionHeading eyebrow={t("LE STUDIO, C’EST MOI")} title={<>{t("Un studio indépendant.")}<br /><em>{t("Une relation directe.")}</em></>} /><p>{t("Je suis Camelia Difi, développeuse web freelance à Lyon et fondatrice de ce studio indépendant. J’accompagne les entrepreneurs, PME et équipes produit dans la création de sites et d’applications qui servent leur activité.")}</p><p>{t("Vous échangez directement avec moi, du premier rendez-vous à la mise en ligne. Je prends le temps de comprendre votre métier pour concevoir une solution juste, avec une identité soignée et des bases techniques solides.")}</p><a className="text-link" href="https://camelia-difi.com" target="_blank" rel="noopener noreferrer">{t("Découvrir mon parcours")} <ArrowUpRight size={18} /></a><a className="button cv-download" href="/cv/Camelia_Difi_CV_EN.pdf" download="Camelia_Difi_CV_EN.pdf"><Download size={17} />{t("Télécharger mon CV (anglais)")}</a></div></section>; }

function FAQ() { const t = useTranslation(); const [active, setActive] = useState(null); return <section className="section container faq-layout"><SectionHeading eyebrow={t("QUELQUES RÉPONSES")} title={<>{t("Vous vous demandez")}<br />{t("peut-être…")}</>} /><div className="faq-items">{questions(t).map(([question, answer], i) => <div className="faq-item" key={question}><h3><button aria-expanded={active === i} aria-controls={`answer-${i}`} onClick={() => setActive(active === i ? null : i)}>{question}{active === i ? <Minus size={19} /> : <Plus size={19} />}</button></h3><div id={`answer-${i}`} hidden={active !== i}><p>{answer}</p></div></div>)}</div></section>; }

function Contact() { const t = useTranslation();
  const [prepared, setPrepared] = useState(false);
  function submit(event) { event.preventDefault(); const data = new FormData(event.currentTarget); const body = `${t("Nom")} : ${data.get('name')}\nEmail : ${data.get('email')}\n\n${data.get('message')}`; window.location.href = `mailto:cameliadifi0707@gmail.com?subject=${encodeURIComponent(`${t("Nouveau projet")} — ${data.get('name')}`)}&body=${encodeURIComponent(body)}`; setPrepared(true); }
  return <section className="contact-section" id="contact"><div className="container contact-layout"><div className="contact-copy"><span className="eyebrow"><span />{t("ET SI ON CONSTRUISAIT LA SUITE ?")}</span><h2>{t("Les belles idées")}<br />{t("commencent par")}<br /><em>{t("une conversation.")}</em></h2><p>{t("Parlez-moi de votre projet, même s’il n’est encore qu’une idée. Je reviens vers vous sous 48 h pour un premier échange gratuit.")}</p><a className="contact-email" href="mailto:cameliadifi0707@gmail.com">cameliadifi0707@gmail.com <ArrowUpRight size={20} /></a><span className="contact-location"><MapPin size={15} /> {t("Lyon & partout à distance")}</span></div><form className="contact-form" onSubmit={submit}><h3>{t("Et vous, qu’avez-vous en tête ?")}</h3><div className="form-row"><div><label htmlFor="name">{t("Votre nom")}</label><input id="name" name="name" autoComplete="name" placeholder="Camille Dupont" required maxLength={120} /></div><div><label htmlFor="email">{t("Votre e-mail")}</label><input id="email" name="email" type="email" autoComplete="email" placeholder={t("vous@entreprise.fr")} required maxLength={254} /></div></div><label htmlFor="message">{t("Votre projet en quelques mots")}</label><textarea id="message" name="message" placeholder={t("Une application à créer, un produit à faire évoluer, un défi technique…")} required minLength={10} maxLength={5000} rows={5} /><button className="button primary" type="submit">{t("Préparer mon e-mail")} <Send size={17} /></button><p className="form-note">{t("Ce formulaire ouvre votre application de messagerie.")}</p>{prepared && <p className="form-feedback" role="status">{t("Votre e-mail est préparé. Envoyez-le depuis votre messagerie. Si elle ne s’ouvre pas, écrivez à cameliadifi0707@gmail.com.")}</p>}</form></div></section>;
}

function Page() { const t = useTranslation(); return <><a className="skip-link" href="#main">{t("Aller au contenu")}</a><Header /><main id="main"><Hero /><Showcase /><Expertise /><Method /><About /><Stack /><FAQ /><Contact /></main><footer className="container footer"><Brand /><span>© {new Date().getFullYear()} Camelia Difi — EI · {t("Fait avec soin, à Lyon.")}</span><div className="footer-links"><a href={t("/mentions-legales.html")}>{t("Mentions légales")}</a><a href="#top">{t("Retour en haut")} <ArrowUpRight size={16} /></a></div></footer></>; }



export default function App({ language = "fr" }) { return <LanguageContext.Provider value={language}><Page /></LanguageContext.Provider>; }
