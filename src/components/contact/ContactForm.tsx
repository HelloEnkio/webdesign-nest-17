import React, { useRef } from 'react';
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { Mail, AlertCircle } from 'lucide-react';
// Importez useToast si vous l'utilisez toujours pour d'autres retours (ex: validation)
// import { useToast } from "@/hooks/use-toast";
import { useContactForm } from '@/hooks/use-contact-form';
import { cn } from '@/lib/utils';
// Supprimé: import { sendContactForm } from '@/utils/emailUtils';
import ContactFeedbackMessage from './ContactFeedbackMessage';
import FormDetailsSection from './FormDetailsSection';
import SubmitButton from './SubmitButton'; // Assurez-vous que ce bouton fonctionne maintenant comme un simple bouton de soumission
import ToggleDetailsButton from './ToggleDetailsButton';

// Log initial (peut être supprimé une fois que tout fonctionne)
console.log('[FRONTEND ContactForm] Clé reCAPTCHA reçue via import.meta.env:', import.meta.env.VITE_RECAPTCHA_SITE_KEY);

// Récupération de la clé de site reCAPTCHA via les variables d'environnement Vite
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

const ContactForm = () => {
  // const { toast } = useToast(); // Supprimé si plus utilisé pour la soumission
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Simplification potentielle du hook - gardez ce qui est nécessaire pour les inputs contrôlés
  const {
    showDetails,
    formState,
    // isSubmitting, // Supprimé
    contactType,
    formError, // Peut-être encore utile pour la validation locale ? Sinon à supprimer.
    // recaptchaToken, // Probablement plus nécessaire directement ici
    // setIsSubmitting, // Supprimé
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
    validateForm, // Peut-être utile pour désactiver le bouton submit ? Sinon à supprimer.
    handleRecaptchaChange, // Gardé pour le composant ReCAPTCHA
    // resetForm // La soumission standard navigue ou Formspree redirige
  } = useContactForm();

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

  // Plus de fonction handleSubmit asynchrone ici

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

        {/* Modification de la balise form */}
        <form
          action="https://formspree.io/f/xgvkenaq"
          method="POST"
          className="space-y-6"
        >
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
                required // Ajout de la validation HTML simple
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

          <ToggleDetailsButton
            showDetails={showDetails}
            toggleShowDetails={toggleShowDetails}
          />

          {/* Assurez-vous que les inputs à l'intérieur ont des attributs 'name' si nécessaire */}
          <FormDetailsSection
            showDetails={showDetails}
            formState={formState}
            handleInputChange={handleInputChange}
            handleProjectTypeSelect={handleProjectTypeSelect}
          />

          {/* Ajout de champs cachés pour les données non directement entrées */}
          {/* Assurez-vous que formState contient bien 'name', 'projectType', 'details' */}
          <input type="hidden" name="name" value={formState.name || ''} />
          <input type="hidden" name="projectType" value={formState.projectType || ''} />
          {/* Si details est dans FormDetailsSection, assurez-vous qu'il a un name="details" */}
          {/* Ou envoyez-le via un champ caché si géré dans formState */}
          <input type="hidden" name="details" value={formState.details || ''} />

          {/* Champ reCAPTCHA (Formspree le détectera) */}
          <div className="mt-6">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange} // Gardé au cas où validateForm l'utilise
            />
            {/* Affichage d'erreur locale (validation ou recaptcha non coché) */}
            {formError && (
              <div className="mt-2 flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formError}
              </div>
            )}
          </div>

          {/* Bouton de soumission standard */}
          {/* Adaptez SubmitButton pour qu'il soit un <button type="submit"> */}
          {/* S'il a besoin d'être désactivé, basez-le sur !validateForm() ou l'état du recaptcha */}
          <SubmitButton /* isSubmitting={...} n'est plus pertinent ici */ />
          {/* Alternative simple : <button type="submit" className="...">Envoyer</button> */}

        </form>

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
