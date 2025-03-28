"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Create context
const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  // Check if there's a saved preference in localStorage
  // Using preferredLanguage to match what's used in other components
  const savedTheme = localStorage.getItem("theme") || "light"
  const savedLanguage = localStorage.getItem("preferredLanguage") || "english"

  const [theme, setTheme] = useState(savedTheme)
  const [language, setLanguage] = useState(savedLanguage)

  // Update theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  // Change language and save to localStorage
  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem("preferredLanguage", lang)
  }

  // Initialize theme on component mount
  useEffect(() => {
    document.body.className = theme // Set the body class to the current theme
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  // Initialize language on component mount
  useEffect(() => {
    // This ensures the language is properly initialized from localStorage
    const storedLanguage = localStorage.getItem("preferredLanguage")
    if (storedLanguage && storedLanguage !== language) {
      setLanguage(storedLanguage)
    }
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        // Provide setLanguage as an alias for changeLanguage for compatibility
        setLanguage: changeLanguage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext)

export default ThemeContext

