
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  isSubmitting: boolean;
  validateCurrentStep: () => boolean;
  handlePrevStep: () => void;
  handleNextStep: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  isSubmitting,
  validateCurrentStep,
  handlePrevStep,
  handleNextStep
}) => {
  return (
    <div className="mt-6 flex justify-between">
      {currentStep > 0 ? (
        <Button 
          type="button" 
          variant="outline"
          onClick={handlePrevStep}
          className="px-4 py-2"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Précédent
        </Button>
      ) : (
        <div />
      )}
      
      {currentStep < 3 ? (
        <Button 
          type="button" 
          onClick={handleNextStep}
          disabled={!validateCurrentStep()}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50 disabled:pointer-events-none"
        >
          Continuer
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button 
          type="submit" 
          disabled={isSubmitting || !validateCurrentStep()}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi en cours...
            </>
          ) : (
            <>
              Envoyer ma demande
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
