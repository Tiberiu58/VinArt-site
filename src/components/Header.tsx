import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wine, Home, Package, User, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navigation = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.collections'), href: '/collections', icon: Package },
    { name: t('nav.about'), href: '/about', icon: User },
    { name: t('nav.contact'), href: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg group-hover:shadow-lg transition-all duration-300">
                <Wine className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-black">
                WineArtist
              </span>
            </Link>

            {/* Menu Button (3 lines) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200 z-50 relative"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                  }`} 
                />
                <X 
                  className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                  }`} 
                />
              </div>
              <span className="text-sm font-medium">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu */}
      <div className={`fixed inset-0 z-40 transition-all duration-700 ease-in-out ${
        isMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Fullscreen Background with Hero Gradient */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 transition-all duration-700 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          {/* Menu Content */}
          <div className="flex items-center justify-center min-h-screen p-8">
            <nav className="text-center max-w-2xl mx-auto">
              <div className="space-y-6">
                {navigation.map((item, index) => (
                  <div
                    key={item.name}
                    className={`transform transition-all duration-700 ease-out ${
                      isMenuOpen 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-10 opacity-0'
                    }`}
                    style={{
                      transitionDelay: isMenuOpen ? `${index * 150 + 200}ms` : '0ms'
                    }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group block text-6xl md:text-8xl font-bold transition-all duration-300 hover:scale-110 ${
                      className={`group block text-3xl md:text-4xl font-bold transition-all duration-300 hover:scale-105 ${
                        isActive(item.href)
                          ? 'text-black drop-shadow-sm'
                          : 'text-black/80 hover:text-black hover:drop-shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <item.icon className={`h-8 w-8 md:h-10 md:w-10 transition-all duration-300 ${
                          isActive(item.href) ? 'text-black' : 'text-black/60 group-hover:text-black'
                        }`} />
                        <span className="font-serif">{item.name}</span>
                      </div>
                      {isActive(item.href) && (
                        <div className="w-16 h-0.5 bg-black rounded-full mx-auto mt-3 shadow-sm" />
                      )}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Close instruction */}
              <div className={`mt-16 transform transition-all duration-700 ease-out ${
                isMenuOpen 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{
                transitionDelay: isMenuOpen ? '800ms' : '0ms'
              }}>
                <p className="text-black/60 text-base">
                  Apasă ESC sau X pentru a închide
                </p>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Header;