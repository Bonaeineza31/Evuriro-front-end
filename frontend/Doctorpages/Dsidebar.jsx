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

const Sidebar = () => {
  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', active: true },
    { icon: <FaUserMd />, label: 'Patients' },
    { icon: <FaCalendarAlt />, label: 'Appointments' },
    { icon: <FaVideo />, label: 'Teleconsultation' },
    { icon: <FaFileMedical />, label: 'Medical Records' },
    { icon: <FaHospital />, label: 'Hospitals' },
    { icon: <FaCog />, label: 'Settings' },
    { icon: <FaQuestionCircle />, label: 'Help Center' }
  ];

  return (
    <div className="sidebar">
      <div className="menu-items">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`menu-item ${item.active ? 'active' : ''}`}
          >
            <div className="menu-icon">{item.icon}</div>
            <div className="menu-label">{item.label}</div>
          </div>
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

export default Sidebar;