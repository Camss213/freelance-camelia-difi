import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const root = document.getElementById('root');
const language = /^\/en(?:\/|$)/.test(window.location.pathname) ? 'en' : 'fr';
document.documentElement.lang = language;
const application = <React.StrictMode><App language={language} /></React.StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, application);
else createRoot(root).render(application);
