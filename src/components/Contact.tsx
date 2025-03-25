
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Mail, MapPin, Phone, Send, MessageCircle, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Contact: React.FC = () => {
  const { toast } = useToast();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  
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
  
  useEffect(() => {
    const observerHeader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerRef.current?.classList.add('animate-fade-up');
        }
      },
      { threshold: 0.1 }
    );
    
    const observerForm = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          formRef.current?.classList.add('animate-fade-up');
        }
      },
      { threshold: 0.1 }
    );
    
    const observerInfo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          contactInfoRef.current?.classList.add('animate-fade-up');
        }
      },
      { threshold: 0.1 }
    );
    
    if (headerRef.current) {
      observerHeader.observe(headerRef.current);
    }
    
    if (formRef.current) {
      observerForm.observe(formRef.current);
    }
    
    if (contactInfoRef.current) {
      observerInfo.observe(contactInfoRef.current);
    }
    
    return () => {
      if (headerRef.current) observerHeader.unobserve(headerRef.current);
      if (formRef.current) observerForm.unobserve(formRef.current);
      if (contactInfoRef.current) observerInfo.unobserve(contactInfoRef.current);
    };
  }, []);

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
    <section id="contact" className="py-20 overflow-hidden relative bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Animated background elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-blue-100 rounded-full filter blur-[100px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-indigo-100 rounded-full filter blur-[100px] opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="section-container relative z-10">
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <div className="inline-flex items-center rounded-full mb-3 bg-black/5 px-3 py-1 relative overflow-hidden group">
            <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
            <span className="text-xs font-medium relative z-10">CONTACT</span>
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 group-hover:w-full transition-all duration-700"></div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-semibold mb-5 bg-clip-text relative">
            Discutons de votre{' '}
            <span className="relative inline-block">
              <span className="absolute -inset-1 w-full h-full bg-gradient-to-r from-indigo-600/20 to-blue-600/20 rounded-lg blur-xl filter opacity-70 animate-pulse"></span>
              <span className="relative bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">projet</span>
            </span>
          </h2>
          
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Prêt à donner vie à votre projet web? Contactez-nous dès aujourd'hui pour
            discuter de vos besoins et obtenir un devis personnalisé.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
          {/* Contact Form */}
          <div ref={formContainerRef} className="lg:col-span-2 relative perspective transform-gpu">
            <form 
              ref={formRef} 
              onSubmit={handleSubmit} 
              className="opacity-0 backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white relative overflow-hidden transition-all duration-500 hover:shadow-indigo-500/10 hover:border-indigo-200 p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <MessageCircle className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-xl font-semibold">Envoyez-nous un message</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="relative">
                    <label 
                      htmlFor="name" 
                      className={`block text-sm font-medium mb-1 transition-all duration-300 ${activeField === 'name' ? 'text-indigo-600' : 'text-neutral-700'}`}
                    >
                      Nom complet
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus('name')}
                        onBlur={handleInputBlur}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/70 border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
                        placeholder="Votre nom"
                      />
                      {activeField === 'name' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-medium mb-1 transition-all duration-300 ${activeField === 'email' ? 'text-indigo-600' : 'text-neutral-700'}`}
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus('email')}
                        onBlur={handleInputBlur}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/70 border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
                        placeholder="votre@email.com"
                      />
                      {activeField === 'email' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 relative">
                  <label 
                    htmlFor="subject" 
                    className={`block text-sm font-medium mb-1 transition-all duration-300 ${activeField === 'subject' ? 'text-indigo-600' : 'text-neutral-700'}`}
                  >
                    Sujet
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('subject')}
                      onBlur={handleInputBlur}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/70 border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
                      placeholder="Sujet de votre message"
                    />
                    {activeField === 'subject' && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6 relative">
                  <label 
                    htmlFor="message" 
                    className={`block text-sm font-medium mb-1 transition-all duration-300 ${activeField === 'message' ? 'text-indigo-600' : 'text-neutral-700'}`}
                  >
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('message')}
                      onBlur={handleInputBlur}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-white/70 border border-neutral-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
                      placeholder="Décrivez votre projet ou votre demande..."
                    ></textarea>
                    {activeField === 'message' && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                
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
          
          {/* Contact Info */}
          <div ref={contactInfoRef} className="opacity-0">
            <div className="h-full backdrop-blur-sm bg-gradient-to-br from-white/90 to-white/70 rounded-2xl shadow-xl p-8 border border-white relative overflow-hidden transition-all duration-500 hover:shadow-indigo-500/10 hover:border-indigo-200">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <Sparkles className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-xl font-semibold">Informations de contact</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start transform transition-transform hover:translate-x-1 duration-300">
                    <div className="flex-shrink-0 mt-1 bg-gradient-to-br from-indigo-100 to-blue-100 p-2.5 rounded-lg">
                      <Mail className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-indigo-600">Email</p>
                      <a href="mailto:contact@studio-web.fr" className="text-neutral-600 hover:text-indigo-600 transition-colors">
                        contact@studio-web.fr
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start transform transition-transform hover:translate-x-1 duration-300">
                    <div className="flex-shrink-0 mt-1 bg-gradient-to-br from-indigo-100 to-blue-100 p-2.5 rounded-lg">
                      <Phone className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-indigo-600">Téléphone</p>
                      <a href="tel:+33123456789" className="text-neutral-600 hover:text-indigo-600 transition-colors">
                        +33 1 23 45 67 89
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start transform transition-transform hover:translate-x-1 duration-300">
                    <div className="flex-shrink-0 mt-1 bg-gradient-to-br from-indigo-100 to-blue-100 p-2.5 rounded-lg">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-indigo-600">Adresse</p>
                      <p className="text-neutral-600">
                        123 Avenue des Champs-Élysées<br />
                        75008 Paris, France
                      </p>
                    </div>
                  </div>
                </div>
                
                <hr className="my-8 border-neutral-200" />
                
                <h4 className="text-base font-medium mb-4 text-indigo-600">Heures d'ouverture</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center relative">
                    <span className="text-neutral-600">Lundi - Vendredi:</span>
                    <span className="font-medium">9:00 - 18:00</span>
                    <div className="absolute -left-1 top-1/2 w-1 h-1 rounded-full bg-indigo-400 animate-ping"></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Samedi:</span>
                    <span className="font-medium">Sur rendez-vous</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Dimanche:</span>
                    <span className="font-medium">Fermé</span>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-indigo-100 to-blue-100 rounded-full opacity-50"></div>
                <div className="absolute top-10 -right-10 w-20 h-20 bg-gradient-to-bl from-indigo-100 to-blue-100 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add this to your global CSS or tailwind config */}
      <style jsx>{`
        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-100px);
            opacity: 0;
          }
        }
        .success-animation {
          animation: successPulse 2s ease-out;
        }
        @keyframes successPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.2);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          }
        }
        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Contact;
