
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  progressWidth: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, progressWidth }) => {
  return (
    <div className="mb-8">
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span className={cn(currentStep >= 0 ? "text-indigo-600 font-medium" : "")}>Identité</span>
        <span className={cn(currentStep >= 1 ? "text-indigo-600 font-medium" : "")}>Projet</span>
        <span className={cn(currentStep >= 2 ? "text-indigo-600 font-medium" : "")}>Description</span>
        <span className={cn(currentStep >= 3 ? "text-indigo-600 font-medium" : "")}>Contact</span>
      </div>
    </div>
  );
};

export default ProgressBar;
