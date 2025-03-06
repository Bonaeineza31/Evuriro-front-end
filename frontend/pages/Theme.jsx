import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if there's a saved preference in localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedLanguage = localStorage.getItem('language') || 'en';
  
  const [theme, setTheme] = useState(savedTheme);
  const [language, setLanguage] = useState(savedLanguage);

  // Update theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply to document element for global CSS access
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Change language and save to localStorage
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Initialize theme on component mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, language, changeLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;