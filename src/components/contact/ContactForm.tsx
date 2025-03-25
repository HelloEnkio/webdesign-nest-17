
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
  
  return (
    <div ref={formContainerRef} className="lg:col-span-2">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 transition-all duration-300 hover:shadow-md"
      >
        <h3 className="text-lg font-semibold mb-6 text-gray-900">Envoyez-nous un message</h3>
        
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
              Envoyer le message 
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
