import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTheme, ThemeProvider } from '../pages/Theme'; // Import the useTheme hook
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
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

// Import Doctor Dashboard Components
import Dnavbar from '../Doctorpages/Dnavabr';
import Dsidebar from '../Doctorpages/Dsidebar';
import DoctorDashboard from '../Doctorpages/DoctorDashboard';

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
  const { toggleTheme } = useTheme(); // Get the toggleTheme function from the theme context
  
  return (
    <div className="app">
      <Navbar toggleTheme={toggleTheme} />
      
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
            <Route path="/find" element={<Find />} />
            <Route path="/uploadrecord" element={<UploadRecords />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Layout Component for Doctor Users
const DoctorLayout = () => {
  const { toggleTheme } = useTheme();
  
  return (
    <div className="app doctor-app">
      <Dnavbar toggleTheme={toggleTheme} />
      
      <div className="app-container">
        <Dsidebar />
        <main className="content">
          <Routes>
            <Route path="/Ddashboard" element={<DoctorDashboard />} />
            {/* Add more doctor-specific routes here */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  // Check if the user is a doctor or patient
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
                  ? <Navigate to="/doctor/Ddashboard" replace />
                  : <Navigate to="/dashboard" replace />
                : <Navigate to="/welcome" replace />
            } />
            
            {/* Patient Protected Routes */}
            <Route path="/*" element={
              <RequireAuth>
                {userRole === 'doctor' ? <Navigate to="/doctor/dashboard" replace /> : <AuthenticatedLayout />}
              </RequireAuth>
            } />
            
            {/* Doctor Protected Routes */}
            <Route path="/doctor/*" element={
              <RequireAuth>
                {userRole === 'doctor' ? <DoctorLayout /> : <Navigate to="/dashboard" replace />}
              </RequireAuth>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;