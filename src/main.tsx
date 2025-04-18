
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
// Supprimer immédiatement tout hash présent dans l'URL
if (window.location.hash) {
  window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
