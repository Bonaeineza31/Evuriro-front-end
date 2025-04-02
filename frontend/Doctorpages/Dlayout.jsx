import React, { useState } from 'react';
import Dnavbar from '../Doctorpages/Dnavabr';
import Dsidebar from '../Doctorpages/Dsidebar';
import '../Dstyles/Dlayout.css';
import { Outlet } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };
  
  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <Dnavbar toggleDarkMode={toggleDarkMode} />
      <div className="content-container">
        <Dsidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
