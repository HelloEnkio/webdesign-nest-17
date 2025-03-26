
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MentionsLegales: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Informations légales</h2>
            <p className="mb-4">
              Le site web Studio.Web est édité par la société Studio.Web, société à responsabilité limitée au capital de 10 000 euros, 
              immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789, dont le siège social est situé au :
            </p>
            <p className="mb-4">
              123 Avenue des Champs-Élysées<br />
              75008 Paris<br />
              France
            </p>
            <p className="mb-4">
              Numéro de TVA intracommunautaire : FR 12 345 678 901<br />
              Directeur de la publication : Jean Dupont
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Hébergement</h2>
            <p className="mb-4">
              Le site Studio.Web est hébergé par la société Hébergement Pro, société par actions simplifiée au capital de 50 000 euros, 
              immatriculée au Registre du Commerce et des Sociétés de Lyon sous le numéro 987 654 321, dont le siège social est situé au :
            </p>
            <p className="mb-4">
              456 Rue de la République<br />
              69002 Lyon<br />
              France
            </p>
            <p className="mb-4">
              Téléphone : +33 4 78 12 34 56
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Propriété intellectuelle</h2>
            <p className="mb-4">
              L'ensemble du contenu du site Studio.Web (textes, graphismes, logos, images, vidéos, etc.) est protégé par le droit 
              d'auteur et est la propriété exclusive de Studio.Web ou de ses partenaires.
            </p>
            <p className="mb-4">
              Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces 
              différents éléments est strictement interdite sans l'accord exprès par écrit de Studio.Web.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Limitation de responsabilité</h2>
            <p className="mb-4">
              Studio.Web s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées 
              sur son site, dont elle se réserve le droit de corriger le contenu à tout moment et sans préavis.
            </p>
            <p className="mb-4">
              Studio.Web décline toute responsabilité pour tout dommage résultant d'une intrusion frauduleuse d'un tiers ayant 
              entraîné une modification des informations mises à la disposition sur le site.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Liens hypertextes</h2>
            <p className="mb-4">
              Les liens hypertextes mis en place dans le cadre du site internet en direction d'autres ressources présentes sur le 
              réseau Internet ne sauraient engager la responsabilité de Studio.Web.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Droit applicable et juridiction compétente</h2>
            <p className="mb-4">
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront compétents.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
