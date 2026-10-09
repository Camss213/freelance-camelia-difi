import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from './i18n.jsx';

export const projects = [
  {
    name: 'Cabinet MFR',
    url: 'https://cabinet-mrf.vercel.app/',
    host: 'cabinet-mrf.vercel.app',
    image: '/projects/cabinet-mrf.webp',
    category: 'Services juridiques',
    description: 'Un site à l’identité sobre et éditoriale, qui présente le cabinet, ses domaines d’intervention et les possibilités de contact.',
    features: ['Présentation du cabinet', 'Domaines d’intervention', 'Contact & rendez-vous'],
  },
  {
    name: 'Wild Crocodile Adventure',
    url: 'https://wild-crocodile.vercel.app/',
    host: 'wild-crocodile.vercel.app',
    image: '/projects/wild-crocodile.webp',
    category: 'Tourisme & nature',
    description: 'Un univers immersif pour présenter des excursions au Sri Lanka : découverte de l’activité, galerie et accès à la réservation.',
    features: ['Site multilingue', 'Galerie photo', 'Présentation des excursions'],
  },
  {
    name: '11A Travels',
    url: 'https://11a-travel.vercel.app/',
    host: '11a-travel.vercel.app',
    image: '/projects/11a-travel.webp',
    category: 'Voyage & transport',
    description: 'Une interface inspirée du voyage pour explorer les destinations du Sri Lanka et découvrir les services de transport proposés.',
    features: ['Site multilingue', 'Catalogue de destinations', 'Contact WhatsApp'],
  },
];

export function FeaturedProject() {
  const t = useTranslation();
  const project = projects[0];
  return <div className="hero-showcase real-showcase">
    <div className="showcase-label"><span>{t("DU CARACTÈRE. JUSQU’AU DERNIER PIXEL.")}</span><span>{t("PROJET RÉALISÉ · CABINET MFR")}</span></div>
    <a className="hero-browser featured-project-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={t("Découvrir le site Cabinet MFR (nouvel onglet)")}>
      <div className="browser-bar"><span><i /><i /><i /></span><span>{project.host}</span><ArrowUpRight size={12} /></div>
      <img className="hero-project-image" src={project.image} width="1440" height="1000" alt={t("Aperçu du site Cabinet MFR : identité ivoire et bleu, présentation du cabinet et de ses services.")} fetchPriority="high" decoding="async" />
    </a>
    <a className="hero-visual-note" href="#realisations">{t("Des projets à découvrir. Des univers à explorer.")}<span>↗</span></a>
  </div>;
}

export default function Projects() {
  const t = useTranslation();
  return <section className="section container projects-section" id="realisations">
    <div className="heading-row">
      <div className="section-heading"><span className="eyebrow"><span />{t("MES RÉALISATIONS")}</span><h2>{t("Trois projets.")}<br /><em>{t("Trois personnalités.")}</em></h2></div>
      <p>{t("Des sites que j’ai réalisés,")}<br />{t("avec une identité adaptée à chaque activité.")}</p>
    </div>
    <div className="projects-grid">{projects.map((project, index) => <article className={`project-card project-${index + 1}`} key={project.url}>
      <a className="project-preview" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${t("Voir le site")} ${project.name} (${t("nouvel onglet")})`}>
        <div className="project-browser"><div className="browser-bar"><span><i /><i /><i /></span><span>{project.host}</span><ArrowUpRight size={12} /></div><img src={project.image} width="1440" height="1000" alt={`${t("Aperçu du site")} ${project.name}`} loading="lazy" decoding="async" /></div>
        <span className="project-open-icon" aria-hidden="true"><ArrowUpRight size={23} /></span>
      </a>
      <div className="project-details"><div className="project-meta"><span>{t(project.category)}</span><span>0{index + 1} /</span></div><h3>{project.name}</h3><p>{t(project.description)}</p><div className="tags">{project.features.map(feature => <span key={feature}>{t(feature)}</span>)}</div><a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${t("Voir le site")} ${project.name} (${t("nouvel onglet")})`}>{t("Voir le site")}<ArrowUpRight size={17} /></a></div>
    </article>)}</div>
  </section>;
}
