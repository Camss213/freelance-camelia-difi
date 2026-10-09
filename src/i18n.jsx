import React, { createContext, useContext } from 'react';
import { english } from './translations.js';

export const LanguageContext = createContext('fr');
export function useTranslation() {
  const language = useContext(LanguageContext);
  return text => language === 'en' ? (english[text] ?? text) : text;
}
export function LanguageSwitcher() {
  const language = useContext(LanguageContext);
  return <nav className="language-switch" aria-label={language === 'en' ? 'Choose language' : 'Choisir la langue'}>
    <a href="/" lang="fr" hrefLang="fr" aria-current={language === 'fr' ? 'page' : undefined} aria-label="Français">FR</a>
    <span aria-hidden="true">/</span>
    <a href="/en/" lang="en" hrefLang="en" aria-current={language === 'en' ? 'page' : undefined} aria-label="English">EN</a>
  </nav>;
}
