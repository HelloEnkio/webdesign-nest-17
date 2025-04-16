
import React from 'react';

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
    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 py-8">
      {clients.map((client, index) => (
        <div key={index} className="flex items-center grayscale hover:grayscale-0 transition-all duration-300">
          <img 
            src={client.logo} 
            alt={client.name} 
            className="h-10 md:h-12"
          />
        </div>
      ))}
    </div>
  );
};

export default HeroClientLogos;
