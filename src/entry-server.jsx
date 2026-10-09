import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render(language = 'fr') {
  return renderToString(<App language={language} />);
}
