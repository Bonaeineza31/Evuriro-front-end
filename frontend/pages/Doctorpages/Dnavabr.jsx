import React from 'react';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import '../Dstyles/Dnavabar.css';

const Navbar = () => {
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
      </div>
    </nav>
  );
};

export default Navbar;