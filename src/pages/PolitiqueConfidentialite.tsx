
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PolitiqueConfidentialite: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Chez Studio.Web, nous accordons une grande importance à la protection de vos données personnelles. 
              Cette politique de confidentialité vous informe sur la manière dont nous recueillons, utilisons et 
              protégeons vos informations lorsque vous utilisez notre site web.
            </p>
            <p className="mb-4">
              En utilisant notre site, vous acceptez les pratiques décrites dans la présente politique de confidentialité.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Collecte des données personnelles</h2>
            <p className="mb-4">
              Nous collectons les informations personnelles que vous nous fournissez volontairement lorsque vous :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Remplissez notre formulaire de contact</li>
              <li>Vous inscrivez à notre newsletter</li>
              <li>Demandez un devis pour nos services</li>
              <li>Interagissez avec nous par email ou téléphone</li>
            </ul>
            <p className="mb-4">
              Ces informations peuvent inclure votre nom, prénom, adresse email, numéro de téléphone, nom de votre 
              entreprise et tout autre détail que vous choisissez de nous communiquer.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Utilisation des données</h2>
            <p className="mb-4">
              Les informations que nous collectons sont utilisées pour :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Répondre à vos demandes et questions</li>
              <li>Vous fournir les services que vous avez demandés</li>
              <li>Vous envoyer notre newsletter si vous y avez consenti</li>
              <li>Améliorer notre site web et nos services</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Durée de conservation des données</h2>
            <p className="mb-4">
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour les finalités pour lesquelles 
              elles ont été collectées, sauf si une durée de conservation plus longue est requise ou permise par la loi.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Cookies et technologies similaires</h2>
            <p className="mb-4">
              Notre site utilise des cookies et des technologies similaires pour améliorer votre expérience de navigation, 
              analyser l'utilisation du site et personnaliser le contenu.
            </p>
            <p className="mb-4">
              Vous pouvez contrôler et/ou supprimer les cookies à votre guise. Pour plus d'informations, consultez 
              aboutcookies.org. Vous pouvez supprimer tous les cookies déjà sur votre ordinateur et vous pouvez configurer 
              la plupart des navigateurs pour qu'ils ne soient pas placés.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Partage des données personnelles</h2>
            <p className="mb-4">
              Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles à des tiers sans votre consentement, 
              sauf dans les cas suivants :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Lorsque cela est nécessaire pour fournir un service que vous avez demandé</li>
              <li>Pour se conformer à une obligation légale</li>
              <li>Pour protéger nos droits, notre propriété ou notre sécurité</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Vos droits</h2>
            <p className="mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant 
              vos données personnelles :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Droit d'accès et de rectification</li>
              <li>Droit à l'effacement (droit à l'oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition</li>
              <li>Droit de retirer votre consentement à tout moment</li>
            </ul>
            <p className="mb-4">
              Pour exercer l'un de ces droits, veuillez nous contacter à l'adresse email : privacy@studio-web.fr
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Modifications de notre politique de confidentialité</h2>
            <p className="mb-4">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera 
              publiée sur cette page avec une date de mise à jour révisée.
            </p>
            <p className="mb-4">
              Dernière mise à jour : 1 octobre 2023
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Contact</h2>
            <p className="mb-4">
              Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à :
            </p>
            <p className="mb-4">
              Studio.Web<br />
              123 Avenue des Champs-Élysées<br />
              75008 Paris, France<br />
              Email : privacy@studio-web.fr<br />
              Téléphone : +33 1 23 45 67 89
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
