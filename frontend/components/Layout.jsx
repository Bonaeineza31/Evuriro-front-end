import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/layout.css';
// Import your theme context if you have one
// import { ThemeContext } from '../context/ThemeContext';

const Layout = () => {
  // Use your theme context or state to get the current theme
  // const { theme } = useContext(ThemeContext);
  
  // For demonstration purposes - replace with your actual theme state
  const theme = document.documentElement.getAttribute('data-theme') || 'light';

  return (
    <div className="layout-container" data-theme={theme}>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;