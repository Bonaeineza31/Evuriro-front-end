import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import '../styles/layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
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