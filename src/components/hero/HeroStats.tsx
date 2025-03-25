
import React from 'react';

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="space-y-2 p-5 rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
      <p className="text-3xl md:text-4xl font-bold text-teal-300">{value}</p>
      <p className="text-sm md:text-base text-gray-200 font-medium">{label}</p>
    </div>
  );
};

const HeroStats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 pt-6 opacity-0">
      <StatItem value="150+" label="Projets livrés" />
      <StatItem value="98%" label="Clients satisfaits" />
      <StatItem value="10+" label="Ans d'expérience" />
    </div>
  );
};

export default HeroStats;
