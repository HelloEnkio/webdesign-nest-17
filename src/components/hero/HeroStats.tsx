
import React from 'react';
import { motion } from 'framer-motion';

interface StatItemProps {
  value: string;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  delay
}) => {
  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-lg rounded-lg p-5 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="text-xl md:text-2xl font-semibold mb-1 text-white">{value}</div>
      <div className="text-sm text-neutral-200">{label}</div>
    </motion.div>
  );
};

const HeroStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatItem value="L'utilisateur" label="au centre du design" delay={0.2} />
      <StatItem value="Sur-mesure" label="sur tous nos projets" delay={0.4} />
      <StatItem value="De la page web" label="à l'app IA" delay={0.6} />
    </div>
  );
};

export default HeroStats;
