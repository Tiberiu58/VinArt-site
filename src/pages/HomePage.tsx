import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import WineBottle3D from '../components/WineBottle3D';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);

  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const collectionItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Entrance animations on page load
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        heroTitleRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.3
        }
      )
      .fromTo(
        heroSubtitleRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        '-=0.6'
      )
      .fromTo(
        heroButtonsRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        '-=0.5'
      );

      // ScrollTrigger animations
      ScrollTrigger.create({
        trigger: heroTitleRef.current,
        start: 'top 80%',
        end: 'top 200%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (heroTitleRef.current) {
            gsap.to(heroTitleRef.current, {
              y: progress * -50,
              opacity: 1 - progress * 0.5,
              duration: 0.1
            });
          }
        }
      });

      ScrollTrigger.create({
        trigger: heroSubtitleRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (heroSubtitleRef.current) {
            gsap.to(heroSubtitleRef.current, {
              y: progress * -30,
              opacity: 1 - progress * 0.6,
              duration: 0.1
            });
          }
        }
      });

      // Collections pinned scroll animation
      if (collectionItemsRef.current.length > 0 && collectionsRef.current) {
        // Set initial state for each item from different directions
        collectionItemsRef.current.forEach((item, index) => {
          if (item) {
            if (index === 0) {
              // Left item - comes from left
              gsap.set(item, { opacity: 1, x: 0, y: 150 });
            } else if (index === 1) {
              // Middle item - comes from bottom
              gsap.set(item, { opacity: 1, x: 0, y: 150 });
            } else if (index === 2) {
              // Right item - comes from right
              gsap.set(item, { opacity: 1, x: 0, y: 150 });
            }
          }
        });

        // Create pinned scroll timeline with shorter duration
        const collectionsTl = gsap.timeline({
          scrollTrigger: {
            trigger: collectionsRef.current,
            start: 'top 150%',
            end: 'bottom 105%',
            pin: 'true',
            scrub: 1,
            anticipatePin: 1
          }
        });

        // Animate each collection item from their respective directions
        collectionItemsRef.current.forEach((item, index) => {
          if (item) {
            collectionsTl.to(item, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.05,
              ease: 'power2.out'
            }, index * 0.3);
          }
        });
      }
    });

    return () => ctx.revert();
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
      description: 'Colecții unicate cu sticle pictate de mână',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
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
          {/* Gradient Background */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300" />
          
          {/* 3D Wine Bottle Background */}
          <div className="absolute inset-0 z-10">
            <WineBottle3D className="opacity-90" />
          </div>
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/50 via-black/20 to-black/50" />

          {/* Hero Content */}
          <div className="relative z-30 max-w-7xl mx-auto px-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content - Left Side */}
              <div className="text-left">
                <h1
                  ref={heroTitleRef}
                  className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-serif"
                >
                  {t('hero.title')}
                </h1>
                <p
                  ref={heroSubtitleRef}
                  className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed"
                >
                  {t('hero.subtitle')}
                </p>
              </div>

              {/* CTA Buttons - Right Side */}
              <div ref={heroButtonsRef} className="flex flex-col gap-6 lg:items-end">
                <Link
                  to="/collections"
                  className="group bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl w-fit"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>{t('hero.cta.collections')}</span>
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

            <div ref={collectionsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCollections.map((collection, index) => (
                <div
                  key={index}
                  ref={(el) => (collectionItemsRef.current[index] = el)}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                  style={{ perspective: '1000px' }}
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