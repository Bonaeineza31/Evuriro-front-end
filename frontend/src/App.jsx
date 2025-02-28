import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import Navbar from './components/Navbar'; // Assuming you have a Navbar component
import './App.css';

// Import your page components
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Teleconsultation from './pages/Teleconsultation';
import MedicalRecords from './pages/MedicalRecords';
import NearbyHospitals from './pages/NearbyHospitals';
import ConnectDevice from './pages/ConnectDevice';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';
import NotFound from './pages/NotFound';

// Main App component
const App = () => {
  const [language, setLanguage] = useState('english');
  
  // Language context handler
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  return (
    <Router>
      <div className="app">
        <Navbar language={language} onLanguageChange={handleLanguageChange} />
        <div className="app-container">
          <Sidebar language={language} />
          <main className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard language={language} />} />
              <Route path="/appointments" element={<Appointments language={language} />} />
              <Route path="/teleconsult" element={<Teleconsultation language={language} />} />
              <Route path="/records" element={<MedicalRecords language={language} />} />
              <Route path="/hospitals" element={<NearbyHospitals language={language} />} />
              <Route path="/connect-device" element={<ConnectDevice language={language} />} />
              <Route path="/settings" element={<Settings language={language} />} />
              <Route path="/help" element={<HelpCenter language={language} />} />
              <Route path="*" element={<NotFound language={language} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
