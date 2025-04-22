import React, { useRef } from 'react';
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { Mail, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useContactForm } from '@/hooks/use-contact-form';
import { cn } from '@/lib/utils';
import { sendContactForm } from '@/utils/emailUtils';
import ContactFeedbackMessage from './ContactFeedbackMessage';
import FormDetailsSection from './FormDetailsSection';
import SubmitButton from './SubmitButton';
import ToggleDetailsButton from './ToggleDetailsButton';

// Replace with your actual reCAPTCHA site key
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

const ContactForm = () => {
  const { toast } = useToast();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const {
    showDetails,
    formState,
    isSubmitting,
    contactType,
    formError,
    recaptchaToken,
    setIsSubmitting,
    handleInputChange,
    handleProjectTypeSelect,
    toggleShowDetails,
    validateForm,
    handleRecaptchaChange,
    resetForm
  } = useContactForm();

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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      if (contactInputRef.current) {
        contactInputRef.current.focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await sendContactForm(formState, recaptchaToken || '');
      const result = await sendContactForm({
        name:          formState.name        || '—',           
        email:         contactType === 'email' ? formState.contact : '',
        phone:         contactType === 'phone' ? formState.contact : '',
        message:       `${formState.projectType}\n${formState.details}`,
        captchaToken:  recaptchaToken || '',
      });
      
      if (result.success) {
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
      } else {
        toast({
          title: "Erreur",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de l'envoi de votre message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
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
            href="mailto:hello@enkio.fr" 
            className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors mt-2 md:mt-0"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
          >
            <Mail className="w-4 h-4 mr-2" />
            hello@enkio.fr
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
          
          <div className="mt-6">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
            />
            
            {formError && (
              <div className="mt-2 flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formError}
              </div>
            )}
          </div>
          
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
