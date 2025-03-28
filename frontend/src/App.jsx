import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { ThemeProvider } from "../pages/Theme"
import "./App.css"

import { LanguageProvider } from "../src/Languages"

// Import pages
import Welcome from "../components/Welcome"
import Dashboard from "../pages/Dashboard"
import Appointments from "../pages/Appointments"
import Teleconsultation from "../pages/Teleconsultation"
import MedicalRecords from "../pages/MedicalRecords"
import NearbyHospitals from "../pages/NearbyHospitals"
import ConnectDevice from "../pages/ConnectDevice"
import Settings from "../pages/Settings"
import HelpCenter from "../pages/HelpCenter"
import Find from "../pages/Find"
import UploadRecords from "../pages/UploadRecords"

// Import Layout Components
import Layout from "../components/Layout" // Import your new patient layout component

// Import Doctor Components
import DoctorDashboard from "../Doctorpages/DoctorDashboard"
import Patient from "../Doctorpages/Patient"
import DoctorAppointment from "../Doctorpages/Dappointment"
import DoctorHospitals from "../Doctorpages/Dhopsital"
import DashboardLayout from "../Doctorpages/Dlayout"
import DoctorMedicalRecords from "../Doctorpages/Drecord"
import DoctorSettings from "../Doctorpages/Dsetting"
import DoctorHelpCenter from "../Doctorpages/Dhelp"
import DoctorTeleconsultation from "../Doctorpages/Dteleconsultation"

// Authentication guard with role checking
const RequireAuth = ({ children, requiredRole }) => {
  const location = useLocation()
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
  const userRole = localStorage.getItem("role") || "patient"

  if (!isAuthenticated) {
    return <Navigate to="/welcome" state={{ from: location }} replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    const redirectPath = userRole === "doctor" ? "/doctor/dashboard" : "/dashboard"
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  return children
}

const App = () => {
  const userRole = localStorage.getItem("role") || "patient"
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/welcome" element={<Welcome />} />

            {/* Redirect Root */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  userRole === "doctor" ? (
                    <Navigate to="/doctor/dashboard" replace />
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                ) : (
                  <Navigate to="/welcome" replace />
                )
              }
            />

            {/* Patient Protected Routes */}
            <Route
              path="/"
              element={
                <RequireAuth requiredRole="patient">
                  <Layout />
                </RequireAuth>
              }
            >
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
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>

            {/* Doctor Protected Routes */}
            <Route
              path="/doctor"
              element={
                <RequireAuth requiredRole="doctor">
                  <DashboardLayout />
                </RequireAuth>
              }
            >
              <Route path="dashboard" element={<DoctorDashboard />} />
              <Route path="patient" element={<Patient />} />
              <Route path="dappointment" element={<DoctorAppointment />} />
              <Route path="dhospital" element={<DoctorHospitals />} />
              <Route path="drecords" element={<DoctorMedicalRecords />} />
              <Route path="dsetting" element={<DoctorSettings />} />
              <Route path="dhelp" element={<DoctorHelpCenter />} />
              <Route path="dteleconsult" element={<DoctorTeleconsultation />} />

              <Route path="*" element={<Navigate to="/doctor/dashboard" replace />} />
            </Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

