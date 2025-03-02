import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import logoImage from '../images/Screenshot 2025-02-27 235912.png';
// Create a language context to share language across components
export const LanguageContext = React.createContext({
  language: 'english',
  setLanguage: () => {},
  content: {}
});


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    // Retrieve saved language from localStorage or default to english
    return localStorage.getItem('preferredLanguage') || 'english';
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  const user = {
    name: 'John Doe',
    avatar: null,
    unreadNotifications: 3
  };

  const content = {
    english: {
      dashboard: 'Dashboard',
      teleconsultation: 'Teleconsultation',
      records: 'Medical Records',
      nearbyHospitals: 'Nearby Hospitals',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      emergencyContact: 'Emergency Contact',
      help: 'Help Center',
      search: 'Search...',
      searchDoctor: 'Find a Doctor',
      darkMode: 'Dark Mode'
    },
    french: {
      dashboard: 'Tableau de bord',
      teleconsultation: 'Téléconsultation',
      records: 'Dossiers Médicaux',
      nearbyHospitals: 'Hôpitaux à proximité',
      profile: 'Profil',
      settings: 'Paramètres',
      logout: 'Déconnexion',
      emergencyContact: 'Contact d\'urgence',
      help: 'Centre d\'aide',
      search: 'Rechercher...',
      searchDoctor: 'Trouver un médecin',
      darkMode: 'Mode sombre'
    },
    kinyarwanda: {
      dashboard: 'Ikibaho',
      teleconsultation: 'Kuvura hakoreshejwe ikoranabuhanga',
      records: 'Inyandiko z\'ubuzima',
      nearbyHospitals: 'Ibitaro biri hafi',
      profile: 'Umwirondoro',
      settings: 'Igenamiterere',
      logout: 'Gusohoka',
      emergencyContact: 'Umubare w\'ubutabazi',
      help: 'Ivuriro ry\'ubufasha',
      search: 'Gushakisha...',
      searchDoctor: 'Gushaka umuganga',
      darkMode: 'Ibara ry\'umukara'
    }
  };

  const text = content[language];

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
    // Broadcast language change to other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: language }));
  }, [language]);

  // Handle clicks outside of dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, user data, etc.)
    navigate('/welcome');
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, content }}>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logoImage} alt="Evuriro Logo" />
          <h2>Evuriro</h2>
        </div>
       
        <div className="navbar-search">
          
          <input type="text" placeholder= "search" />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/dashboard" className="navbar-item">Dashboard</Link>
          <Link to="/teleconsult" className="navbar-item">Teleconsultation</Link>
          <Link to="/records" className="navbar-item">Records</Link>
          <Link to="/hospitals" className="navbar-item">Nearby Hospitals</Link>
          <Link to="/find-doctor" className="navbar-item">{text.searchDoctor}</Link>
        </div>

        <div className="navbar-right">
          <div className="language-selector">
            <button
              className={language === 'english' ? 'active' : ''}
              onClick={() => toggleLanguage('english')}
            >
              EN
            </button>
            <button
              className={language === 'french' ? 'active' : ''}
              onClick={() => toggleLanguage('french')}
            >
              FR
            </button>
            <button
              className={language === 'kinyarwanda' ? 'active' : ''}
              onClick={() => toggleLanguage('kinyarwanda')}
            >
              KIN
            </button>
          </div>
          
          <button className="emergency-button" title={text.emergencyContact}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </button>

          <div className="navbar-notifications">
            <span className="notification-icon">
              {user.unreadNotifications > 0 && (
                <span className="notification-badge">{user.unreadNotifications}</span>
              )}
            </span>
          </div>

          <div className="navbar-profile" ref={dropdownRef}>
            <div className="profile-avatar" onClick={toggleDropdown}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <div className="avatar-placeholder">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
            {isDropdownOpen && (
              <div className="profile-dropdown">
                <p className="user-name">{user.name}</p>
                <Link to="/profile" className="dropdown-item">{text.profile}</Link>
                <Link to="/settings" className="dropdown-item">{text.settings}</Link>
                <Link to="/help-center" className="dropdown-item">{text.help}</Link>
                <button onClick={handleLogout} className="dropdown-item logout">
                  {text.logout}
                </button>
              </div>
            )}
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </LanguageContext.Provider>
  );
};

export default Navbar;