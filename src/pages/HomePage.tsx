import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import WineBottle3D from '../components/WineBottle3D';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);

  const featuredCollections = [
    {
      title: 'Vinuri Premium',
      description: 'Selecție exclusivă de vinuri de calitate superioară',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '150-500 €',
    },
    {
      title: 'Serii Limitate',
      description: 'Colecții unicate cu sticle pictate de mână',
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

  return (
    <>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* 3D Wine Bottle Background */}
          <div className="absolute inset-0 z-0">
            <WineBottle3D className="opacity-60" />
          </div>
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

          {/* Hero Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content - Left Side */}
              <div className="text-left">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-serif">
                  {t('hero.title')}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
                  {t('hero.subtitle')}
                </p>
              </div>
              
              {/* CTA Buttons - Right Side */}
              <div className="flex flex-col gap-6 lg:items-end">
                <Link
                  to="/collections"
                  className="group bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl w-fit"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>{t('hero.cta.collections')}</span>
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
                
                <Link
                  to="/collections"
                  className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 w-fit"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Vezi Colecțiile</span>
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </div>
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

      </div>

    </>
  );
};

export default HomePage;