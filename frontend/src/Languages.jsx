
import React from "react"
import { useTheme } from "../pages/Theme"

export const LanguageContext = React.createContext()

// We'll keep this for backward compatibility, but it will use the ThemeContext
export const LanguageProvider = ({ children }) => {
  const { language, setLanguage } = useTheme()

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export const LanguageSelector = () => {
  const { language, setLanguage } = useTheme()

  return (
    <div className="language-selector">
      <button className={language === "english" ? "active" : ""} onClick={() => setLanguage("english")}>
        EN
      </button>
      <button className={language === "french" ? "active" : ""} onClick={() => setLanguage("french")}>
        FR
      </button>
      <button className={language === "kinyarwanda" ? "active" : ""} onClick={() => setLanguage("kinyarwanda")}>
        KIN
      </button>
    </div>
  )
}

