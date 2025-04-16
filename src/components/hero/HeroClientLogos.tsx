
import React from 'react';

const HeroClientLogos: React.FC = () => {
  // Array of client logos
  const clients = [
    { name: 'Client 1', logo: '/placeholder.svg' },
    { name: 'Client 2', logo: '/placeholder.svg' },
    { name: 'Client 3', logo: '/placeholder.svg' },
    { name: 'Client 4', logo: '/placeholder.svg' },
    { name: 'Client 5', logo: '/placeholder.svg' },
  ];

  return (
    <div className="mt-12">
      <p className="text-sm text-center text-gray-400 mb-4">Ils nous font confiance</p>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {clients.map((client, index) => (
          <div 
            key={index} 
            className="w-24 h-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
          >
            <img 
              src={client.logo} 
              alt={`${client.name} logo`} 
              className="max-h-full max-w-full object-contain" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroClientLogos;
