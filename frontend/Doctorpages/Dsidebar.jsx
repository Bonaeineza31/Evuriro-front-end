import React from 'react';
import {
  FaHome,
  FaCalendarAlt,
  FaVideo,
  FaFileMedical,
  FaHospital,
  FaUserMd,
  FaCog,
  FaQuestionCircle,
  FaMoon
} from 'react-icons/fa';
import '../Dstyles/Dsidebar.css';
import { Link, useLocation } from 'react-router-dom';

const Dsidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/doctor/dashboard' },
    { icon: <FaUserMd />, label: 'Patients', path: '/doctor/patient' },
    { icon: <FaCalendarAlt />, label: 'Appointments', path: '/doctor/dappointment' },
    { icon: <FaVideo />, label: 'Teleconsultation', path: '/doctor/teleconsult' },
    { icon: <FaFileMedical />, label: 'Medical Records', path: '/doctor/records' },
    { icon: <FaHospital />, label: 'Hospitals', path: '/doctor/hospitals' },
    { icon: <FaCog />, label: 'Settings', path: '/doctor/settings' },
    { icon: <FaQuestionCircle />, label: 'Help Center', path: '/doctor/help' }
  ];
  
  return (
    <div className="sidebar">
      <div className="menu-items">
        {menuItems.map((item, index) => (
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
      <div className="sidebar-footer">
        <div className="dark-mode-toggle">
          <FaMoon />
          <span>Dark Mode</span>
        </div>
      </div>
    </div>
  );
};

export default Dsidebar;