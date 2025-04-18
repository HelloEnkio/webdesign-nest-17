
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { scrollToSectionById, scrollToTop } from '@/utils/navigationUtils';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleSectionLink = useCallback((sectionId: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSectionById(sectionId, isHomePage, navigate);
  }, [isHomePage, navigate]);

  const handleScrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // Mettre à jour le hash pour la section hero spécifiquement
    if (isHomePage) {
      window.history.replaceState(null, document.title, '#hero-section');
    }
    scrollToTop(isHomePage, navigate);
  }, [isHomePage, navigate]);

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Enkio</h3>
            <p className="text-neutral-400 max-w-lg">
              Agence de design web créative spécialisée dans la création de sites web et d'applications élégants et performants pour tous types d'entreprises.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:hello@enkio.fr" className="bg-neutral-800 p-2.5 rounded-full hover:bg-green-600 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Liens rapides</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-neutral-300 mb-3">Navigation</h5>
                <ul className="space-y-3">
                  <li>
                    {isHomePage ? 
                      <a href="#hero-section" onClick={handleScrollToTop} className="text-neutral-400 hover:text-white transition-colors">
                        Accueil
                      </a> : 
                      <a href="/" className="text-neutral-400 hover:text-white transition-colors">
                        Accueil
                      </a>}
                  </li>
                  <li>
                    <a href="#services-section" onClick={e => handleSectionLink('services-section', e)} className="text-neutral-400 hover:text-white transition-colors">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#portfolio-section" onClick={e => handleSectionLink('portfolio-section', e)} className="text-neutral-400 hover:text-white transition-colors">
                      Solutions
                    </a>
                  </li>
                  <li>
                    <a href="#process-section" onClick={e => handleSectionLink('process-section', e)} className="text-neutral-400 hover:text-white transition-colors">
                      Processus
                    </a>
                  </li>
                  <li>
                    <a href="#contact-section" onClick={e => handleSectionLink('contact-section', e)} className="text-neutral-400 hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-neutral-800 my-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Enkio. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
