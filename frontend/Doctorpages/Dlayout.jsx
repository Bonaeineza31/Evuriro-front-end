import React, { useState } from 'react';
import Dnavbar from '../Doctorpages/Dnavabr'
import  Dsidebar from '../Doctorpages/Dsidebar';
import '../Dstyles/Dlayout.css';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <Dnavbar />
      <div className="content-container">
        <Dsidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;