import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Try to load language from localStorage, default to 'fr'
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('portfolio-lang');
    return saved && ['fr', 'en', 'ht'].includes(saved) ? saved : 'fr';
  });

  const setLanguage = (lang) => {
    if (['fr', 'en', 'ht'].includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('portfolio-lang', lang);
    }
  };

  // Translate function
  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let value = translations[language];
    for (const key of keys) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        // Fallback to English if translation is missing
        let englishValue = translations['en'];
        for (const k of keys) {
          if (englishValue && englishValue[k] !== undefined) {
            englishValue = englishValue[k];
          } else {
            return keyPath; // fallback to key path itself
          }
        }
        return englishValue;
      }
    }
    return value;
  };

  // Sync document lang and title on change
  useEffect(() => {
    document.documentElement.lang = language;
    
    // Dynamically set title based on language
    const titles = {
      fr: "Desir Lloyd Barry Johanson | Portfolio Développeur Fullstack",
      en: "Desir Lloyd Barry Johanson | Fullstack Developer Portfolio",
      ht: "Desir Lloyd Barry Johanson | Pòtfolyo Devlopè Fullstack"
    };
    document.title = titles[language] || titles.fr;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
