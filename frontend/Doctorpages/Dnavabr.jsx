import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaBell, FaUser, FaCog, FaUserCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../Dstyles/Dnavbar.css';

const Dnavbar = () => {
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('EN');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const userDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  
  const handleLogout = () => {
    // Clear all authentication data from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isGuest');
    
    // Navigate to welcome page
    navigate('/welcome');
  };

  const handleLanguageChange = (lang) => {
    setActiveLanguage(lang);
    setShowLanguageDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => handleNavigation('/dashboard')}>
        <span className="logo-icon">❤️</span>
        <span className="logo-text">Evuriro</span>
      </div>
      
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>
      
      <div className="navbar-menu">
        <div 
          className="menu-item"
          onClick={() => handleNavigation('/dashboard')}
        >
          Dashboard
        </div>
        <div 
          className="menu-item"
          onClick={() => handleNavigation('/teleconsultation')}
        >
          Teleconsultation
        </div>
        <div 
          className="menu-item"
          onClick={() => handleNavigation('/records')}
        >
          Records
        </div>
        <div 
          className="menu-item"
          onClick={() => handleNavigation('/hospitals')}
        >
          Hospitals
        </div>
      </div>
      
      <div className="navbar-actions">
        <div className="language-selector" ref={languageDropdownRef}>
          <button 
            className="language-button"
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            {activeLanguage} <FaChevronDown className="dropdown-icon" />
          </button>
          
          {showLanguageDropdown && (
            <div className="language-dropdown">
              <div 
                className={`language-option ${activeLanguage === 'EN' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('EN')}
              >
                EN
              </div>
              <div 
                className={`language-option ${activeLanguage === 'FR' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('FR')}
              >
                FR
              </div>
              <div 
                className={`language-option ${activeLanguage === 'KIN' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('KIN')}
              >
                KIN
              </div>
            </div>
          )}
        </div>
        
        <button className="icon-button notification-button">
          <FaBell />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-menu" ref={userDropdownRef}>
          <button 
            className="icon-button user-button"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <FaUser />
          </button>
          
          {showUserDropdown && (
            <div className="user-dropdown">
              <div className="user-info">
                <FaUserCircle className="user-avatar" />
                <div className="user-details">
                  <div className="user-name">Dr. Smith</div>
                  <div className="user-email">dr.smith@evuriro.com</div>
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <div className="dropdown-item" onClick={() => handleNavigation('/profile')}>
                <FaUserCircle className="dropdown-icon" />
                <span>Profile</span>
              </div>
              
              <div className="dropdown-item" onClick={() => handleNavigation('/settings')}>
                <FaCog className="dropdown-icon" />
                <span>Settings</span>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <div className="dropdown-item logout" onClick={handleLogout}>
                <FaSignOutAlt className="dropdown-icon" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Dnavbar;