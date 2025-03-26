
import React from 'react';
import { MessageSquare } from 'lucide-react';
import StepWrapper from './StepWrapper';
import { FormState } from '@/hooks/use-contact-form';

interface ProjectDescriptionStepProps {
  formState: FormState;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProjectDescriptionStep: React.FC<ProjectDescriptionStepProps> = ({ formState, handleInputChange }) => {
  return (
    <StepWrapper title="Décrivez brièvement votre projet" icon={<MessageSquare size={20} />}>
      <div className="relative">
        <textarea
          name="projectDescription"
          value={formState.projectDescription}
          onChange={handleInputChange}
          placeholder="Décrivez votre projet et vos besoins..."
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
          autoFocus
        />
        <div className="text-xs text-gray-500 mt-2 flex justify-between">
          <span>{formState.projectDescription.length} caractères</span>
          <span>{formState.projectDescription.length > 0 ? "Parfait !" : "Quelques mots suffiront pour commencer"}</span>
        </div>
      </div>
    </StepWrapper>
  );
};

export default ProjectDescriptionStep;
