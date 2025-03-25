
import React from 'react';

const ContactHeader: React.FC = () => {
  return (
    <div className="text-center mb-14">
      <div className="inline-flex items-center rounded-full mb-4 bg-indigo-50 px-3 py-1 border border-indigo-100">
        <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
        <span className="text-xs font-medium text-indigo-700">CONTACT</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-semibold mb-5 text-gray-900">
        Discutons de votre projet
      </h2>
      
      <p className="text-gray-600 max-w-2xl mx-auto text-base">
        Prêt à donner vie à votre projet web? Contactez-nous dès aujourd'hui pour
        discuter de vos besoins et obtenir un devis personnalisé.
      </p>
    </div>
  );
};

export default ContactHeader;
