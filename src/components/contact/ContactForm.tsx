import React, { useRef } from 'react';
import { motion } from "framer-motion";
// Supprimé: import ReCAPTCHA from "react-google-recaptcha";
import { Mail, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"; // <-- Réintroduit
import { useContactForm } from '@/hooks/use-contact-form'; // Utilise la version révisée
import { cn } from '@/lib/utils';
// Supprimé: import { sendContactForm } from '@/utils/emailUtils';
import ContactFeedbackMessage from './ContactFeedbackMessage';
import FormDetailsSection from './FormDetailsSection';
import SubmitButton from './SubmitButton'; // Doit de nouveau accepter isSubmitting
import ToggleDetailsButton from './ToggleDetailsButton';

// Supprimé: const RECAPTCHA_SITE_KEY = ...

const ContactForm = () => {
  const { toast } = useToast(); // <-- Réintroduit
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  // Supprimé: const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Utilise le hook mis à jour
  const {
    showDetails,
    formState,
    isSubmitting, // <-- Réintroduit
    contactType,
    formError, // <-- Réintroduit
    setIsSubmitting, // <-- Réintroduit
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
    validateForm, // <-- Réintroduit
    resetForm // <-- Réintroduit
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

  // Fonction handleSubmit réintroduite et adaptée pour Formspree AJAX
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Type l'événement correctement
    e.preventDefault(); // Empêche la soumission HTML standard

    console.log('[FRONTEND ContactForm] handleSubmit (AJAX) déclenché. État actuel:', { formState });

    // Validation locale simple avant d'envoyer
    if (!validateForm()) {
       console.warn('[FRONTEND ContactForm] Validation locale échouée avant envoi.');
       if (contactInputRef.current && !formState.contact) {
            contactInputRef.current.focus();
       }
       // Le message d'erreur est déjà défini par validateForm via setFormError
      return;
    }

    setIsSubmitting(true);
    setFormError(null); // Efface les erreurs précédentes
    console.log('[FRONTEND ContactForm] Validation réussie, envoi vers Formspree...');

    // Préparation des données pour Formspree (FormData est souvent bien géré)
    const formData = new FormData(e.currentTarget);
    // Vous pouvez ajouter des champs supplémentaires si nécessaire
    // formData.append('champSupplementaire', 'valeur');

    try {
      const response = await fetch("https://formspree.io/f/xgvkenaq", {
        method: 'POST',
        body: formData, // Envoi en tant que FormData
        headers: {
          'Accept': 'application/json' // Très important pour obtenir une réponse JSON
        }
      });

      console.log('[FRONTEND ContactForm] Réponse brute Formspree:', response);
      console.log(`[FRONTEND ContactForm] Statut réponse Formspree: ${response.status} ${response.statusText}`);

      if (response.ok) {
        // const result = await response.json(); // Formspree renvoie {ok: true} ou similaire
        console.log('[FRONTEND ContactForm] Soumission Formspree réussie.');
        resetForm(); // Réinitialise le formulaire React

        // Affichage du toast de succès
        toast({
          title: "Message envoyé !",
          description: "Nous avons bien reçu votre demande et vous recontacterons bientôt.",
          variant: "default",
        });
         // Animation succès (facultatif)
         if (formContainerRef.current) {
             formContainerRef.current.classList.add('success-animation');
             setTimeout(() => {
                 if (formContainerRef.current) {
                     formContainerRef.current.classList.remove('success-animation');
                 }
             }, 2000);
         }

      } else {
        // Essaye de lire l'erreur JSON de Formspree
        let errorData = { error: "Une erreur s'est produite lors de la soumission." };
        try {
          errorData = await response.json();
          console.error('[FRONTEND ContactForm] Erreur JSON reçue de Formspree:', errorData);
        } catch (e) {
          console.error('[FRONTEND ContactForm] Impossible de parser la réponse d\'erreur JSON de Formspree.');
        }
        // Affiche l'erreur via formError ou toast
        setFormError(errorData.error); // Affiche sous le formulaire
        // Ou utilisez un toast:
        // toast({
        //   title: "Erreur de soumission",
        //   description: errorData.error,
        //   variant: "destructive",
        // });
      }
    } catch (error) {
      console.error('[FRONTEND ContactForm] Erreur réseau ou autre lors du fetch vers Formspree:', error);
      setFormError("Erreur réseau. Veuillez réessayer.");
      // Ou utilisez un toast:
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

        {/* Le formulaire utilise maintenant onSubmit */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Contact Principal (pas de changement ici) */}
          <div className="mt-4">
             <label htmlFor="contact" /* ... */>Comment pouvons-nous vous contacter ?</label>
             <div className="relative">
                <input name="contact" /* ... */ required />
                <ContactFeedbackMessage /* ... */ />
             </div>
          </div>

          {/* Bouton pour afficher/masquer détails (pas de changement ici) */}
          <ToggleDetailsButton /* ... */ />

          {/* Section des détails (pas de changement ici, assurez-vous que les inputs ont les bons 'name') */}
          <FormDetailsSection /* ... */ />

          {/* Plus besoin des champs cachés si FormDetailsSection a les bons 'name' */}
          {/* Sinon, gardez/ajoutez les ici : */}
          {/* <input type="hidden" name="projectType" value={formState.projectType || ''} /> */}


          {/* Affichage de formError (réintroduit pour validation locale/serveur) */}
          <div className="mt-6 min-h-[20px]"> {/* Espace pour l'erreur */}
            {formError && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formError}
              </div>
            )}
          </div>

          {/* Bouton de soumission qui utilise maintenant isSubmitting */}
          {/* !!! Rappel: restaurer SubmitButton.tsx pour qu'il accepte et utilise 'isSubmitting' !!! */}
          <SubmitButton isSubmitting={isSubmitting} />

        </form>

        {/* Texte légal (pas de changement ici) */}
        <motion.div /* ... */ >
           En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
