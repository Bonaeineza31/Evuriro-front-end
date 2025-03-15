import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../pages/Theme';
import './App.css';

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
import Find from '../pages/Find';
import UploadRecords from '../pages/UploadRecords';

// Import Doctor Components
import DoctorDashboard from '../Doctorpages/DoctorDashboard';
import Dlayout from '../Doctorpages/Dlayout'; // Make sure to import the correct component

// Authentication guard
const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }
  return children;
};

// Layout Component for Authenticated Users (Patient)
const AuthenticatedLayout = () => {
  return (
    <div className="app">
      <Navbar />
      
      <div className="app-container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="teleconsult" element={<Teleconsultation />} />
            <Route path="records" element={<MedicalRecords />} />
            <Route path="hospitals" element={<NearbyHospitals />} />
            <Route path="connect-device" element={<ConnectDevice />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<HelpCenter />} />
            <Route path="find" element={<Find />} />
            <Route path="uploadrecord" element={<UploadRecords />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  const userRole = localStorage.getItem('role') || 'patient';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/welcome" element={<Welcome />} />
            
            {/* Redirect Root */}
            <Route path="/" element={
              isAuthenticated
                ? userRole === 'doctor' 
                  ? <Navigate to="/doctor/dashboard" replace />
                  : <Navigate to="/dashboard" replace />
                : <Navigate to="/welcome" replace />
            } />
            
            {/* Patient Protected Routes */}
            <Route path="/*" element={
              <RequireAuth>
                {userRole === 'doctor' ? <Navigate to="/doctor/dashboard" replace /> : <AuthenticatedLayout />}
              </RequireAuth>
            } />
            
            {/* Doctor Protected Routes - Use Dlayout component directly */}
            <Route path="/doctor/*" element={
              <RequireAuth>
                {userRole === 'doctor' ? (
                  <Dlayout>
                    <Routes>
                      <Route path="dashboard" element={<DoctorDashboard />} />
                      {/* Add more doctor routes here */}
                    </Routes>
                  </Dlayout>
                ) : (
                  <Navigate to="/dashboard" replace />
                )}
              </RequireAuth>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;