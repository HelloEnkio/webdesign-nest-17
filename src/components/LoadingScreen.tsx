
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);

    // Hide loader after everything is loaded
    const timeout = setTimeout(() => {
      if (progress >= 100) {
        setIsVisible(false);
        clearInterval(interval);
      }
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [progress]);

  useEffect(() => {
    // Force completion after 3 seconds regardless of actual loading state
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsVisible(false), 500);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-black via-blue-950 to-teal-950"
        >
          <div className="relative w-full max-w-md px-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="h-16 w-16 mr-4 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">S</div>
              <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Studio<span className="font-light">.Web</span>
              </span>
            </motion.div>
            
            <div className="relative h-1 w-full bg-white/20 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut"
                }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-white/70">
              <span>Chargement des ressources...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
