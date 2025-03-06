import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar'; 
import './App.css';
import {ThemeProvider} from '../pages/Theme';
import { LanguageProvider } from '../src/Languages';


// Import pages
import Welcome from '../components/Welcome';
import Dashboard from '../pages/Dashboard';
import Appointments from '../pages/Appointments';
import Teleconsultation from '../pages/Teleconsultation';
import MedicalRecords from '../pages/MedicalRecords';
import NearbyHospitals from '../pages/NearbyHospitals';
import ConnectDevice from '../pages/ConnectDevice';
import Settings from '../pages/Settings';
import HelpCenter from '../pages/HelpCenter';
// import NotFound from '../pages/NotFound';

// Authentication guard
const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }
  return children;
};

// Layout Component for Authenticated Users
const AuthenticatedLayout = () => (
  <div className="app">
    <Navbar />
    <div className="app-container">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/teleconsult" element={<Teleconsultation />} />
          <Route path="/records" element={<MedicalRecords />} />
          <Route path="/hospitals" element={<NearbyHospitals />} />
          <Route path="/connect-device" element={<ConnectDevice />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpCenter />} />
          {/*<Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </div>
  </div>
);

const App = () => {
  return (
    <LanguageProvider>
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/welcome" element={<Welcome />} />

          {/* Redirect Root */}
          <Route path="/" element={
            localStorage.getItem('isAuthenticated') === 'true' 
              ? <Navigate to="/dashboard" replace /> 
              : <Navigate to="/welcome" replace />
          } />

          {/* Protected Routes with Layout */}
          <Route path="/*" element={
            <RequireAuth>
              <AuthenticatedLayout />
            </RequireAuth>
          } />

          {/* Not Found */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;