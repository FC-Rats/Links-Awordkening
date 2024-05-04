import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Titre des pages et l'icone
document.title = "Links Awordkening";
const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
(link as HTMLLinkElement).type = 'image/x-icon';
(link as HTMLLinkElement).rel = 'icon';
(link as HTMLLinkElement).href = '/img/iconeLA.png';
document.head.appendChild(link);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
