import React, { useRef } from 'react';
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { Mail, AlertCircle } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast"; // Supprimé car non utilisé pour la soumission
import { useContactForm } from '@/hooks/use-contact-form';
import { cn } from '@/lib/utils';
// Supprimé: import { sendContactForm } from '@/utils/emailUtils';
import ContactFeedbackMessage from './ContactFeedbackMessage';
import FormDetailsSection from './FormDetailsSection';
import SubmitButton from './SubmitButton'; // Assurez-vous que ce composant rend <button type="submit">
import ToggleDetailsButton from './ToggleDetailsButton';

// Récupération de la clé de site reCAPTCHA (toujours nécessaire pour le composant frontend)
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

const ContactForm = () => {
  // const { toast } = useToast(); // Toast n'est plus utilisé ici pour la soumission
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Garde les états et handlers nécessaires pour contrôler les champs
  const {
    showDetails,
    formState,
    contactType,
    formError, // Peut encore servir pour une validation locale si vous en faites une
    // recaptchaToken, // Plus directement nécessaire pour une soumission HTML standard
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
    // validateForm, // La validation se fera via les attributs 'required' ou par Formspree
    handleRecaptchaChange, // Gardé car lié au composant ReCAPTCHA
  } = useContactForm(); // Vous pouvez nettoyer ce hook plus tard pour enlever les états inutilisés

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

          {/* Section des détails (assurez-vous que les inputs ici ont les bons 'name') */}
          <FormDetailsSection
            showDetails={showDetails}
            formState={formState}
            handleInputChange={handleInputChange} // S'assurer que handleInputChange met à jour formState.name, formState.details etc.
            handleProjectTypeSelect={handleProjectTypeSelect} // S'assurer que ceci met à jour formState.projectType
            // IMPORTANT: Les <input> ou <textarea> pour Nom, Type de Projet, Détails dans ce composant
            // doivent avoir les attributs name="name", name="projectType", name="details"
            // pour que Formspree les reçoive. Sinon, utilisez les champs cachés ci-dessous.
          />

          {/* Optionnel: Champs cachés si les données ne sont pas dans des inputs visibles avec un 'name' */}
          {/* Si FormDetailsSection n'a pas d'inputs avec name="name" etc, décommentez/ajoutez ici */}
          {/* <input type="hidden" name="name" value={formState.name || ''} /> */}
          {/* <input type="hidden" name="projectType" value={formState.projectType || ''} /> */}
          {/* <input type="hidden" name="details" value={formState.details || ''} /> */}


          {/* Composant reCAPTCHA */}
          <div className="mt-6">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY} // Clé publique pour le widget
              onChange={handleRecaptchaChange} // Peut être utile si validateForm vérifie que le captcha est coché
            />
            {/* Affichage d'erreur locale (si formError est toujours utilisé) */}
            {formError && (
              <div className="mt-2 flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formError}
              </div>
            )}
          </div>

          {/* Bouton de soumission */}
          {/* Assurez-vous que le composant SubmitButton rend bien <button type="submit"> */}
          <SubmitButton />
          {/* Si SubmitButton n'est pas adapté, remplacez par :
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Envoyer le message
          </button>
          */}
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
