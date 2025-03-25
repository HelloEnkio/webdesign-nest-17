
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import FormInput from './FormInput';

const ContactForm = () => {
  const { toast } = useToast();
  const formContainerRef = useRef<HTMLDivElement>(null);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInputFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleInputBlur = () => {
    setActiveField(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with delay
    setTimeout(() => {
      console.log('Form submitted:', formState);
      
      // Reset form and state
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      
      // Show success toast
      toast({
        title: "Message envoyé !",
        description: "Nous vous contacterons bientôt.",
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

  const generateRandomParticles = () => {
    const particles = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      
      particles.push(
        <div 
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 opacity-60"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: '-20px',
            animation: `floatUp ${animationDuration}s ease-in-out infinite`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return particles;
  };
  
  return (
    <div ref={formContainerRef} className="lg:col-span-2 relative perspective transform-gpu">
      <form 
        onSubmit={handleSubmit} 
        className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white relative overflow-hidden transition-all duration-500 hover:shadow-indigo-500/10 hover:border-indigo-200 p-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <Send className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="text-xl font-semibold">Envoyez-nous un message</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormInput 
              id="name"
              label="Nom complet"
              placeholder="Votre nom"
              value={formState.name}
              onChange={handleInputChange}
              onFocus={() => handleInputFocus('name')}
              onBlur={handleInputBlur}
              isActive={activeField === 'name'}
            />
            
            <FormInput 
              id="email"
              type="email"
              label="Email"
              placeholder="votre@email.com"
              value={formState.email}
              onChange={handleInputChange}
              onFocus={() => handleInputFocus('email')}
              onBlur={handleInputBlur}
              isActive={activeField === 'email'}
            />
          </div>
          
          <FormInput 
            id="subject"
            label="Sujet"
            placeholder="Sujet de votre message"
            value={formState.subject}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus('subject')}
            onBlur={handleInputBlur}
            isActive={activeField === 'subject'}
            className="mb-6"
          />
          
          <FormInput 
            id="message"
            label="Message"
            placeholder="Décrivez votre projet ou votre demande..."
            value={formState.message}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus('message')}
            onBlur={handleInputBlur}
            isActive={activeField === 'message'}
            multiline
            rows={6}
            className="mb-6"
          />
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto py-6 px-8 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group h-auto"
          >
            <span className="relative z-10 flex items-center font-medium">
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              {!isSubmitting && (
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              )}
              {isSubmitting && (
                <svg className="animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
            </span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-x-0 bottom-0 h-20 overflow-hidden opacity-70 pointer-events-none">
          {generateRandomParticles()}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
