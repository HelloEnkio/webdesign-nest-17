
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CGV: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-8">Conditions Générales de Vente</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Préambule</h2>
            <p className="mb-4">
              Les présentes conditions générales de vente (CGV) s'appliquent à toutes les prestations de services conclues 
              par Enkio auprès de ses clients professionnels ou particuliers.
            </p>
            <p className="mb-4">
              Toute commande de prestation implique l'acceptation sans réserve par le client et son adhésion pleine et 
              entière aux présentes CGV qui prévalent sur tout autre document du client.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Services proposés</h2>
            <p className="mb-4">
              Studio.Web propose les services suivants :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Création de sites web</li>
              <li>Développement d'applications web</li>
              <li>Design d'interface utilisateur</li>
              <li>Création d'identité visuelle</li>
              <li>Référencement naturel (SEO)</li>
              <li>Maintenance de sites web</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Devis et commandes</h2>
            <p className="mb-4">
              Les prestations font l'objet d'un devis préalable, établi par Studio.Web. Le devis précise :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>La nature et le descriptif des prestations</li>
              <li>Le prix des prestations hors taxes</li>
              <li>Les modalités de paiement</li>
              <li>Le calendrier d'exécution</li>
              <li>La durée de validité du devis</li>
            </ul>
            <p className="mb-4">
              Pour confirmer sa commande de manière ferme et définitive, le client doit retourner à Studio.Web le devis daté 
              et signé avec la mention "Bon pour accord", accompagné d'un acompte de 30% du montant total.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Prix et modalités de paiement</h2>
            <p className="mb-4">
              Les prix des prestations sont ceux détaillés dans le devis. Ils sont exprimés en euros et soumis à la TVA au 
              taux en vigueur au jour de la facturation.
            </p>
            <p className="mb-4">
              Les modalités de paiement sont les suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>30% d'acompte à la commande</li>
              <li>40% au premier livrable</li>
              <li>30% à la livraison finale</li>
            </ul>
            <p className="mb-4">
              Les factures sont payables par virement bancaire ou par chèque à réception de facture.
            </p>
            <p className="mb-4">
              En cas de retard de paiement, des pénalités égales à trois fois le taux d'intérêt légal en vigueur seront exigibles, 
              ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 euros.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Délais d'exécution</h2>
            <p className="mb-4">
              Studio.Web s'engage à respecter au mieux les délais annoncés lors de la commande. Cependant, les retards ne 
              peuvent justifier l'annulation de la commande par le client ni donner lieu au paiement de dommages et intérêts.
            </p>
            <p className="mb-4">
              Les délais d'exécution peuvent être prolongés si :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Le client ne fournit pas les informations nécessaires à la réalisation des prestations dans les délais convenus</li>
              <li>Le client demande des modifications significatives pendant la réalisation</li>
              <li>Des circonstances indépendantes de la volonté de Studio.Web surviennent</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Obligations du client</h2>
            <p className="mb-4">
              Le client s'engage à :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fournir tous les éléments nécessaires à la bonne réalisation des prestations (textes, images, etc.)</li>
              <li>Disposer des droits nécessaires sur les éléments fournis</li>
              <li>Collaborer activement à la réussite du projet</li>
              <li>Répondre aux demandes de validation dans les délais convenus</li>
              <li>Régler les factures dans les délais prévus</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Propriété intellectuelle</h2>
            <p className="mb-4">
              Sauf convention contraire, Studio.Web cède au client, de manière exclusive, l'ensemble des droits de propriété 
              intellectuelle sur les créations réalisées pour le client, une fois le paiement intégral des prestations effectué.
            </p>
            <p className="mb-4">
              Cette cession comprend les droits de reproduction, de représentation et d'adaptation, pour le monde entier et pour 
              la durée légale de protection des droits d'auteur.
            </p>
            <p className="mb-4">
              Studio.Web conserve le droit de mentionner sa réalisation pour le client dans son portfolio et sa communication 
              professionnelle.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Garanties et limitations de responsabilité</h2>
            <p className="mb-4">
              Studio.Web garantit que les créations sont originales et ne constituent pas une contrefaçon d'œuvres préexistantes.
            </p>
            <p className="mb-4">
              La responsabilité de Studio.Web ne pourra pas être engagée dans les cas suivants :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Défaillance technique du matériel ou des télécommunications</li>
              <li>Fait imprévisible et insurmontable d'un tiers au contrat</li>
              <li>Cas de force majeure</li>
              <li>Utilisation des services non conforme à leur destination</li>
              <li>Informations, images, sons, textes, vidéos et contenus fournis par le client</li>
            </ul>
            <p className="mb-4">
              Dans tous les cas, la responsabilité de Studio.Web est limitée au montant des sommes effectivement versées par le client.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Résiliation</h2>
            <p className="mb-4">
              En cas de manquement par l'une des parties à l'une de ses obligations, le contrat pourra être résilié de plein droit 
              quinze jours après l'envoi d'une mise en demeure restée sans effet.
            </p>
            <p className="mb-4">
              En cas de résiliation, le client devra régler les prestations déjà réalisées par Studio.Web.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Droit applicable et juridiction compétente</h2>
            <p className="mb-4">
              Les présentes CGV sont soumises au droit français.
            </p>
            <p className="mb-4">
              En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut d'accord, les tribunaux de Paris 
              seront seuls compétents.
            </p>
          </section>
          
          <p className="text-sm text-gray-600 italic mt-8">
            Dernière mise à jour : 1 octobre 2023
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CGV;
