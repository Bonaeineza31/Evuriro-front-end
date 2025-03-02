import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar'; 
import './App.css';

// Import pages
import Welcome from '../components/Welcome';
import Dashboard from '../pages/Dashboard';
import Appointments from '../pages/Appointments';
import Teleconsultation from '../pages/Teleconsultation';
import MedicalRecords from '../pages/MedicalRecords';
import NearbyHospitals from '../pages/NearbyHospitals';
import ConnectDevice from '../pages/ConnectDevice';
// import Settings from '../pages/Settings';
// import HelpCenter from '../pages/HelpCenter';
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
const AuthenticatedLayout = ({ language, handleLanguageChange }) => (
  <div className="app">
    <Navbar language={language} onLanguageChange={handleLanguageChange} />
    <div className="app-container">
      <Sidebar language={language} />
      <main className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard language={language} />} />
         <Route path="/appointments" element={<Appointments language={language} />} />
          <Route path="/teleconsult" element={<Teleconsultation language={language} />} />
         <Route path="/records" element={<MedicalRecords language={language} />} />
          <Route path="/hospitals" element={<NearbyHospitals language={language} />} />
          <Route path="/connect-device" element={<ConnectDevice language={language} />} />
          {/*<Route path="/settings" element={<Settings language={language} />} />
          <Route path="/help" element={<HelpCenter language={language} />} />
          <Route path="*" element={<NotFound language={language} />} /> */}
        </Routes>
      </main>
    </div>
  </div>
);

const App = () => {
  const [language, setLanguage] = useState('english');

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
        <Route element={
          <RequireAuth>
            <AuthenticatedLayout language={language} handleLanguageChange={handleLanguageChange} />
          </RequireAuth>
        }>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/teleconsult" element={<Teleconsultation />} />
         <Route path="/records" element={<MedicalRecords />} />
           <Route path="/hospitals" element={<NearbyHospitals />} />
          <Route path="/connect-device" element={<ConnectDevice />} />
          {/*<Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpCenter />} /> */}
        </Route>

        {/* Not Found */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
