import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';
import { useTheme } from '../pages/Theme';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { theme, toggleTheme, language } = useTheme();
  const location = useLocation();

  // Check if current path matches link path
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle responsive behavior on window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Only auto-collapse on initial mobile detection
      if (mobile && !isMobile) {
        setIsCollapsed(true);
      } else if (!mobile && isMobile) {
        // Optional: expand when returning to desktop
        // setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

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

  const menuItems = [
    { path: '/dashboard', icon: 'dashboard-icon', text: text.dashboard },
    { path: '/appointments', icon: 'appointments-icon', text: text.appointments },
    { path: '/teleconsult', icon: 'teleconsult-icon', text: text.teleconsultation },
    { path: '/records', icon: 'records-icon', text: text.medicalRecords },
    { path: '/hospitals', icon: 'hospitals-icon', text: text.nearbyHospitals },
    { path: '/connect-device', icon: 'device-icon', text: text.deviceConnection },
  ];

  const bottomItems = [
    { path: '/settings', icon: 'settings-icon', text: text.settings },
    { path: '/help', icon: 'help-icon', text: text.help },
  ];

  return (
    <div className={`sidebar2 ${isCollapsed ? 'collapsed' : ''} ${theme === 'dark' ? 'dark' : ''} ${isMobile ? 'mobile' : ''}`}>
      {!isMobile && (
        <button 
          className="collapse-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      )}
      
      <div className="sidebar-menu2">
        {menuItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`} 
            data-tooltip={item.text}
          >
            <span className={`sidebar-icon ${item.icon}`}></span>
            {(!isCollapsed || isMobile) && <span className="sidebar-text">{item.text}</span>}
          </Link>
        ))}
        
        {!isMobile && <div className="sidebar-divider"></div>}
        
        {bottomItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`} 
            data-tooltip={item.text}
          >
            <span className={`sidebar-icon ${item.icon}`}></span>
            {(!isCollapsed || isMobile) && <span className="sidebar-text">{item.text}</span>}
          </Link>
        ))}
      </div>
      
      {!isMobile && (
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
      )}
    </div>
  );
};

export default Sidebar;