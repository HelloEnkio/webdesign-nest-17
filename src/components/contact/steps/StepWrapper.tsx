
import React from 'react';
import { motion } from 'framer-motion';

interface StepProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const StepWrapper: React.FC<StepProps> = ({ title, children, icon }) => {
  return (
    <div className="space-y-4 w-full">
      <motion.div 
        className="flex items-center gap-3 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          whileHover={{ scale: 1.05 }}
        >
          {icon}
        </motion.div>
        <motion.h3 
          className="text-xl font-medium text-gray-900"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {title}
        </motion.h3>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default StepWrapper;
