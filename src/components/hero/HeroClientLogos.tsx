
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
    <div className="flex flex-wrap justify-center gap-8 mt-12">
      {clients.map((client, index) => (
        <div key={index} className="flex items-center justify-center">
          <img 
            src={client.logo} 
            alt={client.name} 
            className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      ))}
    </div>
  );
};

export default HeroClientLogos;
