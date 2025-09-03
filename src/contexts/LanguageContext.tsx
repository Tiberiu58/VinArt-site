import React, { createContext, useContext, useState } from 'react';

type Language = 'ro' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ro: {
    'nav.home': 'Acasă',
    'nav.collections': 'Colecții',
    'nav.configurator': 'Personalizare',
    'nav.about': 'Despre noi',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'hero.title': 'Vinuri de Excepție, Artă Unică',
    'hero.subtitle': 'Descoperă colecția noastră exclusivă de vinuri premium cu sticle pictate manual de artiști renumiți',
    'hero.cta.collections': 'Descoperă Colecțiile',
    'hero.cta.customize': 'Personalizează-ți Sticla',
    'collections.title': 'Colecțiile Noastre',
    'collections.standard': 'Vinuri Standard',
    'collections.limited': 'Serii Limitate',
    'collections.corporate': 'Cadouri Corporate',
    'about.title': 'Povestea Noastră',
    'blog.title': 'Blog & Ghiduri',
    'contact.title': 'Contact',
    'footer.rights': 'Toate drepturile rezervate.',
  },
  en: {
    'nav.home': 'Home',
    'nav.collections': 'Collections',
    'nav.configurator': 'Customize',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'hero.title': 'Exceptional Wines, Unique Art',
    'hero.subtitle': 'Discover our exclusive collection of premium wines with hand-painted bottles by renowned artists',
    'hero.cta.collections': 'Discover Collections',
    'hero.cta.customize': 'Customize Your Bottle',
    'collections.title': 'Our Collections',
    'collections.standard': 'Standard Wines',
    'collections.limited': 'Limited Series',
    'collections.corporate': 'Corporate Gifts',
    'about.title': 'Our Story',
    'blog.title': 'Blog & Guides',
    'contact.title': 'Contact',
    'footer.rights': 'All rights reserved.',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ro');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ro']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};