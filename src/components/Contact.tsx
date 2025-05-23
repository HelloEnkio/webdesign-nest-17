
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ContactHeader from './contact/ContactHeader';
import ContactForm from './contact/ContactForm';
import ContactStyles from './contact/ContactStyles';

const Contact: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
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
    
    if (headerRef.current) {
      observerHeader.observe(headerRef.current);
    }
    
    if (formRef.current) {
      observerForm.observe(formRef.current);
    }
    
    return () => {
      if (headerRef.current) observerHeader.unobserve(headerRef.current);
      if (formRef.current) observerForm.unobserve(formRef.current);
    };
  }, []);
  
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="section-container">
        <div ref={headerRef} className="opacity-0">
          <ContactHeader />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2,
            duration: 0.6 
          }}
        >
          <div ref={formRef} className="opacity-0 max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </motion.div>
      </div>
      
      <ContactStyles />
    </section>
  );
};

export default Contact;
