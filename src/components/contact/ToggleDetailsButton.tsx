
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToggleDetailsButtonProps {
  showDetails: boolean;
  toggleShowDetails: () => void;
}

const ToggleDetailsButton: React.FC<ToggleDetailsButtonProps> = ({ showDetails, toggleShowDetails }) => {
  return (
    <motion.div 
      className="flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Button
        type="button"
        variant="ghost"
        onClick={toggleShowDetails}
        className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
      >
        {showDetails ? (
          <>
            <ChevronUp className="w-4 h-4 mr-2" />
            Masquer les détails
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4 mr-2" />
            Ajouter des détails sur votre projet
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default ToggleDetailsButton;
