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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-all duration-300 hover:text-yellow-600 relative ${
                    isActive(item.href)
                      ? 'text-yellow-600'
                      : 'text-gray-700'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200 z-50 relative"
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
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sliding Menu */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
        isMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 ease-in-out ${
            isMenuOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Sliding Menu Panel */}
        <div className={`absolute top-0 left-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-yellow-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                <Wine className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-black">WineArtist</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-white/50 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col p-6 space-y-2">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`group flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-yellow-600'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isMenuOpen ? 'slideInFromLeft 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className={`p-2 rounded-lg transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'bg-white/20'
                    : 'bg-gray-100 group-hover:bg-yellow-100'
                }`}>
                  <item.icon className={`h-5 w-5 transition-colors duration-300 ${
                    isActive(item.href)
                      ? 'text-white'
                      : 'text-gray-600 group-hover:text-yellow-600'
                  }`} />
                </div>
                <span className="text-lg font-medium">{item.name}</span>
                {isActive(item.href) && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Contactează-ne</p>
              <p className="text-sm font-medium text-gray-700">contact@wineartist.ro</p>
              <p className="text-sm font-medium text-gray-700">+40 21 123 4567</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
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