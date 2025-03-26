
import React from 'react';
import { ArrowRight, Sparkles, ArrowDown, Server, Shield, Zap, BarChart, Users, Check } from 'lucide-react';

export const DemoLandingPage: React.FC = () => {
  return (
    <div className="w-full h-full overflow-auto bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-blue-50 to-indigo-100 px-4 pt-12 pb-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-indigo-600 mb-4">
            <Sparkles size={12} className="mr-1" /> 
            <span>Propulsez votre croissance</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Une solution innovante pour la biotechnologie
          </h1>
          
          <p className="text-gray-700 max-w-lg mb-8">
            Révolutionnez vos processus de recherche et développement grâce à notre plateforme 
            d'analyse de données de nouvelle génération
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg flex items-center text-sm">
              Demander une démo <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="bg-white text-indigo-600 px-5 py-2.5 rounded-lg border border-indigo-200 text-sm">
              En savoir plus
            </button>
          </div>
          
          <div className="flex flex-col items-center mt-8">
            <span className="text-xs text-gray-500 mb-2">Découvrir</span>
            <ArrowDown className="h-4 w-4 text-gray-400 animate-bounce" />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Fonctionnalités puissantes</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Notre plateforme offre des outils spécialement conçus pour les chercheurs et les entreprises biotechnologiques
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <Server className="text-indigo-600 h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">Analyse des données</h3>
              <p className="text-gray-600 text-sm">
                Traitez des millions de données en quelques secondes grâce à notre moteur d'analyse
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-indigo-600 h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">Sécurité avancée</h3>
              <p className="text-gray-600 text-sm">
                Protection de vos données sensibles avec un chiffrement de niveau militaire
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-indigo-600 h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">Intégrations rapides</h3>
              <p className="text-gray-600 text-sm">
                Connectez notre solution à vos outils existants en quelques clics
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Résultats prouvés</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Des centaines de laboratoires et d'entreprises font confiance à notre technologie
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-600 mb-1">95%</p>
              <p className="text-sm text-gray-600">Taux de satisfaction</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600 mb-1">+300</p>
              <p className="text-sm text-gray-600">Clients actifs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600 mb-1">42M</p>
              <p className="text-sm text-gray-600">Analyses effectuées</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600 mb-1">-60%</p>
              <p className="text-sm text-gray-600">Temps économisé</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Ce que disent nos clients</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Découvrez pourquoi les leaders de la biotechnologie nous font confiance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="text-gray-600 italic mb-4">
                "Cette plateforme a transformé notre façon d'analyser les données génomiques. Nous économisons des centaines d'heures chaque mois."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-medium">Dr. Sarah Martin</p>
                  <p className="text-xs text-gray-500">Directrice de recherche, BioGen Labs</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="text-gray-600 italic mb-4">
                "L'intégration a été incroyablement simple et le support client est exceptionnel. Un vrai partenaire pour notre croissance."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-medium">Thomas Dupont</p>
                  <p className="text-xs text-gray-500">CEO, NovaTech Sciences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Prêt à révolutionner votre R&D?</h2>
          <p className="max-w-lg mx-auto mb-8">
            Rejoignez plus de 300 entreprises innovantes qui accélèrent leurs découvertes
          </p>
          
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium">
            Commencer maintenant
          </button>
        </div>
      </section>
    </div>
  );
};
