
import React from 'react';
import { motion } from 'framer-motion';

interface StatItemProps {
  value: string;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, delay }) => {
  return (
    <div className="space-y-2 p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md shadow-lg border border-white/20 hover:border-teal-300/30 hover:shadow-teal-400/10 transition-all duration-300 group">
      <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-sm group-hover:from-white group-hover:to-teal-300 transition-all duration-300">{value}</p>
      <p className="text-sm md:text-base text-gray-300 font-medium">{label}</p>
    </div>
  );
};

const HeroStats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 pt-6 opacity-100 fade-in stagger-4">
      <StatItem value="L'utilisateur" label="au centre du design" delay={0.1} />
      <StatItem value="Sur-mesure" label="sur tous nos projets" delay={0.2} />
      <StatItem value="10+" label="Ans d'expérience" delay={0.3} />
    </div>
  );
};

export default HeroStats;
