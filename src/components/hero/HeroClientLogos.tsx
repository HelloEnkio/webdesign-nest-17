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
  return (
    <div className="flex items-center justify-center space-x-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
      {clients.map((client, index) => (
        <img 
          key={index} 
          src={client.logo} 
          alt={client.name} 
          className="h-12 w-auto hover:scale-110 transition-transform"
        />
      ))}
    </div>
  );
};
export default HeroClientLogos;