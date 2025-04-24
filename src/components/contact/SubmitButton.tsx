// src/components/contact/SubmitButton.tsx - Version Originale (à restaurer)
import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Interface restaurée
interface SubmitButtonProps {
  isSubmitting: boolean;
}

// Prop isSubmitting restaurée
const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Button
        type="submit"
        disabled={isSubmitting} // Logique disabled restaurée
        className="w-full py-3 px-4 h-auto text-base font-medium"
      >
        {/* Logique d'affichage conditionnel restaurée */}
        {isSubmitting ? (
          <>
            <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Envoi en cours...
          </>
        ) : (
          <>
            Envoyer ma demande
            <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default SubmitButton;
