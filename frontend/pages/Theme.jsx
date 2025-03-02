import React, { useState, useEffect, createContext, useContext } from 'react';
import '../styles/theme.css';

// Create Theme Context
export const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load saved preferences from localStorage on initial load
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'en';
    
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    
    // Apply theme to the root element
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('lang', savedLanguage);
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Apply to the root element
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Function to change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
    
    // Save to localStorage
    localStorage.setItem('language', lang);
    
    // Apply to the root element
    document.documentElement.setAttribute('lang', lang);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, language, changeLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};