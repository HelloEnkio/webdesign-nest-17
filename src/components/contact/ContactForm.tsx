// src/components/contact/ContactForm.tsx - Avec log avant return
import React, { useRef } from 'react';
import { motion } from "framer-motion";
// Supprimé: import ReCAPTCHA from "react-google-recaptcha";
import { Mail, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useContactForm } from '@/hooks/use-contact-form'; // Utilise la version avec log
import { cn } from '@/lib/utils';
// Supprimé: import { sendContactForm } from '@/utils/emailUtils';
import ContactFeedbackMessage from './ContactFeedbackMessage'; // Assurez-vous que ce fichier est corrigé aussi
import FormDetailsSection from './FormDetailsSection';
import SubmitButton from './SubmitButton'; // Version restaurée avec isSubmitting
import ToggleDetailsButton from './ToggleDetailsButton'; // Version correcte qui appelle toggleShowDetails

// Supprimé: const RECAPTCHA_SITE_KEY = ...

const ContactForm = () => {
  const { toast } = useToast();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  // Supprimé: const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    showDetails,
    formState,
    isSubmitting,
    contactType,
    formError,
    setIsSubmitting,
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails, // Reçoit la fonction avec le log
    validateForm,
    resetForm,
    setFormError
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('[ContactForm] handleSubmit (AJAX) déclenché. État actuel:', { formState });

    if (!validateForm()) {
       console.warn('[ContactForm] Validation locale échouée avant envoi.');
       if (contactInputRef.current && !formState.contact) {
            contactInputRef.current.focus();
       }
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    console.log('[ContactForm] Validation réussie, envoi vers Formspree...');

    const formData = new FormData(e.currentTarget);
    // Assurez-vous que les champs cachés sont bien ajoutés si nécessaire
    // formData.append('projectType', formState.projectType || '');

    try {
      console.log(`[ContactForm] Appel fetch POST vers Formspree à ${new Date().toISOString()}`);
      const response = await fetch("https://formspree.io/f/xgvkenaq", {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('[ContactForm] Réponse brute Formspree:', response);
      console.log(`[ContactForm] Statut réponse Formspree: ${response.status} ${response.statusText}`);

      if (response.ok) {
        console.log('[ContactForm] Soumission Formspree réussie.');
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
        let errorData = { error: `Erreur ${response.status} lors de la soumission.` };
        try {
          errorData = await response.json();
          console.error('[ContactForm] Erreur JSON reçue de Formspree:', errorData);
        } catch (e) {
          console.error('[ContactForm] Impossible de parser la réponse d\'erreur JSON de Formspree.');
        }
        setFormError(errorData.error);
      }
    } catch (error) {
      console.error('[ContactForm] Erreur réseau ou autre lors du fetch vers Formspree:', error);
      const message = error instanceof Error ? error.message : "Erreur inconnue";
      setFormError(`Erreur réseau: ${message}. Veuillez réessayer.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- AJOUT DU LOG ICI ---
  console.log('[ContactForm] Rendu du composant. Valeur de showDetails:', showDetails);
  // ------------------------
  // --- LOGS POUR DEBUGGER LES CLASSES DE L'INPUT ---
  const baseClasses = "w-full px-4 py-3 rounded-lg border focus:ring-1 transition-all";
  const conditionalClasses =
      contactType === 'email' ? "border-indigo-400 focus:ring-indigo-400"
      : contactType === 'phone' ? "border-green-400 focus:ring-green-400"
      : contactType === 'uncertain' ? "border-yellow-400 focus:ring-yellow-400"
      : "border-gray-200 focus:border-indigo-400 focus:ring-indigo-400";

  const finalClasses = cn(baseClasses, conditionalClasses);

  console.log('[ContactForm] Avant rendu - Valeur de contactType:', contactType);
  console.log('[ContactForm] Avant rendu - Classes de base:', baseClasses);
  console.log('[ContactForm] Avant rendu - Classes conditionnelles:', conditionalClasses);
  console.log('[ContactForm] Avant rendu - Résultat final de cn():', finalClasses);
  // ------------------------------------------------
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mt-4">
             <label htmlFor="contact" /* ... */>Comment pouvons-nous vous contacter ?</label>
             <div className="relative">
                {/* Assurez-vous que cet input a name="contact" */}
                <input id="contact" name="contact" /* ... autres props ... */ required />
                <ContactFeedbackMessage contactType={contactType} contactValue={formState.contact} />
             </div>
          </div>

          {/* Ce bouton appelle maintenant toggleShowDetails avec le log */}
          <ToggleDetailsButton showDetails={showDetails} toggleShowDetails={toggleShowDetails} />

          {/* Cette section dépend de showDetails */}
          {/* Assurez-vous que les inputs ici ont les bons 'name' */}
          <FormDetailsSection
              showDetails={showDetails}
              formState={formState}
              handleInputChange={handleInputChange}
              handleProjectTypeSelect={handleProjectTypeSelect}
          />

          {/* Champ caché nécessaire car ProjectTypeSelector n'est pas un input standard */}
          <input type="hidden" name="projectType" value={formState.projectType || ''} />

          {/* Affichage de l'erreur */}
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

          {/* Bouton de soumission qui utilise isSubmitting */}
          <SubmitButton isSubmitting={isSubmitting} />

        </form>

        <motion.div /* ... texte légal ... */ >
           En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
