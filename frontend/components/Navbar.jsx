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

// Create a custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    // Retrieve saved language from localStorage or default to english
    return localStorage.getItem('preferredLanguage') || 'english';
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  
  const user = {
    name: 'John Doe',
    avatar: null,
    unreadNotifications: 3
  };

  // Sample notification data
  const notifications = [
    { id: 1, type: 'appointment', message: 'Appointment with Dr. Smith tomorrow at 10:00 AM', time: '2 hours ago', isRead: false },
    { id: 2, type: 'reminder', message: 'Take medication - Antibiotic', time: '5 hours ago', isRead: false },
    { id: 3, type: 'system', message: 'Your medical records have been updated', time: 'Yesterday', isRead: false },
    { id: 4, type: 'doctor', message: 'Dr. Johnson has joined the platform', time: '2 days ago', isRead: true },
  ];

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
      notifications: 'Notifications',
      viewAll: 'View All',
      markAllRead: 'Mark All as Read',
      noNotifications: 'No notifications',
      emergency: 'Emergency',
      calling: 'Calling Emergency...'
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
      notifications: 'Notifications',
      viewAll: 'Voir tout',
      markAllRead: 'Marquer tout comme lu',
      noNotifications: 'Pas de notifications',
      emergency: 'Urgence',
      calling: 'Appel d\'urgence...'
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
      notifications: 'Imenyesha',
      viewAll: 'Reba byose',
      markAllRead: 'Gushyira byose nk\'ibisomwe',
      noNotifications: 'Nta imenyesha',
      emergency: 'Ubutabazi',
      calling: 'Guhamagara ubutabazi...'
    }
  };

  const text = content[language];

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
    // Broadcast language change to other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: language }));
  }, [language]);

  // Handle clicks outside of dropdowns to close them
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
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

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, user data, etc.)
    navigate('/welcome');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search functionality here
    const searchTerm = e.target.elements.search.value;
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleEmergencyCall = () => {
    // Show emergency modal or redirect to emergency page
    alert(text.calling);
    // In a real app, you might want to:
    // 1. Open a modal with emergency contact options
    // 2. Directly call emergency services via a WebRTC integration
    // 3. Send an emergency alert to registered healthcare providers
  };

  const markAllNotificationsAsRead = () => {
    // Add logic to mark all notifications as read
    console.log('Marking all notifications as read');
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, content }}>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img src={logoImage} alt="Evuriro Logo" />
            <h2>Evuriro</h2>
          </div>
          
          <div className="navbar-search">
            <form onSubmit={handleSearch}>
              <input type="text" name="search" placeholder={text.search} />
              <button type="submit" className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/dashboard" className="navbar-item">{text.dashboard}</Link>
          <Link to="/teleconsult" className="navbar-item">{text.teleconsultation}</Link>
          <Link to="/records" className="navbar-item">{text.records}</Link>
          <Link to="/hospitals" className="navbar-item">{text.nearbyHospitals}</Link>
          <Link to="/find-doctor" className="navbar-item">{text.searchDoctor}</Link>
        </div>

        <div className="navbar-right">
          <button className="emergency-button" title={text.emergency} onClick={handleEmergencyCall}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </button>

          <div className="navbar-notifications" ref={notificationRef}>
            <span className="notification-icon" onClick={toggleNotifications}>
              {user.unreadNotifications > 0 && (
                <span className="notification-badge">{user.unreadNotifications}</span>
              )}
            </span>
            {isNotificationOpen && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>{text.notifications}</h3>
                  <div className="notification-actions">
                    <button onClick={markAllNotificationsAsRead} className="mark-read-btn">
                      {text.markAllRead}
                    </button>
                    <Link to="/notifications" className="view-all-btn">
                      {text.viewAll}
                    </Link>
                  </div>
                </div>
                <div className="notification-list">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div key={notification.id} className={`notification-item ${!notification.isRead ? 'unread' : ''}`}>
                        <div className={`notification-icon-${notification.type}`}></div>
                        <div className="notification-content">
                          <p className="notification-message">{notification.message}</p>
                          <p className="notification-time">{notification.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-notifications">{text.noNotifications}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="language-selector2">
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