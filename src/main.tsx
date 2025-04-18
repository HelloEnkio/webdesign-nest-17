// Désactive la restauration de scroll native du navigateur
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
// Au cas où un hash traînerait avant le montage React, on l'enlève
if (window.location.hash) {
  window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
}
// On force la page tout en haut
window.scrollTo(0, 0);

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
