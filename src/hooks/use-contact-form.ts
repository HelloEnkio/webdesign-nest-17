
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactType, setContactType] = useState<ContactType>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  
  const [formState, setFormState] = useState<FormState>({
    name: '',
    projectType: '',
    projectDescription: '',
    contact: ''
  });

  // Detect contact type
  useEffect(() => {
    const value = formState.contact;
    
    // Regex for email and phone (more flexible)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPhoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    const loosePhoneRegex = /\d{6,}/; // At least 6 consecutive digits
    
    if (emailRegex.test(value)) {
      setContactType('email');
    } else if (strongPhoneRegex.test(value)) {
      setContactType('phone');
    } else if (loosePhoneRegex.test(value)) {
      // If we find at least 6 digits, probably a phone number
      setContactType('phone');
    } else if (value.includes('@')) {
      // If we find @ somewhere, probably an email
      setContactType('email');
    } else if (value.trim().length > 5) {
      // If there's at least a few characters, accept as uncertain
      setContactType('uncertain');
    } else {
      setContactType(null);
    }
  }, [formState.contact]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProjectTypeSelect = (type: string) => {
    setFormState(prev => ({ ...prev, projectType: type }));
  };
  
  const toggleShowDetails = () => {
    setShowDetails(prev => !prev);
  };
  
  const validateContact = (): boolean => {
    // Only validate that there's some kind of contact info
    return contactType !== null && formState.contact.trim().length > 3;
  };
  
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (!token) {
      setFormError("Veuillez valider le captcha");
    } else {
      setFormError(null);
    }
  };
  
  const validateForm = (): boolean => {
    if (!validateContact()) {
      setFormError("Veuillez fournir un moyen de contact valide");
      return false;
    }
    
    if (!recaptchaToken) {
      setFormError("Veuillez valider le captcha");
      return false;
    }
    
    setFormError(null);
    return true;
  };
  
  const resetForm = () => {
    setFormState({
      name: '',
      projectType: '',
      projectDescription: '',
      contact: ''
    });
    setShowDetails(false);
    setIsSubmitting(false);
    setRecaptchaToken(null);
    setFormError(null);
  };

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
    validateContact,
    validateForm,
    handleRecaptchaChange,
    resetForm
  };
}
