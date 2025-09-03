import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronRight, Star, Award, Users, Palette } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import CookieConsentModal from '../components/CookieConsentModal';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      const timer = setTimeout(() => {
        setShowCookieModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const featuredCollections = [
    {
      title: 'Vinuri Premium',
      description: 'Selecție exclusivă de vinuri de calitate superioară',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '150-500 €',
    },
    {
      title: 'Serii Limitate',
      description: 'Colecții uniche cu sticle pictate de mână',
      image: 'https://images.pexels.com/photos/3009020/pexels-photo-3009020.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '300-1200 €',
    },
    {
      title: 'Cadouri Corporate',
      description: 'Soluții personalizate pentru evenimente business',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 'Pe cerere',
    },
  ];

  const stats = [
    { icon: Award, value: '50+', label: 'Premii Internaționale' },
    { icon: Palette, value: '25+', label: 'Artiști Colaboratori' },
    { icon: Users, value: '5000+', label: 'Clienți Mulțumiți' },
    { icon: Star, value: '4.9/5', label: 'Rating Clienți' },
  ];

  return (
    <>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video/Image */}
          <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full bg-gradient-to-r from-black/60 to-black/40">
              <img
                src="https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Premium Wine Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
            </div>
            
            {/* Video Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full p-4 border border-white/30 hover:scale-105"
              >
                <Play className="h-8 w-8 text-white ml-1" />
              </button>
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-serif">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/collections"
                className="group bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{t('hero.cta.collections')}</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              
              <Link
                to="/configurator"
                className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{t('hero.cta.customize')}</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg mb-4">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
                {t('collections.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Descoperă gama noastră exclusivă de vinuri premium cu sticle pictate artistic
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCollections.map((collection, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                      {collection.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {collection.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-yellow-600">
                        {collection.price}
                      </span>
                      <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105">
                        Explorează
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/collections"
                className="inline-flex items-center space-x-2 bg-black hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span>Vezi Toate Colecțiile</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
                Procesul Nostru Unic
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                De la selecția vinului până la personalizarea finală
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Selecție Vin',
                  description: 'Alege din colecția noastră de vinuri premium, fiecare cu caracter distinct și calitate superioară.',
                },
                {
                  step: '02',
                  title: 'Design Artistic',
                  description: 'Colaborează cu artiștii noștri pentru a crea un design unic sau alege dintr-o galerie predefinită.',
                },
                {
                  step: '03',
                  title: 'Personalizare',
                  description: 'Adaugă text, logo-ul companiei sau mesaje personale pentru a face sticla cu adevărat unică.',
                },
              ].map((process, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-2xl font-bold text-white">{process.step}</span>
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-30" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {process.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
              Creează-ți Propria Operă de Artă
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Începe procesul de personalizare și transformă vinul tău preferat într-o piesă unică de colecție
            </p>
            <Link
              to="/configurator"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span>Începe Personalizarea</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>

      {/* Cookie Consent Modal */}
      <CookieConsentModal 
        isOpen={showCookieModal} 
        onClose={() => setShowCookieModal(false)} 
      />
    </>
  );
};

export default HomePage;