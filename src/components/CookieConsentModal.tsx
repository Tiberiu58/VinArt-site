import React, { useState } from 'react';
import { X, Cookie, Shield, Settings, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CookieConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookieConsentModal: React.FC<CookieConsentModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: true,
    marketing: true,
    functional: true,
  });

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      timestamp: new Date().toISOString(),
      preferences: { ...preferences },
      version: '1.0'
    }));
    onClose();
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      timestamp: new Date().toISOString(),
      preferences,
      version: '1.0'
    }));
    onClose();
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      timestamp: new Date().toISOString(),
      preferences: { necessary: true, analytics: false, marketing: false, functional: false },
      version: '1.0'
    }));
    onClose();
  };

  const cookieTypes = [
    {
      id: 'necessary',
      name: language === 'ro' ? 'Cookie-uri Necesare' : 'Necessary Cookies',
      description: language === 'ro' 
        ? 'Aceste cookie-uri sunt esențiale pentru funcționarea site-ului și nu pot fi dezactivate.'
        : 'These cookies are essential for the website to function and cannot be disabled.',
      required: true,
    },
    {
      id: 'analytics',
      name: language === 'ro' ? 'Cookie-uri de Analiză' : 'Analytics Cookies',
      description: language === 'ro'
        ? 'Ne ajută să înțelegem cum utilizați site-ul pentru a îmbunătăți experiența.'
        : 'Help us understand how you use the site to improve your experience.',
      required: false,
    },
    {
      id: 'marketing',
      name: language === 'ro' ? 'Cookie-uri de Marketing' : 'Marketing Cookies',
      description: language === 'ro'
        ? 'Utilizate pentru a vă afișa reclame relevante pe alte site-uri.'
        : 'Used to show you relevant advertisements on other websites.',
      required: false,
    },
    {
      id: 'functional',
      name: language === 'ro' ? 'Cookie-uri Funcționale' : 'Functional Cookies',
      description: language === 'ro'
        ? 'Permit funcții avansate precum chat-ul live și personalizarea conținutului.'
        : 'Enable advanced features like live chat and content personalization.',
      required: false,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden transform transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
              <Cookie className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-serif">
                {language === 'ro' ? 'Setări Cookie-uri' : 'Cookie Settings'}
              </h2>
              <p className="text-gray-600">
                {language === 'ro' 
                  ? 'Respectăm confidențialitatea ta' 
                  : 'We respect your privacy'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {!showDetails ? (
            /* Simple View */
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {language === 'ro' 
                      ? 'Utilizăm cookie-uri pentru a îmbunătăți experiența ta pe site-ul nostru, pentru analiză și marketing personalizat. Poți alege ce tipuri de cookie-uri accepți.'
                      : 'We use cookies to improve your experience on our website, for analytics and personalized marketing. You can choose which types of cookies you accept.'}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'ro' ? 'Vezi detalii despre cookie-uri' : 'View cookie details'}
                  </span>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-yellow-600 hover:text-yellow-700 font-medium text-sm transition-colors duration-200"
                  >
                    <Settings className="h-4 w-4 inline mr-1" />
                    {language === 'ro' ? 'Personalizează' : 'Customize'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {language === 'ro' ? 'Accept Toate' : 'Accept All'}
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-all duration-300"
                >
                  {language === 'ro' ? 'Doar Necesare' : 'Only Necessary'}
                </button>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  {language === 'ro' 
                    ? 'Prin continuarea navigării, accepți utilizarea cookie-urilor conform '
                    : 'By continuing to browse, you accept the use of cookies according to our '}
                  <a href="#" className="text-yellow-600 hover:text-yellow-700 underline">
                    {language === 'ro' ? 'Politicii de Confidențialitate' : 'Privacy Policy'}
                  </a>
                </p>
              </div>
            </div>
          ) : (
            /* Detailed View */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {language === 'ro' ? 'Preferințe Cookie-uri' : 'Cookie Preferences'}
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {language === 'ro' ? 'Înapoi' : 'Back'}
                </button>
              </div>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {cookieTypes.map((type) => (
                  <div key={type.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{type.name}</h4>
                      <div className="flex items-center">
                        {type.required ? (
                          <div className="bg-gray-300 rounded-full p-1">
                            <Check className="h-4 w-4 text-gray-600" />
                          </div>
                        ) : (
                          <button
                            onClick={() => setPreferences(prev => ({
                              ...prev,
                              [type.id]: !prev[type.id as keyof typeof prev]
                            }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                              preferences[type.id as keyof typeof preferences]
                                ? 'bg-yellow-500'
                                : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                preferences[type.id as keyof typeof preferences]
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                    {type.required && (
                      <p className="text-xs text-gray-500 mt-1">
                        {language === 'ro' ? 'Obligatoriu' : 'Required'}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleAcceptSelected}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {language === 'ro' ? 'Salvează Preferințele' : 'Save Preferences'}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-all duration-300"
                >
                  {language === 'ro' ? 'Accept Toate' : 'Accept All'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsentModal;