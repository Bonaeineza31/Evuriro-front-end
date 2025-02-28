import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Welcome from './Welcome';
import Layout from './Layout';

// Import your page components
import Dashboard from '../pages/Dashboard';
import Appointments from '../pages/Appointments';
import Teleconsultation from '../pages/Teleconsultation';
import MedicalRecords from '../pages/MedicalRecords';
import NearbyHospitals from '../pages/NearbyHospitals';
import ConnectDevice from '../pages/ConnectDevice';
import Settings from '../pages/Settings';
import HelpCenter from '../pages/HelpCenter';
import NotFound from '../pages/NotFound';

// Authentication guard component
const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    // Redirect to the welcome page if not authenticated
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }
  
  return children;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Welcome/Login page */}
        <Route path="/welcome" element={<Welcome />} />
        
        {/* Redirect root to welcome if not authenticated, otherwise to dashboard */}
        <Route path="/" element={
          localStorage.getItem('isAuthenticated') === 'true' ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/welcome" replace />
        } />
        
        {/* Protected routes using the Layout component */}
        <Route element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/teleconsult" element={<Teleconsultation />} />
          <Route path="/records" element={<MedicalRecords />} />
          <Route path="/hospitals" element={<NearbyHospitals />} />
          <Route path="/connect-device" element={<ConnectDevice />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpCenter />} />
        </Route>
        
        {/* Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;