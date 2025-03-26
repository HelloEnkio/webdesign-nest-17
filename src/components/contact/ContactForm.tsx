
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, ChevronRight, ChevronLeft, Mail, Phone, User, MessageSquare, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface StepProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ title, children, icon }) => {
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          {icon}
        </div>
        <h3 className="text-xl font-medium text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
};

const ContactForm = () => {
  const { toast } = useToast();
  const formContainerRef = useRef<HTMLDivElement>(null);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [progressWidth, setProgressWidth] = useState(25);
  
  const [formState, setFormState] = useState({
    name: '',
    projectType: '',
    projectDescription: '',
    contact: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactType, setContactType] = useState<'email' | 'phone' | null>(null);
  
  // Liste des types de projets disponibles
  const projectTypes = [
    "Site vitrine",
    "E-commerce",
    "Application web",
    "Refonte de site",
    "Autre"
  ];
  
  // Détecter automatiquement si l'utilisateur entre un email ou un numéro de téléphone
  useEffect(() => {
    const value = formState.contact;
    
    // Regex pour email et téléphone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    
    if (emailRegex.test(value)) {
      setContactType('email');
    } else if (phoneRegex.test(value)) {
      setContactType('phone');
    } else {
      setContactType(null);
    }
  }, [formState.contact]);
  
  // Mettre à jour la barre de progression lors du changement d'étape
  useEffect(() => {
    const progress = ((currentStep + 1) / 4) * 100;
    setProgressWidth(progress);
  }, [currentStep]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProjectTypeSelect = (type: string) => {
    setFormState(prev => ({ ...prev, projectType: type }));
    // Passer automatiquement à l'étape suivante après la sélection
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
        return formState.name.trim().length > 0;
      case 1:
        return formState.projectType.trim().length > 0;
      case 2:
        return formState.projectDescription.trim().length > 0;
      case 3:
        return contactType !== null;
      default:
        return true;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire avec un délai
    setTimeout(() => {
      console.log('Form submitted:', formState);
      
      // Réinitialiser le formulaire et l'état
      setFormState({
        name: '',
        projectType: '',
        projectDescription: '',
        contact: ''
      });
      setCurrentStep(0);
      setIsSubmitting(false);
      
      // Afficher toast de succès
      toast({
        title: "Message envoyé !",
        description: "Nous vous contacterons bientôt via " + (contactType === 'email' ? 'email' : 'téléphone') + ".",
        variant: "default",
      });

      // Déclencher l'animation de succès
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
  
  // Animation des variants pour les transitions entre étapes
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };
  
  return (
    <div ref={formContainerRef}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Discutons de votre projet</h3>
          <a 
            href="mailto:contact@studio-web.fr" 
            className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors mt-2 md:mt-0"
          >
            <Mail className="w-4 h-4 mr-2" />
            contact@studio-web.fr
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
        
        {/* Barre de progression */}
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={cn(currentStep >= 0 ? "text-indigo-600 font-medium" : "")}>Identité</span>
            <span className={cn(currentStep >= 1 ? "text-indigo-600 font-medium" : "")}>Projet</span>
            <span className={cn(currentStep >= 2 ? "text-indigo-600 font-medium" : "")}>Description</span>
            <span className={cn(currentStep >= 3 ? "text-indigo-600 font-medium" : "")}>Contact</span>
          </div>
        </div>
        
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
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <Step title="Comment vous appelez-vous ?" icon={<User size={20} />}>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="Votre nom complet"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                        autoFocus
                      />
                      {formState.name && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-3 top-3 w-6 h-6 bg-green-50 rounded-full flex items-center justify-center text-green-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </motion.div>
                      )}
                    </div>
                  </Step>
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
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <Step title="Quel type de projet souhaitez-vous réaliser ?" icon={<MessageSquare size={20} />}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {projectTypes.map((type) => (
                        <div 
                          key={type} 
                          onClick={() => handleProjectTypeSelect(type)}
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
                            formState.projectType === type 
                              ? "border-indigo-400 bg-indigo-50 text-indigo-700" 
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className="flex items-center">
                            <span className="flex-1">{type}</span>
                            {formState.projectType === type && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Step>
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
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <Step title="Décrivez brièvement votre projet" icon={<MessageSquare size={20} />}>
                    <div className="relative">
                      <textarea
                        name="projectDescription"
                        value={formState.projectDescription}
                        onChange={handleInputChange}
                        placeholder="Décrivez votre projet et vos besoins..."
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                        autoFocus
                      />
                      <div className="text-xs text-gray-500 mt-2 flex justify-between">
                        <span>{formState.projectDescription.length} caractères</span>
                        <span>{formState.projectDescription.length > 0 ? "Parfait !" : "Quelques mots suffiront pour commencer"}</span>
                      </div>
                    </div>
                  </Step>
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
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <Step title="Comment pouvons-nous vous contacter ?" icon={contactType === 'email' ? <Mail size={20} /> : <Phone size={20} />}>
                    <div className="relative">
                      <input
                        type="text"
                        name="contact"
                        value={formState.contact}
                        onChange={handleInputChange}
                        placeholder="Votre email ou numéro de téléphone"
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border focus:ring-1 transition-all",
                          contactType === 'email' 
                            ? "border-indigo-400 focus:ring-indigo-400" 
                            : contactType === 'phone' 
                              ? "border-green-400 focus:ring-green-400" 
                              : "border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                        )}
                        autoFocus
                      />
                      
                      {contactType && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 text-sm font-medium flex items-center"
                        >
                          {contactType === 'email' ? (
                            <span className="text-indigo-600 flex items-center">
                              <Mail size={16} className="mr-2" />
                              Format d'email détecté
                            </span>
                          ) : (
                            <span className="text-green-600 flex items-center">
                              <Phone size={16} className="mr-2" />
                              Format de téléphone détecté
                            </span>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </Step>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-6 flex justify-between">
            {currentStep > 0 ? (
              <Button 
                type="button" 
                variant="outline"
                onClick={handlePrevStep}
                className="px-4 py-2"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>
            ) : (
              <div />
            )}
            
            {currentStep < 3 ? (
              <Button 
                type="button" 
                onClick={handleNextStep}
                disabled={!validateCurrentStep()}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50 disabled:pointer-events-none"
              >
                Continuer
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isSubmitting || !validateCurrentStep()}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer ma demande
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
