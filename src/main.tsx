
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const AppWrapper = () => {
  useEffect(() => {
    // Force le défilement en haut de la page au chargement initial et lors des changements de route
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppWrapper />
)

