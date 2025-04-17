
import React, { useRef } from 'react';
import { motion } from "framer-motion";
import { Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useContactForm } from '@/hooks/use-contact-form';
import { cn } from '@/lib/utils';
import ContactFeedbackMessage from './ContactFeedbackMessage';
import FormDetailsSection from './FormDetailsSection';
import SubmitButton from './SubmitButton';
import ToggleDetailsButton from './ToggleDetailsButton';

const ContactForm = () => {
  const { toast } = useToast();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  
  const {
    showDetails,
    formState,
    isSubmitting,
    contactType,
    setIsSubmitting,
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
    validateContact,
    resetForm
  } = useContactForm();

  // Animation for container
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateContact()) {
      if (contactInputRef.current) {
        contactInputRef.current.focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formState);
      
      resetForm();
      
      let contactMessage = "";
      if (contactType === 'email') {
        contactMessage = "Nous vous recontacterons rapidement par e-mail.";
      } else if (contactType === 'phone') {
        contactMessage = "Nous vous rappellerons dans les plus brefs délais.";
      } else {
        contactMessage = "Nous vous recontacterons très bientôt.";
      }
      
      toast({
        title: "Message envoyé !",
        description: contactMessage,
        variant: "default",
      });

      if (formContainerRef.current) {
        formContainerRef.current.classList.add('success-animation');
        setTimeout(() => {
          if (formContainerRef.current) {
            formContainerRef.current.classList.remove('success-animation');
          }
        }, 2000);
      }
    }, 1500);
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
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          <motion.h3 
            className="text-lg font-semibold text-gray-900"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Discutons de votre projet
          </motion.h3>
          <motion.a 
            href="mailto:contact@studio-web.fr" 
            className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors mt-2 md:mt-0"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
          >
            <Mail className="w-4 h-4 mr-2" />
            contact@studio-web.fr
          </motion.a>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mt-4">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
              Comment pouvons-nous vous contacter ?
            </label>
            <div className="relative">
              <input
                type="text"
                id="contact"
                name="contact"
                ref={contactInputRef}
                value={formState.contact}
                onChange={handleInputChange}
                placeholder="Votre email ou numéro de téléphone"
                className={cn(
                  "w-full px-4 py-3 rounded-lg border focus:ring-1 transition-all",
                  contactType === 'email' 
                    ? "border-indigo-400 focus:ring-indigo-400" 
                    : contactType === 'phone' 
                      ? "border-green-400 focus:ring-green-400" 
                      : contactType === 'uncertain'
                        ? "border-yellow-400 focus:ring-yellow-400"
                        : "border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                )}
                autoFocus
              />
              
              <ContactFeedbackMessage 
                contactType={contactType} 
                contactValue={formState.contact} 
              />
            </div>
          </div>
          
          <ToggleDetailsButton 
            showDetails={showDetails} 
            toggleShowDetails={toggleShowDetails} 
          />
          
          <FormDetailsSection 
            showDetails={showDetails}
            formState={formState}
            handleInputChange={handleInputChange}
            handleProjectTypeSelect={handleProjectTypeSelect}
          />
          
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
        
        <motion.div 
          className="mt-6 text-center text-xs text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
