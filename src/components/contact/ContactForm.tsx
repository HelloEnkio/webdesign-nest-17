// src/components/contact/ContactForm.tsx - Version pour HTML Formspree SANS reCAPTCHA
import React, { useRef } from 'react';
import { motion } from "framer-motion";
// Supprimé: import ReCAPTCHA from "react-google-recaptcha";
import { Mail } from 'lucide-react';
// Supprimé: import { useToast } from "@/hooks/use-toast";
import { useContactForm } from '@/hooks/use-contact-form'; // Utilise la version très simplifiée
import { cn } from '@/lib/utils';
// Supprimé: import { sendContactForm } from '@/utils/emailUtils';
import ContactFeedbackMessage from './ContactFeedbackMessage'; // Vérifiez qu'il est corrigé
import FormDetailsSection from './FormDetailsSection'; // Vérifiez les 'name' des champs ici
import SubmitButton from './SubmitButton'; // Utilise la version simplifiée sans isSubmitting
import ToggleDetailsButton from './ToggleDetailsButton';

// Supprimé: const RECAPTCHA_SITE_KEY = ...

const ContactForm = () => {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  // Supprimé: const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Utilise uniquement les retours nécessaires du hook simplifié
  const {
    showDetails,
    formState,
    contactType,
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
  } = useContactForm();

  const containerVariants = { /* ... (pas de changement) ... */ };

  // La fonction handleSubmit a été supprimée

  return (
    <motion.div
      ref={formContainerRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 transition-all duration-300 hover:shadow-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
          // ...
        >
           <motion.h3 /* ... */ >Discutons de votre projet</motion.h3>
           <motion.a href="mailto:hello@enkio.fr" /* ... */>
               <Mail className="w-4 h-4 mr-2" /> hello@enkio.fr
           </motion.a>
        </motion.div>

        {/* Formulaire pointant vers Formspree avec méthode POST standard */}
        <form
          action="https://formspree.io/f/xgvkenaq"
          method="POST"
          className="space-y-6"
        >
          {/* Champ Contact Principal */}
          <div className="mt-4">
             <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">Comment pouvons-nous vous contacter ?</label>
             <div className="relative">
                {/* Vérifiez que cet input a bien les classes de style ! */}
                <input
                    type="text"
                    id="contact"
                    name="contact" // Attribut name pour Formspree
                    ref={contactInputRef}
                    value={formState.contact}
                    onChange={handleInputChange}
                    placeholder="Votre email ou numéro de téléphone"
                    required
                    // Remettez les classes statiques qui fonctionnaient ou celles de base
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                 />
                <ContactFeedbackMessage contactType={contactType} contactValue={formState.contact} />
             </div>
          </div>

          {/* Bouton pour afficher/masquer détails */}
          <ToggleDetailsButton showDetails={showDetails} toggleShowDetails={toggleShowDetails} />

          {/* Section des détails */}
          {/* !!! Assurez-vous que les inputs/textarea ici ont name="name", name="projectDescription" !!! */}
          <FormDetailsSection
              showDetails={showDetails}
              formState={formState}
              handleInputChange={handleInputChange}
              handleProjectTypeSelect={handleProjectTypeSelect}
          />

          {/* Champ caché pour projectType */}
          <input type="hidden" name="projectType" value={formState.projectType || ''} />

          {/* Zone reCAPTCHA et Erreur supprimées */}

          {/* Bouton de soumission simple */}
          {/* !!! Assurez-vous que SubmitButton.tsx retourne <button type="submit">... !!! */}
          <SubmitButton />

        </form>

        {/* Texte légal */}
        <motion.div className="mt-6 text-center text-xs text-gray-500" /* ... */ >
           En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
