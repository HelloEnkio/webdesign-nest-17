
// Désactive la restauration native du navigateur
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
// Supprime immédiatement tout hash pour éviter le jump automatique
if (window.location.hash) {
  window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
}
// Removing the forced scrollTo(0, 0) that was causing issues

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
