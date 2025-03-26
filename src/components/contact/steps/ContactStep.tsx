
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import StepWrapper from './StepWrapper';
import { FormState, ContactType } from '@/hooks/use-contact-form';

interface ContactStepProps {
  formState: FormState;
  contactType: ContactType;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContactStep: React.FC<ContactStepProps> = ({ formState, contactType, handleInputChange }) => {
  // Return a feedback message based on detected contact type
  const getContactFeedbackMessage = () => {
    if (contactType === 'email') {
      return "Format d'email détecté. Parfait !";
    } else if (contactType === 'phone') {
      return "Format de téléphone détecté. Parfait !";
    } else if (contactType === 'uncertain' && formState.contact.trim().length > 3) {
      return "C'est noté, nous utiliserons ces coordonnées pour vous contacter.";
    }
    return "";
  };

  return (
    <StepWrapper title="Comment pouvons-nous vous contacter ?" icon={contactType === 'email' ? <Mail size={20} /> : <Phone size={20} />}>
      <div className="relative">
        <input
          type="text"
          name="contact"
          value={formState.contact}
          onChange={handleInputChange}
          placeholder="Votre email ou numéro de téléphone"
          className={cn(
            "w-full px-4 py-3 rounded-lg border focus:ring-1 transition-all",
            contactType === 'email' 
              ? "border-indigo-400 focus:ring-indigo-400" 
              : contactType === 'phone' 
                ? "border-green-400 focus:ring-green-400" 
                : contactType === 'uncertain'
                  ? "border-yellow-400 focus:ring-yellow-400"
                  : "border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
          )}
          autoFocus
        />
        
        {(contactType === 'email' || contactType === 'phone' || contactType === 'uncertain') && formState.contact.trim().length > 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm font-medium flex items-center"
          >
            {contactType === 'email' ? (
              <span className="text-indigo-600 flex items-center">
                <Mail size={16} className="mr-2" />
                {getContactFeedbackMessage()}
              </span>
            ) : contactType === 'phone' ? (
              <span className="text-green-600 flex items-center">
                <Phone size={16} className="mr-2" />
                {getContactFeedbackMessage()}
              </span>
            ) : (
              <span className="text-yellow-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3Z"></path><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M12 18v3"></path></svg>
                {getContactFeedbackMessage()}
              </span>
            )}
          </motion.div>
        )}
      </div>
    </StepWrapper>
  );
};

export default ContactStep;
