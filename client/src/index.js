import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import '../src/index.css';

import { TolgeeProvider } from "@tolgee/react";

import App from './App';

const root = createRoot(document.getElementById('root'))
root.render(<React.StrictMode>
  <TolgeeProvider
    //  imports the translations from tolgee.io
    staticData={{
      en: () => import('./i18n/en.json'),
      es: () => import('./i18n/es.json'),
    }}
    loadingFallback={<>Loading...</>}
  >
    <App />
  </TolgeeProvider>
</React.StrictMode>)
