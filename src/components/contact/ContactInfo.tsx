
import React from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 h-full transition-all duration-300 hover:shadow-md">
      <h3 className="text-lg font-semibold mb-6 text-gray-900">Informations de contact</h3>
      
      <div className="space-y-6">
        <ContactInfoItem 
          icon={<Mail className="w-5 h-5 text-indigo-500" />}
          title="Email"
          content={
            <a href="mailto:contact@studio-web.fr" className="text-gray-600 hover:text-indigo-600 transition-colors">
              contact@studio-web.fr
            </a>
          }
        />
        
        <ContactInfoItem 
          icon={<Phone className="w-5 h-5 text-indigo-500" />}
          title="Téléphone"
          content={
            <a href="tel:+33123456789" className="text-gray-600 hover:text-indigo-600 transition-colors">
              +33 1 23 45 67 89
            </a>
          }
        />
        
        <ContactInfoItem 
          icon={<MapPin className="w-5 h-5 text-indigo-500" />}
          title="Adresse"
          content={
            <p className="text-gray-600">
              123 Avenue des Champs-Élysées<br />
              75008 Paris, France
            </p>
          }
        />
      </div>
      
      <hr className="my-6 border-gray-100" />
      
      <div className="space-y-4">
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-indigo-500 mr-3" />
          <span className="text-sm font-medium text-gray-900">Heures d'ouverture</span>
        </div>
        
        <div className="space-y-2 pl-8">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Lundi - Vendredi:</span>
            <span className="font-medium text-gray-800">9:00 - 18:00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Samedi:</span>
            <span className="font-medium text-gray-800">Sur rendez-vous</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Dimanche:</span>
            <span className="font-medium text-gray-800">Fermé</span>
          </div>
        </div>
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
    <div className="flex items-start">
      <div className="mt-0.5 mr-3">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
        {content}
      </div>
    </div>
  );
};

export default ContactInfo;
