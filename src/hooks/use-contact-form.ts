// src/hooks/use-contact-form.ts - Avec log dans toggleShowDetails
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
    contact: ''
  });

  // Détection du type de contact
  useEffect(() => {
    const value = formState.contact;
    const stringValue = typeof value === 'string' ? value : '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPhoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    const loosePhoneRegex = /\d{6,}/;

    if (emailRegex.test(stringValue)) {
      setContactType('email');
    } else if (strongPhoneRegex.test(stringValue) || loosePhoneRegex.test(stringValue)) {
      setContactType('phone');
    } else if (stringValue.includes('@')) {
      setContactType('email');
    } else if (stringValue.trim().length > 5) {
      setContactType('uncertain');
    } else {
      setContactType(null);
    }
  }, [formState.contact]);

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
    // --- AJOUT DU LOG ICI ---
    console.log('[useContactForm] toggleShowDetails appelée ! État actuel de showDetails:', showDetails);
    // -------------------------
    setShowDetails(prev => !prev);
  };

  // Validation locale avant envoi JS
  const validateForm = (): boolean => {
    const contactValue = formState.contact;
    const contactStringValue = typeof contactValue === 'string' ? contactValue : '';

    if (contactStringValue.trim().length < 6) {
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
    toggleShowDetails, // La fonction avec le log est retournée
    validateForm,
    resetForm,
    setFormError
  };
}
