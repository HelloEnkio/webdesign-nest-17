
import React from 'react';
import { motion } from 'framer-motion';

const HeroClientLogos: React.FC = () => {
  // Array of client logos
  const clients = [{
    name: 'Client 1',
    logo: '/placeholder.svg'
  }, {
    name: 'Client 2',
    logo: '/placeholder.svg'
  }, {
    name: 'Client 3',
    logo: '/placeholder.svg'
  }, {
    name: 'Client 4',
    logo: '/placeholder.svg'
  }, {
    name: 'Client 5',
    logo: '/placeholder.svg'
  }];

  // Return the JSX for client logos
  return (
    <div className="mt-8">
      <p className="text-sm text-neutral-300 mb-4 text-center">Ils nous font confiance</p>
      <div className="flex justify-center items-center flex-wrap gap-8">
        {clients.map((client, index) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="h-10 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="h-full w-auto object-contain"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroClientLogos;
