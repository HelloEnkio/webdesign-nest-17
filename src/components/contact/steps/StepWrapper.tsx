
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const StepWrapper: React.FC<StepProps> = ({ title, children, icon }) => {
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          {icon}
        </div>
        <h3 className="text-xl font-medium text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default StepWrapper;
