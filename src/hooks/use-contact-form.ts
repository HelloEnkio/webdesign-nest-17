// src/hooks/use-contact-form.ts - Version simplifiée pour Formspree
import { useState, useEffect } from 'react';

// Garde la définition de l'état du formulaire
export type FormState = {
  name: string;
  projectType: string;
  projectDescription: string; // Gardé car utilisé dans FormDetailsSection
  contact: string;
  // Supprimé: details n'était pas dans la définition originale,
  // mais projectDescription existe. Assurez-vous que c'est bien 'projectDescription'
  // que vous voulez envoyer (il a un name="projectDescription" dans le textarea)
};

export type ContactType = 'email' | 'phone' | 'uncertain' | null;

export function useContactForm() {
  const [showDetails, setShowDetails] = useState(false);
  const [contactType, setContactType] = useState<ContactType>(null);
  // Supprimé: const [isSubmitting, setIsSubmitting] = useState(false);
  // Supprimé: const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  // Supprimé: const [formError, setFormError] = useState<string | null>(null);

  const [formState, setFormState] = useState<FormState>({
    name: '',
    projectType: '',
    projectDescription: '', // Initialise projectDescription
    contact: ''
  });

  // Détection du type de contact (conservée)
  useEffect(() => {
    const value = formState.contact;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPhoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    const loosePhoneRegex = /\d{6,}/;

    if (emailRegex.test(value)) {
      setContactType('email');
    } else if (strongPhoneRegex.test(value) || loosePhoneRegex.test(value)) {
      setContactType('phone');
    } else if (value.includes('@')) {
      setContactType('email');
    } else if (value.trim().length > 5) {
      setContactType('uncertain');
    } else {
      setContactType(null);
    }
  }, [formState.contact]);

  // Gestion des changements d'input (conservée)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  // Gestion de la sélection du type de projet (conservée)
  const handleProjectTypeSelect = (type: string) => {
    setFormState(prev => ({ ...prev, projectType: type }));
  };

  // Gestion de l'affichage des détails (conservée)
  const toggleShowDetails = () => {
    setShowDetails(prev => !prev);
  };

  // Supprimé: validateContact
  // Supprimé: handleRecaptchaChange
  // Supprimé: validateForm
  // Supprimé: resetForm

  // Retourne uniquement les éléments nécessaires au formulaire contrôlé
  return {
    showDetails,
    formState,
    contactType,
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
    // Les fonctions et états supprimés ne sont plus retournés
  };
}
