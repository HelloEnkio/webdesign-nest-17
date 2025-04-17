
import { useState, useEffect } from 'react';

export type FormState = {
  name: string;
  projectType: string;
  projectDescription: string;
  contact: string;
};

export type ContactType = 'email' | 'phone' | 'uncertain' | null;

export function useContactForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progressWidth, setProgressWidth] = useState(25);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactType, setContactType] = useState<ContactType>(null);
  
  const [formState, setFormState] = useState<FormState>({
    name: '',
    projectType: '',
    projectDescription: '',
    contact: ''
  });

  // Update progress bar when step changes
  useEffect(() => {
    const progress = ((currentStep + 1) / 4) * 100;
    setProgressWidth(progress);
  }, [currentStep]);
  
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
    // Automatically proceed to next step after selection
    setTimeout(() => {
      handleNextStep();
    }, 300);
  };
  
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 0:
        // Name is now optional
        return true;
      case 1:
        // Project type is now optional
        return true;
      case 2:
        // Project description is now optional
        return true;
      case 3:
        // Only the contact field is required
        return contactType !== null && formState.contact.trim().length > 3;
      default:
        return true;
    }
  };
  
  const resetForm = () => {
    setFormState({
      name: '',
      projectType: '',
      projectDescription: '',
      contact: ''
    });
    setCurrentStep(0);
    setIsSubmitting(false);
  };

  return {
    currentStep,
    progressWidth,
    formState,
    isSubmitting,
    contactType,
    setIsSubmitting,
    handleInputChange,
    handleProjectTypeSelect,
    handleNextStep,
    handlePrevStep,
    validateCurrentStep,
    resetForm
  };
}
