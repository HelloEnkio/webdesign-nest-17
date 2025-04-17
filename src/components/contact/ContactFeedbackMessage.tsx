
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { ContactType } from '@/hooks/use-contact-form';

interface ContactFeedbackMessageProps {
  contactType: ContactType;
  contactValue: string;
}

const ContactFeedbackMessage: React.FC<ContactFeedbackMessageProps> = ({ contactType, contactValue }) => {
  // Skip rendering if no meaningful contact info
  if (contactType === null || contactValue.trim().length <= 3) {
    return null;
  }
  
  // Removed the 'uncertain' feedback message
  const getContactFeedbackMessage = () => {
    if (contactType === 'email') {
      return "Format d'email détecté. Parfait !";
    } else if (contactType === 'phone') {
      return "Format de téléphone détecté. Parfait !";
    }
    return "";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 text-sm font-medium flex items-center"
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
      ) : null}
    </motion.div>
  );
};

export default ContactFeedbackMessage;
