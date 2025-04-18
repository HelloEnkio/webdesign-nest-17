
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
