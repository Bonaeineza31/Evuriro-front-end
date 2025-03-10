import React, { useState, useEffect } from 'react';

export const LanguageContext = React.createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem('preferredLanguage') || 'english'
  );

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const LanguageSelector = () => {
  const { language, setLanguage } = React.useContext(LanguageContext);

  return (
    <div className="language-selector">
      <button 
        className={language === 'english' ? 'active' : ''} 
        onClick={() => setLanguage('english')}
      >
        EN
      </button>
      <button 
        className={language === 'french' ? 'active' : ''} 
        onClick={() => setLanguage('french')}
      >
        FR
      </button>
      <button 
        className={language === 'kinyarwanda' ? 'active' : ''} 
        onClick={() => setLanguage('kinyarwanda')}
      >
        KIN
      </button>
    </div>
  );
};