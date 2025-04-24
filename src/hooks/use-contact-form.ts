// src/hooks/use-contact-form.ts - Corrigé pour l'erreur .trim() DANS LES DEUX ENDROITS
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
    // Sécurité pour .trim() et .includes()
    const stringValue = typeof value === 'string' ? value : ''; // Assure que c'est une chaîne

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
    } else if (stringValue.trim().length > 5) { // Utilise trim() sur stringValue (sûr)
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
    setShowDetails(prev => !prev);
  };

  // Validation locale avant envoi JS
  const validateForm = (): boolean => {
    // ---- AJOUT DE LA SÉCURITÉ ICI AUSSI ----
    const contactValue = formState.contact;
    // Assure que nous travaillons toujours avec une chaîne, même si null/undefined
    const contactStringValue = typeof contactValue === 'string' ? contactValue : '';
    // ----------------------------------------

    // Vérifie que contactStringValue n'est pas vide après trim
    if (contactStringValue.trim().length < 6) { // Utilise trim() sur contactStringValue (sûr)
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
