// src/hooks/use-contact-form.ts - Version pour AJAX Formspree (sans reCAPTCHA)
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
  const [isSubmitting, setIsSubmitting] = useState(false); // <-- Restauré
  const [formError, setFormError] = useState<string | null>(null); // <-- Restauré

  const [formState, setFormState] = useState<FormState>({
    name: '',
    projectType: '',
    projectDescription: '',
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
    if (formError) setFormError(null); // Efface l'erreur si l'utilisateur corrige
  };

  // Gestion de la sélection du type de projet (conservée)
  const handleProjectTypeSelect = (type: string) => {
    setFormState(prev => ({ ...prev, projectType: type }));
  };

  // Gestion de l'affichage des détails (conservée)
  const toggleShowDetails = () => {
    setShowDetails(prev => !prev);
  };

  // Validation locale avant envoi JS (restaurée, sans reCAPTCHA)
  const validateForm = (): boolean => {
    if (!formState.contact || formState.contact.trim().length < 6) {
      setFormError("Veuillez fournir un contact valide (email ou téléphone).");
      return false;
    }
    // Supprimé: Validation du token reCAPTCHA

    setFormError(null);
    return true;
  };

  // Reset du formulaire (restauré)
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
    // Supprimé: reset du recaptchaRef
  };

  // HandleRecaptchaChange est supprimé car reCAPTCHA est enlevé

  // Retourne les éléments nécessaires, y compris ceux restaurés
  return {
    showDetails,
    formState,
    isSubmitting,
    contactType,
    formError,
    setIsSubmitting, // Important de retourner le setter
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
    validateForm, // Important de retourner la validation
    resetForm, // Important de retourner le reset
    setFormError // Retourne le setter d'erreur si besoin externe
  };
}
