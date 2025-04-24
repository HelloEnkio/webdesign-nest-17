// src/components/contact/SubmitButton.tsx - Version simplifiée pour HTML Formspree
import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

// L'interface n'est plus nécessaire car il n'y a plus de props
// interface SubmitButtonProps {}

// Le composant ne reçoit plus de props
const SubmitButton: React.FC = () => {
  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Bouton de soumission HTML standard */}
      {/* type="submit" est crucial */}
      {/* L'attribut 'disabled' n'est plus géré ici */}
      <Button
        type="submit"
        className="w-full py-3 px-4 h-auto text-base font-medium"
      >
          Envoyer ma demande
          <Send className="ml-2 h-5 w-5" />
      </Button>
    </motion.div>
  );
};

export default SubmitButton;
