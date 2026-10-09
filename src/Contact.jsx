import { useContext, useRef, useState } from 'react';
import { ArrowUpRight, MapPin, Send } from 'lucide-react';
import { LanguageContext, useTranslation } from './i18n.jsx';

export default function Contact() {
  const t = useTranslation();
  const language = useContext(LanguageContext);
  const [status, setStatus] = useState('idle');
  const submitting = useRef(false);

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const body = new URLSearchParams(new FormData(form)).toString();
    submitting.current = true;
    setStatus('sending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Form submission failed');
      form.reset();
      setStatus('success');
    } catch {
      // Keep the visitor's message so they can retry after a failed request.
      setStatus('error');
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
    }
  }

  return <section className="contact-section" id="contact">
    <div className="container contact-layout">
      <div className="contact-copy">
        <span className="eyebrow"><span />{t("ET SI ON CONSTRUISAIT LA SUITE ?")}</span>
        <h2>{t("Les belles idées")}<br />{t("commencent par")}<br /><em>{t("une conversation.")}</em></h2>
        <p>{t("Parlez-moi de votre projet, même s’il n’est encore qu’une idée. Je reviens vers vous sous 48 h pour un premier échange gratuit.")}</p>
        <a className="contact-email" href="mailto:cameliadifi0707@gmail.com">cameliadifi0707@gmail.com <ArrowUpRight size={20} /></a>
        <span className="contact-location"><MapPin size={15} />{t("Lyon & partout à distance")}</span>
      </div>
      <form className="contact-form" name="contact" method="POST" action={language === 'en' ? '/en/thank-you.html' : '/merci.html'} onSubmit={submit} aria-label={t("Formulaire de contact")} aria-busy={status === 'sending'}>
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="language" value={language} />
        <p hidden><label>{t("Ne remplissez pas ce champ")}<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
        <h3>{t("Et vous, qu’avez-vous en tête ?")}</h3>
        <fieldset disabled={status === 'sending'}>
          <div className="form-row">
            <div><label htmlFor="name">{t("Votre nom")}</label><input id="name" name="name" autoComplete="name" placeholder="Camille Dupont" required maxLength={120} /></div>
            <div><label htmlFor="email">{t("Votre e-mail")}</label><input id="email" name="email" type="email" autoComplete="email" placeholder={t("vous@entreprise.fr")} required maxLength={254} /></div>
          </div>
          <label htmlFor="message">{t("Votre projet en quelques mots")}</label>
          <textarea id="message" name="message" placeholder={t("Une application à créer, un produit à faire évoluer, un défi technique…")} required minLength={10} maxLength={5000} rows={5} />
          <button className="button primary" type="submit">{t(status === 'sending' ? "Envoi en cours…" : "Envoyer mon message")}<Send size={17} /></button>
        </fieldset>
        <p className="form-note">{t("Vos coordonnées servent uniquement à répondre à votre demande.")} <a href={t("/mentions-legales.html")}>{t("Mentions légales")}</a></p>
        {status === 'success' && <p className="form-feedback" role="status">{t("Votre message a bien été envoyé. Je reviens vers vous sous 48 h.")}</p>}
        {status === 'error' && <p className="form-feedback" role="alert">{t("L’envoi n’a pas pu être confirmé. Réessayez ou écrivez à")} <a href="mailto:cameliadifi0707@gmail.com">cameliadifi0707@gmail.com</a>.</p>}
      </form>
    </div>
  </section>;
}
