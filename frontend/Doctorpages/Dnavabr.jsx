import React from 'react';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Add this import
import '../Dstyles/Dnavabar.css';

const Dnavbar = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  
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

  return (
    <nav className="navbar">
      <div className="navbar-logo">
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
        <div className="menu-item">Dashboard</div>
        <div className="menu-item">Teleconsultation</div>
        <div className="menu-item">Records</div>
        <div className="menu-item">Hospitals</div>
      </div>
      
      <div className="navbar-actions">
        <button className="icon-button">
          <FaUser />
        </button>
        <button className="icon-button">
          <FaBell />
        </button>
        <div className="language-selector">
          <span className="active">EN</span>
          <span>FR</span>
          <span>KIN</span>
        </div>
        <button onClick={handleLogout} className="dropdown-item logout">
          logout
        </button>
      </div>
    </nav>
  );
};

export default Dnavbar;