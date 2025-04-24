import React, { useRef } from 'react';
import { motion } from "framer-motion";
// Supprimé: import ReCAPTCHA from "react-google-recaptcha";
import { Mail, AlertCircle } from 'lucide-react'; // AlertCircle réintroduit pour formError
import { useToast } from "@/hooks/use-toast"; // <-- Réintroduit
import { useContactForm } from '@/hooks/use-contact-form'; // Utilise la version restaurée du hook
import { cn } from '@/lib/utils';
// Supprimé: import { sendContactForm } from '@/utils/emailUtils';
import ContactFeedbackMessage from './ContactFeedbackMessage';
import FormDetailsSection from './FormDetailsSection';
import SubmitButton from './SubmitButton'; // Utilise la version restaurée avec isSubmitting
import ToggleDetailsButton from './ToggleDetailsButton';

// Supprimé: const RECAPTCHA_SITE_KEY = ...

const ContactForm = () => {
  const { toast } = useToast(); // <-- Réintroduit
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  // Supprimé: const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Déstructure les éléments nécessaires depuis le hook restauré
  const {
    showDetails,
    formState,
    isSubmitting,     // <-- Nécessaire
    contactType,
    formError,        // <-- Nécessaire
    setIsSubmitting,  // <-- Nécessaire
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
    validateForm,     // <-- Nécessaire
    resetForm,        // <-- Nécessaire
    setFormError      // <-- Nécessaire
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

  // Fonction handleSubmit pour soumission AJAX vers Formspree
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('[FRONTEND ContactForm] handleSubmit (AJAX) déclenché. État actuel:', { formState });

    if (!validateForm()) {
      console.warn('[FRONTEND ContactForm] Validation locale échouée avant envoi.');
      if (contactInputRef.current && !formState.contact) {
           contactInputRef.current.focus();
      }
      // L'erreur est définie dans validateForm via setFormError
      return;
    }

    setIsSubmitting(true);
    setFormError(null); // Efface les erreurs précédentes
    console.log('[FRONTEND ContactForm] Validation réussie, envoi vers Formspree...');

    const formData = new FormData(e.currentTarget);
    // Ajoutez ici d'autres champs si nécessaire avant l'envoi
    // formData.append('projectType', formState.projectType || ''); // Exemple si pas dans FormDetailsSection

    try {
      const response = await fetch("https://formspree.io/f/xgvkenaq", {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json' // Important pour la réponse AJAX
        }
      });

      console.log('[FRONTEND ContactForm] Réponse brute Formspree:', response);
      console.log(`[FRONTEND ContactForm] Statut réponse Formspree: ${response.status} ${response.statusText}`);

      if (response.ok) {
        console.log('[FRONTEND ContactForm] Soumission Formspree réussie.');
        resetForm();

        toast({
          title: "Message envoyé !",
          description: "Nous avons bien reçu votre demande et vous recontacterons bientôt.",
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
        let errorData = { error: `Erreur ${response.status} lors de la soumission.` }; // Message par défaut
        try {
          errorData = await response.json();
          console.error('[FRONTEND ContactForm] Erreur JSON reçue de Formspree:', errorData);
        } catch (e) {
          console.error('[FRONTEND ContactForm] Impossible de parser la réponse d\'erreur JSON de Formspree.');
        }
        setFormError(errorData.error); // Affiche l'erreur Formspree sous le formulaire
        // Optionnel: afficher aussi un toast d'erreur
        // toast({
        //   title: "Erreur de soumission",
        //   description: errorData.error,
        //   variant: "destructive",
        // });
      }
    } catch (error) {
      console.error('[FRONTEND ContactForm] Erreur réseau ou autre lors du fetch vers Formspree:', error);
      const message = error instanceof Error ? error.message : "Erreur inconnue";
      setFormError(`Erreur réseau: ${message}. Veuillez réessayer.`);
      // Optionnel: afficher aussi un toast d'erreur réseau
      // toast({
      //   title: "Erreur réseau",
      //   description: "Impossible de contacter le serveur de formulaire.",
      //   variant: "destructive",
      // });
    } finally {
      setIsSubmitting(false); // Réactive le bouton
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
          // ... (pas de changement ici) ...
        >
           <motion.h3 /* ... */ >Discutons de votre projet</motion.h3>
           <motion.a href="mailto:hello@enkio.fr" /* ... */>
               <Mail className="w-4 h-4 mr-2" /> hello@enkio.fr
           </motion.a>
        </motion.div>

        {/* Le formulaire utilise onSubmit pour la soumission AJAX */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Contact Principal */}
          <div className="mt-4">
             <label htmlFor="contact" /* ... */>Comment pouvons-nous vous contacter ?</label>
             <div className="relative">
                <input name="contact" /* ... */ required />
                <ContactFeedbackMessage /* ... */ />
             </div>
          </div>

          {/* Bouton pour afficher/masquer détails */}
          <ToggleDetailsButton /* ... */ />

          {/* Section des détails (vérifiez les 'name' à l'intérieur) */}
          <FormDetailsSection /* ... */ />

          {/* Champ caché pour projectType si pas dans FormDetailsSection */}
          <input type="hidden" name="projectType" value={formState.projectType || ''} />

          {/* Zone pour afficher les erreurs */}
          <div className="mt-6 min-h-[20px]">
            {formError && (
              <motion.div
                 className="flex items-center text-red-500 text-sm"
                 initial={{ opacity: 0}}
                 animate={{ opacity: 1}}
                 exit={{ opacity: 0}}
              >
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {formError}
              </motion.div>
            )}
          </div>

          {/* Bouton de soumission (qui utilise isSubmitting) */}
          <SubmitButton isSubmitting={isSubmitting} />

        </form>

        {/* Texte légal */}
        <motion.div /* ... */ >
           En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
