
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import StepWrapper from './StepWrapper';
import { FormState } from '@/hooks/use-contact-form';

interface ProjectTypeStepProps {
  formState: FormState;
  handleProjectTypeSelect: (type: string) => void;
}

const ProjectTypeStep: React.FC<ProjectTypeStepProps> = ({ formState, handleProjectTypeSelect }) => {
  // List of available project types
  const projectTypes = [
    "Site vitrine",
    "E-commerce",
    "Application web",
    "Refonte de site",
    "Autre"
  ];

  return (
    <StepWrapper title="Quel type de projet souhaitez-vous réaliser ?" icon={<MessageSquare size={20} />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {projectTypes.map((type) => (
          <div 
            key={type} 
            onClick={() => handleProjectTypeSelect(type)}
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
              formState.projectType === type 
                ? "border-indigo-400 bg-indigo-50 text-indigo-700" 
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="flex items-center">
              <span className="flex-1">{type}</span>
              {formState.projectType === type && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
    </StepWrapper>
  );
};

export default ProjectTypeStep;
