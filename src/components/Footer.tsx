import React, { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
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
    scrollToTop(isHomePage, navigate);
  }, [isHomePage, navigate]);
  return <footer className="bg-neutral-900 text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Studio.Web</h3>
            <p className="text-neutral-400 max-w-lg">
              Agence de design web créative spécialisée dans la création de sites web et d'applications élégants et performants pour tous types d'entreprises.
            </p>
            <div className="flex space-x-4">
              
              
              
              <a href="mailto:contact@studio-web.fr" className="bg-neutral-800 p-2.5 rounded-full hover:bg-green-600 transition-colors">
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
                    {isHomePage ? <a href="#" onClick={handleScrollToTop} className="text-neutral-400 hover:text-white transition-colors">
                        Accueil
                      </a> : <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
                        Accueil
                      </Link>}
                  </li>
                  <li>
                    <a href="#services-section" onClick={e => handleSectionLink('services-section', e)} className="text-neutral-400 hover:text-white transition-colors">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#solutions-section" onClick={e => handleSectionLink('solutions-section', e)} className="text-neutral-400 hover:text-white transition-colors">
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
              <div>
                <h5 className="text-sm font-medium text-neutral-300 mb-3">Légal</h5>
                <ul className="space-y-3">
                  <li>
                    <Link to="/mentions-legales" className="text-neutral-400 hover:text-white transition-colors">
                      Mentions légales
                    </Link>
                  </li>
                  <li>
                    <Link to="/politique-confidentialite" className="text-neutral-400 hover:text-white transition-colors">
                      Politique de confidentialité
                    </Link>
                  </li>
                  <li>
                    <Link to="/cgv" className="text-neutral-400 hover:text-white transition-colors">
                      CGV
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-neutral-800 my-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Studio.Web. Tous droits réservés.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            
            
            
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;