
// Désactive la restauration de scroll native
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
