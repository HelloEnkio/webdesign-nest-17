import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { ContactType } from '@/hooks/use-contact-form';

interface ContactFeedbackMessageProps {
  contactType: ContactType;
  // On peut être plus flexible ici au cas où undefined est passé brièvement
  contactValue: string | null | undefined;
}

const ContactFeedbackMessage: React.FC<ContactFeedbackMessageProps> = ({ contactType, contactValue }) => {
  // ---- AJOUT DE LA SÉCURITÉ ----
  // Assure que nous travaillons toujours avec une chaîne, même si contactValue est null/undefined
  const stringValue = typeof contactValue === 'string' ? contactValue : '';
  // -----------------------------


  // Condition basée sur contactType OU si stringValue (sécurisé) est trop court après trim
  if (contactType === null || stringValue.trim().length <= 3) { // Utilise trim() sur stringValue (sûr)
    return null; // Ne rend rien si pas de type détecté OU si la valeur est trop courte
  }

  // La fonction interne utilise contactType qui est déjà vérifié
  const getContactFeedbackMessage = () => {
    if (contactType === 'email') {
      return "Format d'email détecté. Parfait !";
    } else if (contactType === 'phone') {
      return "Format de téléphone détecté. Parfait !";
    }
    // Ne devrait pas arriver à cause de la condition précédente, mais sécurité
    return "";
  };

  // Le rendu conditionnel utilise contactType qui est déjà vérifié
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
