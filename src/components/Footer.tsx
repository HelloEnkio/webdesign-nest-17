
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Studio.Web</h3>
            <p className="text-neutral-400">
              Agence de design web créative spécialisée dans la création de sites web
              élégants et performants pour tous types d'entreprises.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-neutral-400 hover:text-white transition-colors">Accueil</a>
              </li>
              <li>
                <a href="#services" className="text-neutral-400 hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#portfolio" className="text-neutral-400 hover:text-white transition-colors">Portfolio</a>
              </li>
              <li>
                <a href="#process" className="text-neutral-400 hover:text-white transition-colors">Processus</a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-400 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Web Design</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Développement Web</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">E-commerce</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Identité Visuelle</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">SEO & Marketing</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-medium mb-4">Newsletter</h4>
            <p className="text-neutral-400 mb-4">
              Inscrivez-vous pour recevoir nos actualités et conseils sur le design web.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 bg-neutral-800 text-white rounded-l-lg focus:outline-none focus:ring-1 focus:ring-white/30 w-full"
              />
              <button 
                type="submit" 
                className="bg-white text-black p-2 rounded-r-lg hover:bg-neutral-200 transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
        
        <hr className="border-neutral-800 my-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Studio.Web. Tous droits réservés.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
