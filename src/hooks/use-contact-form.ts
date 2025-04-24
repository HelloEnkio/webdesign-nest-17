// src/hooks/use-contact-form.ts - Version TRÈS simplifiée pour HTML Formspree SANS reCAPTCHA
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
  };

  // Gestion de la sélection du type de projet
  const handleProjectTypeSelect = (type: string) => {
    setFormState(prev => ({ ...prev, projectType: type }));
  };

  // Gestion de l'affichage des détails
  const toggleShowDetails = () => {
    setShowDetails(prev => !prev);
  };

  // Retourne uniquement le strict nécessaire
  return {
    showDetails,
    formState,
    contactType,
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
  };
}
