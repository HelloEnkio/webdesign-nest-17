
import React, { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import ContactHeader from './contact/ContactHeader';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';
import ContactStyles from './contact/ContactStyles';

const Contact: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  
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
    <section id="contact" className="py-20 overflow-hidden relative bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Animated background elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-blue-100 rounded-full filter blur-[100px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-indigo-100 rounded-full filter blur-[100px] opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="section-container relative z-10">
        <div ref={headerRef} className="opacity-0">
          <ContactHeader />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
          {/* Contact Form */}
          <div ref={formRef} className="opacity-0">
            <ContactForm />
          </div>
          
          {/* Contact Info */}
          <div ref={contactInfoRef} className="opacity-0">
            <ContactInfo />
          </div>
        </div>
      </div>
      
      <ContactStyles />
    </section>
  );
};

export default Contact;
