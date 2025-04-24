import React, { useRef } from 'react';
import { motion } from "framer-motion";
// Supprimé: import ReCAPTCHA from "react-google-recaptcha";
import { Mail /*, AlertCircle */ } from 'lucide-react'; // AlertCircle supprimé si formError est retiré
// import { useToast } from "@/hooks/use-toast"; // Supprimé
import { useContactForm } from '@/hooks/use-contact-form'; // Nettoyer ce hook ensuite
import { cn } from '@/lib/utils';
// Supprimé: import { sendContactForm } from '@/utils/emailUtils';
import ContactFeedbackMessage from './ContactFeedbackMessage';
import FormDetailsSection from './FormDetailsSection';
import SubmitButton from './SubmitButton'; // Assurez-vous qu'il rend <button type="submit">
import ToggleDetailsButton from './ToggleDetailsButton';

// Supprimé: const RECAPTCHA_SITE_KEY = ...

const ContactForm = () => {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  // Supprimé: const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Nettoyage des éléments liés au captcha et à la soumission JS
  const {
    showDetails,
    formState,
    contactType,
    // formError, // Supprimé (ou à garder si validation locale)
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
    // validateForm, // Supprimé si plus de validation JS avant soumission
    // handleRecaptchaChange, // Supprimé
  } = useContactForm(); // Pensez à nettoyer la DÉFINITION de ce hook

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

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
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          <motion.h3
            className="text-lg font-semibold text-gray-900"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Discutons de votre projet
          </motion.h3>
          <motion.a
            href="mailto:hello@enkio.fr"
            className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors mt-2 md:mt-0"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
          >
            <Mail className="w-4 h-4 mr-2" />
            hello@enkio.fr
          </motion.a>
        </motion.div>

        {/* Formulaire pointant vers Formspree */}
        <form
          action="https://formspree.io/f/xgvkenaq"
          method="POST"
          className="space-y-6"
        >
          {/* Champ Contact Principal */}
          <div className="mt-4">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
              Comment pouvons-nous vous contacter ?
            </label>
            <div className="relative">
              <input
                type="text"
                id="contact"
                name="contact" // Attribut name pour Formspree
                ref={contactInputRef}
                value={formState.contact}
                onChange={handleInputChange}
                placeholder="Votre email ou numéro de téléphone"
                required // Validation HTML simple
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
              />
              <ContactFeedbackMessage
                contactType={contactType}
                contactValue={formState.contact}
              />
            </div>
          </div>

          {/* Bouton pour afficher/masquer détails */}
          <ToggleDetailsButton
            showDetails={showDetails}
            toggleShowDetails={toggleShowDetails}
          />

          {/* Section des détails */}
          {/* Assurez-vous que les inputs ici ont les bons 'name' */}
          <FormDetailsSection
            showDetails={showDetails}
            formState={formState}
            handleInputChange={handleInputChange}
            handleProjectTypeSelect={handleProjectTypeSelect}
          />

          {/* Optionnel: Champs cachés si les données ne sont pas dans des inputs visibles avec un 'name' */}
          <input type="hidden" name="projectType" value={formState.projectType || ''} />


          {/* DIV contenant reCAPTCHA et formError supprimée */}
          {/*
          <div className="mt-6">
            <ReCAPTCHA ... />
            {formError && ( ... )}
          </div>
          */}

          {/* Bouton de soumission */}
          {/* !!! Rappel: modifier SubmitButton.tsx pour qu'il retourne <button type="submit">... !!! */}
          <SubmitButton />

        </form>

        {/* Texte légal */}
        <motion.div
          className="mt-6 text-center text-xs text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
