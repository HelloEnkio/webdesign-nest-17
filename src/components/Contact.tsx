
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import AnimatedCard from './ui/AnimatedCard';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formState);
    // Reset form
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Show success message or toast
    alert('Merci pour votre message ! Nous vous contacterons bientôt.');
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
  
  return (
    <section id="contact" className="py-20">
      <div className="section-container">
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <p className="text-sm font-medium text-neutral-500 tracking-wider mb-3">CONTACT</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-5">
            Discutons de votre <span className="text-gradient">projet</span>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Prêt à donner vie à votre projet web? Contactez-nous dès aujourd'hui pour
            discuter de vos besoins et obtenir un devis personnalisé.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="lg:col-span-2 opacity-0"
          >
            <AnimatedCard className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                  placeholder="Sujet de votre message"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                  placeholder="Décrivez votre projet ou votre demande..."
                ></textarea>
              </div>
              
              <Button type="submit" size="lg">
                Envoyer le message
              </Button>
            </AnimatedCard>
          </form>
          
          {/* Contact Info */}
          <div ref={contactInfoRef} className="opacity-0">
            <AnimatedCard className="h-full p-8">
              <h3 className="text-xl font-semibold mb-6">Informations de contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5 text-neutral-700" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral-700">Email</p>
                    <a href="mailto:contact@studio-web.fr" className="text-neutral-600 hover:text-black transition-colors">
                      contact@studio-web.fr
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-neutral-700" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral-700">Téléphone</p>
                    <a href="tel:+33123456789" className="text-neutral-600 hover:text-black transition-colors">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-neutral-700" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral-700">Adresse</p>
                    <p className="text-neutral-600">
                      123 Avenue des Champs-Élysées<br />
                      75008 Paris, France
                    </p>
                  </div>
                </div>
              </div>
              
              <hr className="my-8 border-neutral-200" />
              
              <h4 className="text-base font-medium mb-4">Heures d'ouverture</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Lundi - Vendredi:</span>
                  <span className="font-medium">9:00 - 18:00</span>
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
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
