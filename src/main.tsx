
// Désactive la restauration native et supprime tout hash
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
if (window.location.hash) {
  window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
