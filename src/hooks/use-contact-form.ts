// src/hooks/use-contact-form.ts - Révisé pour AJAX Formspree
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
  const [isSubmitting, setIsSubmitting] = useState(false); // <-- Réintroduit
  const [formError, setFormError] = useState<string | null>(null); // <-- Réintroduit (pour les erreurs locales ou serveur)
  // const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null); // Supprimé car recaptcha enlevé

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
    // Efface l'erreur si l'utilisateur commence à corriger
    if (formError) setFormError(null);
  };

  // Gestion de la sélection du type de projet (conservée)
  const handleProjectTypeSelect = (type: string) => {
    setFormState(prev => ({ ...prev, projectType: type }));
  };

  // Gestion de l'affichage des détails (conservée)
  const toggleShowDetails = () => {
    setShowDetails(prev => !prev);
  };

  // Validation simple avant envoi JS (exemple)
  const validateForm = (): boolean => {
    if (!formState.contact || formState.contact.trim().length < 6) { // Validation simple
      setFormError("Veuillez fournir un contact valide (email ou téléphone).");
      return false;
    }
    // Ajoutez d'autres validations si nécessaire (ex: projet sélectionné?)

    setFormError(null);
    return true;
  };

  // Reset du formulaire (réintroduit)
  const resetForm = () => {
    setFormState({
      name: '',
      projectType: '',
      projectDescription: '',
      contact: ''
    });
    setShowDetails(false);
    setIsSubmitting(false); // Assurez-vous de le remettre à false
    setFormError(null);
    // Plus besoin de reset le recaptchaRef
  };

  // Retourne les éléments nécessaires
  return {
    showDetails,
    formState,
    isSubmitting, // <-- Réintroduit
    contactType,
    formError, // <-- Réintroduit
    setIsSubmitting, // <-- Réintroduit
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
    validateForm, // <-- Réintroduit (version simplifiée)
    resetForm // <-- Réintroduit
  };
}
