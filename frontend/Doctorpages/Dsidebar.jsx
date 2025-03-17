import React, { useState, useEffect } from 'react';
import {
  FaHome,
  FaCalendarAlt,
  FaVideo,
  FaFileMedical,
  FaHospital,
  FaUserMd,
  FaCog,
  FaQuestionCircle,
  FaMoon,
  FaBars
} from 'react-icons/fa';
import '../Dstyles/Dsidebar.css';
import { Link, useLocation } from 'react-router-dom';

const Dsidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Define menu items - add 'mobileVisible' property to control which ones show on mobile
  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/doctor/dashboard', mobileVisible: true },
    { icon: <FaUserMd />, label: 'Patients', path: '/doctor/patient', mobileVisible: true },
    { icon: <FaCalendarAlt />, label: 'Appointments', path: '/doctor/dappointment', mobileVisible: true },
    { icon: <FaVideo />, label: 'Teleconsultation', path: '/doctor/dteleconsult', mobileVisible: true },
    { icon: <FaFileMedical />, label: 'Medical Records', path: '/doctor/drecords', mobileVisible: false },
    { icon: <FaHospital />, label: 'Hospitals', path: '/doctor/dhospital', mobileVisible: false },
    { icon: <FaCog />, label: 'Settings', path: '/doctor/dsetting', mobileVisible: false },
    { icon: <FaQuestionCircle />, label: 'Help Center', path: '/doctor/help', mobileVisible: false }
  ];

  // Filter items based on screen size if needed
  const displayedItems = isMobile
    ? menuItems.filter(item => item.mobileVisible)
    : menuItems;
  
  return (
    <div className="sidebar">
      <div className="menu-items">
        {displayedItems.map((item, index) => (
          <Link 
            to={item.path} 
            key={index}
            className="sidebar-link"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              className={`menu-item ${currentPath === item.path ? 'active' : ''}`}
            >
              <div className="menu-icon">{item.icon}</div>
              <div className="menu-label">{item.label}</div>
            </div>
          </Link>
        ))}
      </div>
      {!isMobile && (
        <div className="sidebar-footer">
          <div className="dark-mode-toggle">
            <FaMoon />
            <span>Dark Mode</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dsidebar;