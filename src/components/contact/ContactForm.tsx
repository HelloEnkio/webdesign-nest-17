
import React, { useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Mail, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useContactForm } from '@/hooks/use-contact-form';

// Component imports
import NameStep from './steps/NameStep';
import ProjectTypeStep from './steps/ProjectTypeStep';
import ProjectDescriptionStep from './steps/ProjectDescriptionStep';
import ContactStep from './steps/ContactStep';
import ProgressBar from './ProgressBar';
import FormNavigation from './FormNavigation';

const ContactForm = () => {
  const { toast } = useToast();
  const formContainerRef = useRef<HTMLDivElement>(null);
  
  const {
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
  } = useContactForm();

  // Enhanced animation variants for step transitions
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    })
  };
  
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
    
    // Only proceed to submission if we're on the last step
    if (currentStep === 3) {
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
    } else {
      // If not on the last step, just move to the next step
      handleNextStep();
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
            href="mailto:contact@studio-web.fr" 
            className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors mt-2 md:mt-0"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
          >
            <Mail className="w-4 h-4 mr-2" />
            contact@studio-web.fr
            <ExternalLink className="w-3 h-3 ml-1" />
          </motion.a>
        </motion.div>
        
        {/* Progress Bar */}
        <ProgressBar 
          currentStep={currentStep} 
          progressWidth={progressWidth} 
        />
        
        <form onSubmit={handleSubmit}>
          <div className="min-h-[280px] flex items-start justify-center">
            <AnimatePresence mode="wait" initial={false} custom={currentStep}>
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  custom={currentStep}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.4 
                  }}
                  className="w-full"
                >
                  <NameStep 
                    formState={formState} 
                    handleInputChange={handleInputChange} 
                  />
                </motion.div>
              )}
              
              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  custom={currentStep}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.4 
                  }}
                  className="w-full"
                >
                  <ProjectTypeStep 
                    formState={formState} 
                    handleProjectTypeSelect={handleProjectTypeSelect} 
                  />
                </motion.div>
              )}
              
              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  custom={currentStep}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.4 
                  }}
                  className="w-full"
                >
                  <ProjectDescriptionStep 
                    formState={formState} 
                    handleInputChange={handleInputChange} 
                  />
                </motion.div>
              )}
              
              {currentStep === 3 && (
                <motion.div
                  key="step4"
                  custom={currentStep}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30, 
                    duration: 0.4 
                  }}
                  className="w-full"
                >
                  <ContactStep 
                    formState={formState} 
                    contactType={contactType} 
                    handleInputChange={handleInputChange} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Form Navigation */}
          <FormNavigation
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            validateCurrentStep={validateCurrentStep}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
          />
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
