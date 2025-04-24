// src/hooks/use-contact-form.ts - Corrigé pour l'erreur .trim()
import { useState, useEffect } from 'react';

export type FormState = {
  name: string;
  projectType: string;
  projectDescription: string;
  contact: string;
};

export type ContactType = 'email' | 'phone' | 'uncertain' | null;

export function useContactForm() {
  const [showDetails, setShowDetails] = useState(false);
  const [contactType, setContactType] = useState<ContactType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formState, setFormState] = useState<FormState>({
    name: '',
    projectType: '',
    projectDescription: '',
    contact: '' // Initialisé comme chaîne vide
  });

  // Détection du type de contact
  useEffect(() => {
    const value = formState.contact;

    // ---- AJOUT DE LA SÉCURITÉ ----
    // Assure que nous travaillons toujours avec une chaîne, même si value est null/undefined
    const stringValue = typeof value === 'string' ? value : '';
    // -----------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPhoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    const loosePhoneRegex = /\d{6,}/;

    // Utilise stringValue maintenant pour les tests
    if (emailRegex.test(stringValue)) {
      setContactType('email');
    } else if (strongPhoneRegex.test(stringValue) || loosePhoneRegex.test(stringValue)) {
      setContactType('phone');
    } else if (stringValue.includes('@')) { // .includes est sûr sur une chaîne vide
      setContactType('email');
    // Utilise .trim() sur stringValue (qui est garanti d'être une chaîne)
    } else if (stringValue.trim().length > 5) {
      setContactType('uncertain');
    } else {
      setContactType(null);
    }
  }, [formState.contact]); // Se déclenche quand formState.contact change

  // Gestion des changements d'input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError(null);
  };

  // Gestion de la sélection du type de projet
  const handleProjectTypeSelect = (type: string) => {
    setFormState(prev => ({ ...prev, projectType: type }));
  };

  // Gestion de l'affichage des détails
  const toggleShowDetails = () => {
    setShowDetails(prev => !prev);
  };

  // Validation locale avant envoi JS
  const validateForm = (): boolean => {
    // Vérifie que contact n'est pas null/undefined ET n'est pas vide après trim
    if (!formState.contact || formState.contact.trim().length < 6) {
      setFormError("Veuillez fournir un contact valide (email ou téléphone).");
      return false;
    }
    setFormError(null);
    return true;
  };

  // Reset du formulaire
  const resetForm = () => {
    setFormState({
      name: '',
      projectType: '',
      projectDescription: '',
      contact: ''
    });
    setShowDetails(false);
    setIsSubmitting(false);
    setFormError(null);
  };

  // Retourne les éléments nécessaires
  return {
    showDetails,
    formState,
    isSubmitting,
    contactType,
    formError,
    setIsSubmitting,
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
    validateForm,
    resetForm,
    setFormError
  };
}
