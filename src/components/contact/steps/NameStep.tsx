
import React from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import StepWrapper from './StepWrapper';
import { FormState } from '@/hooks/use-contact-form';

interface NameStepProps {
  formState: FormState;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const NameStep: React.FC<NameStepProps> = ({ formState, handleInputChange }) => {
  return (
    <StepWrapper title="Comment vous appelez-vous ?" icon={<User size={20} />}>
      <div className="relative">
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          placeholder="Votre nom complet"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
          autoFocus
        />
        {formState.name && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-3 top-3 w-6 h-6 bg-green-50 rounded-full flex items-center justify-center text-green-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </motion.div>
        )}
      </div>
    </StepWrapper>
  );
};

export default NameStep;
