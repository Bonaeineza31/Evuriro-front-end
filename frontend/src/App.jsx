import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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

// Import Patient Layout Components
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Import Doctor Components
import DoctorDashboard from '../Doctorpages/DoctorDashboard';
import Patient from '../Doctorpages/Patient';
import DoctorAppointment from '../Doctorpages/Dappointment';
import DoctorHospitals from '../Doctorpages/Dhopsital';
import DashboardLayout from '../Doctorpages/Dlayout';
import DoctorMedicalRecords from '../Doctorpages/Drecords';

// Authentication guard with role checking
const RequireAuth = ({ children, requiredRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('role') || 'patient';
  
  useEffect(() => {
    if (isAuthenticated) {
      // If authenticated but wrong role, redirect to appropriate dashboard
      if (requiredRole && userRole !== requiredRole) {
        const redirectPath = userRole === 'doctor' ? '/doctor/dashboard' : '/dashboard';
        navigate(redirectPath, { replace: true });
      }
    }
  }, [isAuthenticated, userRole, requiredRole, navigate]);
  
  if (!isAuthenticated) {
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }
  
  return children;
};

// Layout Component for Authenticated Users (Patient)
const PatientLayout = () => {
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
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Role verification component
const RoleRouter = ({ children }) => {
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Log the current role for debugging
    console.log('Current user role:', userRole);
    
    // Redirect based on current URL and role
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/doctor') && userRole !== 'doctor') {
      navigate('/dashboard', { replace: true });
    } else if (!currentPath.startsWith('/doctor') && 
               !currentPath.startsWith('/welcome') && 
               userRole === 'doctor') {
      navigate('/doctor/dashboard', { replace: true });
    }
  }, [userRole, navigate]);
  
  return children;
};

const App = () => {
  const userRole = localStorage.getItem('role') || 'patient';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <RoleRouter>
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
                <RequireAuth requiredRole="patient">
                  <PatientLayout />
                </RequireAuth>
              } />
              
              {/* Doctor Protected Routes */}
              <Route path="/doctor/*" element={
                <RequireAuth requiredRole="doctor">
                  <DashboardLayout>
                    <Routes>
                      <Route path="dashboard" element={<DoctorDashboard />} />
                      <Route path="patient" element={<Patient />} />
                      <Route path="dappointment" element={<DoctorAppointment />} />
                      <Route path="dhospital" element={<DoctorHospitals />} />
                      <Route path="drecords" element={<DoctorMedicalRecords />} />
                      {/* <Route path="teleconsult" element={<DoctorTeleconsultation />} />
                      <Route path="settings" element={<DoctorSettings />} />
                      <Route path="help" element={<DoctorHelpCenter />} /> */}
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </DashboardLayout>
                </RequireAuth>
              } />
            </Routes>
          </RoleRouter>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;