import React from 'react';
import { Wine, Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigare</h3>
              <ul className="space-y-2">
                {[
                  { name: t('nav.collections'), href: '/collections' },
                  { name: t('nav.about'), href: '/about' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collections */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Colecții</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Vinuri Premium</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Serii Limitate</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Cadouri Corporate</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Phone className="h-4 w-4 text-yellow-400" />
                  <span>+40 21 123 4567</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Mail className="h-4 w-4 text-yellow-400" />
                  <span>contact@vinart.ro</span>
                </div>
                <div className="flex items-start space-x-2 text-gray-300">
                  <MapPin className="h-4 w-4 text-yellow-400 mt-1" />
                  <span>Str. Viticultorilor 1,<br />București, România</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 WineArtist. {t('footer.rights')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200">
                Termeni și Condiții
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200">
                Politica de Confidențialitate
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200">
                GDPR
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;