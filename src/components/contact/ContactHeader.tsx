
import React from 'react';

const ContactHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center rounded-full mb-3 bg-black/5 px-3 py-1 relative overflow-hidden group">
        <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
        <span className="text-xs font-medium relative z-10">CONTACT</span>
        <div className="absolute inset-0 w-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 group-hover:w-full transition-all duration-700"></div>
      </div>
      
      <h2 className="text-3xl md:text-5xl font-semibold mb-5 bg-clip-text relative">
        Discutons de votre{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 w-full h-full bg-gradient-to-r from-indigo-600/20 to-blue-600/20 rounded-lg blur-xl filter opacity-70 animate-pulse"></span>
          <span className="relative bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">projet</span>
        </span>
      </h2>
      
      <p className="text-neutral-600 max-w-2xl mx-auto">
        Prêt à donner vie à votre projet web? Contactez-nous dès aujourd'hui pour
        discuter de vos besoins et obtenir un devis personnalisé.
      </p>
    </div>
  );
};

export default ContactHeader;
