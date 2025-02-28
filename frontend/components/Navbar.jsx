import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import logoImage from '../images/Screenshot 2025-02-27 235912.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('english');
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
      logout: 'Logout'
    },
    french: {
      dashboard: 'Tableau de bord',
      teleconsultation: 'Téléconsultation',
      records: 'Dossiers Médicaux',
      nearbyHospitals: 'Hôpitaux à proximité',
      profile: 'Profil',
      settings: 'Paramètres',
      logout: 'Déconnexion'
    },
    kinyarwanda: {
      dashboard: 'Ikibaho',
      teleconsultation: 'Kuvura hakoreshejwe ikoranabuhanga',
      records: 'Inyandiko z\'ubuzima',
      nearbyHospitals: 'Ibitaro biri hafi',
      profile: 'Umwirondoro',
      settings: 'Igenamiterere',
      logout: 'Gusohoka'
    }
  };

  const text = content[language];

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logoImage} alt="Evuriro Logo" />
        <h2>Evuriro</h2>
      </div>

      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/dashboard" className="navbar-item">{text.dashboard}</Link>
        <Link to="/teleconsult" className="navbar-item">{text.teleconsultation}</Link>
        <Link to="/records" className="navbar-item">{text.records}</Link>
        <Link to="/hospitals" className="navbar-item">{text.nearbyHospitals}</Link>
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

        <div className="navbar-notifications">
          <span className="notification-icon">
            {user.unreadNotifications > 0 && (
              <span className="notification-badge">{user.unreadNotifications}</span>
            )}
          </span>
        </div>

        <div className="navbar-profile">
          <div className="profile-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="profile-dropdown">
            <p className="user-name">{user.name}</p>
            <Link to="/profile" className="dropdown-item">{text.profile}</Link>
            <Link to="/settings" className="dropdown-item">{text.settings}</Link>
            <Link to="/logout" className="dropdown-item logout">{text.logout}</Link>
          </div>
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
  );
};

export default Navbar;