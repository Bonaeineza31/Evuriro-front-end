import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

import './Layout.css';

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