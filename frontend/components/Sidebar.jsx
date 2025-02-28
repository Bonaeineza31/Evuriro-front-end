import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [language, setLanguage] = useState('english');

  const content = {
    english: {
      dashboard: 'Dashboard',
      appointments: 'Appointments',
      teleconsultation: 'Teleconsultation',
      medicalRecords: 'Medical Records',
      nearbyHospitals: 'Nearby Hospitals',
      deviceConnection: 'Connect Device',
      settings: 'Settings',
      help: 'Help Center'
    },
    french: {
      dashboard: 'Tableau de bord',
      appointments: 'Rendez-vous',
      teleconsultation: 'Téléconsultation',
      medicalRecords: 'Dossiers Médicaux',
      nearbyHospitals: 'Hôpitaux à proximité',
      deviceConnection: 'Connecter Appareil',
      settings: 'Paramètres',
      help: 'Centre d\'aide'
    },
    kinyarwanda: {
      dashboard: 'Ikibaho',
      appointments: 'Gahunda',
      teleconsultation: 'Kuvura hakoreshejwe ikoranabuhanga',
      medicalRecords: 'Inyandiko z\'ubuzima',
      nearbyHospitals: 'Ibitaro biri hafi',
      deviceConnection: 'Guhuza igikoresho',
      settings: 'Igenamiterere',
      help: 'Ivuriro ry\'ubufasha'
    }
  };

  const text = content[language];
  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };


  // We'll get the language from a shared context in a real implementation
  // This is just for demonstration
  React.useEffect(() => {
    // Syncing language with navbar
    const languageFromStorage = localStorage.getItem('preferredLanguage');
    if (languageFromStorage) {
      setLanguage(languageFromStorage);
    }
  }, []);

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
    </div>
  );
};

export default Sidebar;