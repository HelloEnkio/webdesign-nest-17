
import React, { useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, ChevronDown, ChevronUp, Send, User, FileText, Package } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useContactForm } from '@/hooks/use-contact-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import ProgressBar from './ProgressBar';

const ContactForm = () => {
  const { toast } = useToast();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  
  const {
    showDetails,
    progressWidth,
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

  // Animation for details section
  const detailsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateContact()) {
      // Highlight the contact field if empty on submission attempt
      if (contactInputRef.current) {
        contactInputRef.current.focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission with a delay
    setTimeout(() => {
      console.log('Form submitted:', formState);
      
      // Reset form and state
      resetForm();
      
      // Success message adapted to the detected contact type
      let contactMessage = "";
      if (contactType === 'email') {
        contactMessage = "Nous vous recontacterons rapidement par e-mail.";
      } else if (contactType === 'phone') {
        contactMessage = "Nous vous rappellerons dans les plus brefs délais.";
      } else {
        contactMessage = "Nous vous recontacterons très bientôt.";
      }
      
      // Show success toast
      toast({
        title: "Message envoyé !",
        description: contactMessage,
        variant: "default",
      });

      // Trigger success animation
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

  // Return a feedback message based on detected contact type
  const getContactFeedbackMessage = () => {
    if (contactType === 'email') {
      return "Format d'email détecté. Parfait !";
    } else if (contactType === 'phone') {
      return "Format de téléphone détecté. Parfait !";
    } else if (contactType === 'uncertain' && formState.contact.trim().length > 3) {
      return "C'est noté, nous utiliserons ces coordonnées pour vous contacter.";
    }
    return "";
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
        
        {/* Progress Bar */}
        <ProgressBar 
          currentStep={0} 
          progressWidth={progressWidth} 
        />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Input - Main Focus */}
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
              
              {(contactType === 'email' || contactType === 'phone' || contactType === 'uncertain') && formState.contact.trim().length > 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm font-medium flex items-center"
                >
                  {contactType === 'email' ? (
                    <span className="text-indigo-600 flex items-center">
                      <Mail size={16} className="mr-2" />
                      {getContactFeedbackMessage()}
                    </span>
                  ) : contactType === 'phone' ? (
                    <span className="text-green-600 flex items-center">
                      <Phone size={16} className="mr-2" />
                      {getContactFeedbackMessage()}
                    </span>
                  ) : (
                    <span className="text-yellow-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3Z"></path><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M12 18v3"></path></svg>
                      {getContactFeedbackMessage()}
                    </span>
                  )}
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Toggle for showing/hiding details */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              type="button"
              variant="ghost"
              onClick={toggleShowDetails}
              className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {showDetails ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Masquer les détails
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Ajouter des détails sur votre projet
                </>
              )}
            </Button>
          </motion.div>
          
          {/* Collapsible Details Section */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={detailsVariants}
                className="overflow-hidden"
              >
                <div className="space-y-4 pt-2">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline-block w-4 h-4 mr-2" />
                      Votre nom
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Votre nom (optionnel)"
                      className="w-full"
                    />
                  </div>
                  
                  {/* Project Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Package className="inline-block w-4 h-4 mr-2" />
                      Type de projet
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {["Site Web", "E-commerce", "Application", "Autre"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleProjectTypeSelect(type)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm border transition-all",
                            formState.projectType === type
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project Description */}
                  <div>
                    <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText className="inline-block w-4 h-4 mr-2" />
                      Description du projet
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={formState.projectDescription}
                      onChange={handleInputChange}
                      placeholder="Décrivez brièvement votre projet (optionnel)"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Submit Button */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting || !validateContact()}
              className="w-full py-3 px-4 h-auto text-base font-medium"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                <>
                  Envoyer ma demande
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>
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
