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
  return;
};
const HeroStats: React.FC = () => {
  return <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatItem value="L'utilisateur" label="au centre du design" delay={0.2} />
      <StatItem value="Sur-mesure" label="sur tous nos projets" delay={0.4} />
      <StatItem value="De la page web" label="à l'app IA" delay={0.6} />
    </div>;
};
export default HeroStats;