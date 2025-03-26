
import React from 'react';
import { motion } from 'framer-motion';

const ContactHeader: React.FC = () => {
  return (
    <div className="text-center mb-14">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center rounded-full mb-4 bg-indigo-50 px-3 py-1 border border-indigo-100"
      >
        <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
        <span className="text-xs font-medium text-indigo-700">CONTACT</span>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-semibold mb-5 text-gray-900"
      >
        Discutons de votre projet
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-600 max-w-2xl mx-auto text-base"
      >
        Prêt à donner vie à votre vision ? Notre formulaire interactif vous guide pas à pas pour nous aider à comprendre vos besoins et vous proposer les meilleures solutions.
      </motion.p>
    </div>
  );
};

export default ContactHeader;
