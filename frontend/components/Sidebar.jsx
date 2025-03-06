import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import { useTheme } from '../pages/Theme';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme, language, changeLanguage } = useTheme();

  const content = {
    en: {
      dashboard: 'Dashboard',
      appointments: 'Appointments',
      teleconsultation: 'Teleconsultation',
      medicalRecords: 'Medical Records',
      nearbyHospitals: 'Nearby Hospitals',
      deviceConnection: 'Connect Device',
      settings: 'Settings',
      help: 'Help Center',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode'
    },
    fr: {
      dashboard: 'Tableau de bord',
      appointments: 'Rendez-vous',
      teleconsultation: 'Téléconsultation',
      medicalRecords: 'Dossiers Médicaux',
      nearbyHospitals: 'Hôpitaux à proximité',
      deviceConnection: 'Connecter Appareil',
      settings: 'Paramètres',
      help: 'Centre d\'aide',
      darkMode: 'Mode Sombre',
      lightMode: 'Mode Clair'
    },
    kin: {
      dashboard: 'Ikibaho',
      appointments: 'Gahunda',
      teleconsultation: 'Kuvura hakoreshejwe ikoranabuhanga',
      medicalRecords: 'Inyandiko z\'ubuzima',
      nearbyHospitals: 'Ibitaro biri hafi',
      deviceConnection: 'Guhuza igikoresho',
      settings: 'Igenamiterere',
      help: 'Ivuriro ry\'ubufasha',
      darkMode: 'Imiterere y\'Umukara',
      lightMode: 'Imiterere y\'Urumuri'
    }
  };

  const text = content[language] || content.en;

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button 
        className="collapse-button"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? '→' : '←'}
      </button>
      
      <div className="sidebar-menu">
        <Link to="/dashboard" className="sidebar-item">
          <span className="sidebar-icon dashboard-icon"></span>
          {!isCollapsed && <span className="sidebar-text">{text.dashboard}</span>}
        </Link>
        
        <Link to="/appointments" className="sidebar-item">
          <span className="sidebar-icon appointments-icon"></span>
          {!isCollapsed && <span className="sidebar-text">{text.appointments}</span>}
        </Link>
        
        <Link to="/teleconsult" className="sidebar-item">
          <span className="sidebar-icon teleconsult-icon"></span>
          {!isCollapsed && <span className="sidebar-text">{text.teleconsultation}</span>}
        </Link>
        
        <Link to="/records" className="sidebar-item">
          <span className="sidebar-icon records-icon"></span>
          {!isCollapsed && <span className="sidebar-text">{text.medicalRecords}</span>}
        </Link>
        
        <Link to="/hospitals" className="sidebar-item">
          <span className="sidebar-icon hospitals-icon"></span>
          {!isCollapsed && <span className="sidebar-text">{text.nearbyHospitals}</span>}
        </Link>
        
        <Link to="/connect-device" className="sidebar-item">
          <span className="sidebar-icon device-icon"></span>
          {!isCollapsed && <span className="sidebar-text">{text.deviceConnection}</span>}
        </Link>
        
        <div className="sidebar-divider"></div>
        
        <Link to="/settings" className="sidebar-item">
          <span className="sidebar-icon settings-icon"></span>
          {!isCollapsed && <span className="sidebar-text">{text.settings}</span>}
        </Link>
        
        <Link to="/help" className="sidebar-item">
          <span className="sidebar-icon help-icon"></span>
          {!isCollapsed && <span className="sidebar-text">{text.help}</span>}
        </Link>
      </div>
      
      {/* Theme toggle at bottom */}
      <div className="sidebar-footer">
        <button 
          className="theme-toggle-button"
          onClick={toggleTheme}
          title={theme === 'light' ? text.darkMode : text.lightMode}
        >
          <span className={`sidebar-icon ${theme === 'light' ? 'moon-icon' : 'sun-icon'}`}></span>
          {!isCollapsed && (
            <span className="sidebar-text">
              {theme === 'light' ? text.darkMode : text.lightMode}
            </span>
          )}
        </button>
        
      </div>
    </div>
  );
};

export default Sidebar;