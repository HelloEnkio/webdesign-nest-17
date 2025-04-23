import React, { useRef } from 'react';
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { Mail, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useContactForm } from '@/hooks/use-contact-form';
import { cn } from '@/lib/utils';
// Assurez-vous que le chemin d'importation est correct
import { sendContactForm } from '@/utils/emailUtils';
import ContactFeedbackMessage from './ContactFeedbackMessage';
import FormDetailsSection from './FormDetailsSection';
import SubmitButton from './SubmitButton';
import ToggleDetailsButton from './ToggleDetailsButton';

// Log pour vérifier si la clé de site reCAPTCHA est chargée correctement par Vite
console.log('[FRONTEND ContactForm] Clé reCAPTCHA reçue via import.meta.env:', import.meta.env.VITE_RECAPTCHA_SITE_KEY);

// Récupération de la clé de site reCAPTCHA via les variables d'environnement Vite
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

const ContactForm = () => {
  const { toast } = useToast();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    showDetails,
    formState,
    isSubmitting,
    contactType,
    formError,
    recaptchaToken,
    setIsSubmitting,
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
    validateForm,
    handleRecaptchaChange,
    resetForm
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // <-- LOG : État avant validation et envoi
    console.log('[FRONTEND ContactForm] handleSubmit déclenché. État actuel:', { formState, recaptchaToken });

    if (!validateForm()) {
      if (contactInputRef.current) {
        contactInputRef.current.focus();
      }
      // <-- LOG : Validation échouée
      console.warn('[FRONTEND ContactForm] Validation échouée avant envoi.');
      return;
    }

    // <-- LOG : Juste avant d'appeler sendContactForm
    console.log('[FRONTEND ContactForm] Validation réussie, appel de sendContactForm...');
    setIsSubmitting(true);

    try {
      // Assurez-vous que les arguments passés correspondent à la signature de sendContactForm
      // D'après votre emailUtils.ts, il attend (formData, captchaToken)
      const result = await sendContactForm(formState, recaptchaToken || '');

      // <-- LOG : Résultat de sendContactForm
      console.log('[FRONTEND ContactForm] Résultat de sendContactForm:', result);

      if (result.success) {
        resetForm();

        let contactMessage = "";
        if (contactType === 'email') {
          contactMessage = "Nous vous recontacterons rapidement par e-mail.";
        } else if (contactType === 'phone') {
          contactMessage = "Nous vous rappellerons dans les plus brefs délais.";
        } else {
          contactMessage = "Nous vous recontacterons très bientôt.";
        }

        toast({
          title: "Message envoyé !",
          description: contactMessage,
          variant: "default",
        });

        if (formContainerRef.current) {
          formContainerRef.current.classList.add('success-animation');
          setTimeout(() => {
            if (formContainerRef.current) {
              formContainerRef.current.classList.remove('success-animation');
            }
          }, 2000);
        }
      } else {
        toast({
          title: "Erreur",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
       // <-- LOG : Erreur inattendue
      console.error('[FRONTEND ContactForm] Erreur inattendue dans handleSubmit après sendContactForm:', error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de l'envoi de votre message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mt-4">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
              Comment pouvons-nous vous contacter ?
            </label>
            <div className="relative">
              <input
                type="text"
                id="contact"
                name="contact" // Assurez-vous que ce nom correspond à ce que useContactForm attend
                ref={contactInputRef}
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

          <FormDetailsSection
            showDetails={showDetails}
            formState={formState}
            handleInputChange={handleInputChange}
            handleProjectTypeSelect={handleProjectTypeSelect}
          />

          <div className="mt-6">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY} // Utilise la constante définie en haut
              onChange={handleRecaptchaChange}
            />

            {formError && (
              <div className="mt-2 flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formError}
              </div>
            )}
          </div>

          <SubmitButton isSubmitting={isSubmitting} />
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
