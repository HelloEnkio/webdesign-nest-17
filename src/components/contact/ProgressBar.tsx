
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  progressWidth: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, progressWidth }) => {
  return (
    <div className="mb-8">
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progressWidth}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        ></motion.div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {["Identité", "Projet", "Description", "Contact"].map((label, index) => (
          <motion.span
            key={index}
            className={cn(currentStep >= index ? "text-indigo-600 font-medium" : "")}
            initial={{ opacity: 0.6, y: 5 }}
            animate={{ 
              opacity: currentStep >= index ? 1 : 0.6,
              y: 0,
              scale: currentStep === index ? 1.05 : 1
            }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {label}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
