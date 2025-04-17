
import React from 'react';
import { cn } from '@/lib/utils';

interface ProjectTypeSelectorProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

const ProjectTypeSelector: React.FC<ProjectTypeSelectorProps> = ({ selectedType, onTypeSelect }) => {
  const projectTypes = ["Site Web", "E-commerce", "Application", "Autre"];
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {projectTypes.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onTypeSelect(type)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm border transition-all",
            selectedType === type
              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
              : "border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30"
          )}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default ProjectTypeSelector;
