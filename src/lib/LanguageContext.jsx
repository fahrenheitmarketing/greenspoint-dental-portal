import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Auto-detect from browser
      const browserLanguage = navigator.language || navigator.userLanguage;
      const detectedLanguage = browserLanguage.startsWith('es') ? 'es' : 'en';
      setLanguage(detectedLanguage);
      localStorage.setItem('preferredLanguage', detectedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};