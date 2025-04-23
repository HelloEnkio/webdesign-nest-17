import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Supprimé : l'interface n'a plus besoin de isSubmitting
// interface SubmitButtonProps {
//  isSubmitting: boolean;
// }

// On enlève la prop isSubmitting des paramètres
const SubmitButton: React.FC = () => {
  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Le bouton est maintenant un simple bouton de soumission */}
      {/* L'attribut 'disabled' basé sur isSubmitting est supprimé */}
      <Button
        type="submit"
        className="w-full py-3 px-4 h-auto text-base font-medium"
      >
        {/* Affiche toujours le texte et l'icône par défaut */}
        <>
          Envoyer ma demande
          <Send className="ml-2 h-5 w-5" />
        </>
      </Button>
    </motion.div>
  );
};

export default SubmitButton;
