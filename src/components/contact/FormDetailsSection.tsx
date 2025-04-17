
import React from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { User, Package, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormState } from '@/hooks/use-contact-form';
import ProjectTypeSelector from './ProjectTypeSelector';

interface FormDetailsSectionProps {
  showDetails: boolean;
  formState: FormState;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleProjectTypeSelect: (type: string) => void;
}

const FormDetailsSection: React.FC<FormDetailsSectionProps> = ({ 
  showDetails, 
  formState, 
  handleInputChange, 
  handleProjectTypeSelect 
}) => {
  // Animation for details section
  const detailsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <AnimatePresence>
      {showDetails && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={detailsVariants}
          className="overflow-hidden"
        >
          <div className="space-y-4 pt-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline-block w-4 h-4 mr-2" />
                Votre nom
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="Votre nom (optionnel)"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="inline-block w-4 h-4 mr-2" />
                Type de projet
              </label>
              <ProjectTypeSelector 
                selectedType={formState.projectType} 
                onTypeSelect={handleProjectTypeSelect} 
              />
            </div>
            
            <div>
              <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline-block w-4 h-4 mr-2" />
                Description du projet
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formState.projectDescription}
                onChange={handleInputChange}
                placeholder="Décrivez brièvement votre projet (optionnel)"
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormDetailsSection;
