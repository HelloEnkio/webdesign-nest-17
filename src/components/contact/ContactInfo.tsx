
import React from 'react';
import { Mail, MapPin, Phone, Sparkles } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="h-full backdrop-blur-sm bg-gradient-to-br from-white/90 to-white/70 rounded-2xl shadow-xl p-8 border border-white relative overflow-hidden transition-all duration-500 hover:shadow-indigo-500/10 hover:border-indigo-200">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <Sparkles className="w-5 h-5 text-indigo-600 mr-2" />
          <h3 className="text-xl font-semibold">Informations de contact</h3>
        </div>
        
        <div className="space-y-6">
          <ContactInfoItem 
            icon={<Mail className="w-5 h-5 text-indigo-600" />}
            title="Email"
            content={
              <a href="mailto:contact@studio-web.fr" className="text-neutral-600 hover:text-indigo-600 transition-colors">
                contact@studio-web.fr
              </a>
            }
          />
          
          <ContactInfoItem 
            icon={<Phone className="w-5 h-5 text-indigo-600" />}
            title="Téléphone"
            content={
              <a href="tel:+33123456789" className="text-neutral-600 hover:text-indigo-600 transition-colors">
                +33 1 23 45 67 89
              </a>
            }
          />
          
          <ContactInfoItem 
            icon={<MapPin className="w-5 h-5 text-indigo-600" />}
            title="Adresse"
            content={
              <p className="text-neutral-600">
                123 Avenue des Champs-Élysées<br />
                75008 Paris, France
              </p>
            }
          />
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
  );
};

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, title, content }) => {
  return (
    <div className="flex items-start transform transition-transform hover:translate-x-1 duration-300">
      <div className="flex-shrink-0 mt-1 bg-gradient-to-br from-indigo-100 to-blue-100 p-2.5 rounded-lg">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-indigo-600">{title}</p>
        {content}
      </div>
    </div>
  );
};

export default ContactInfo;
