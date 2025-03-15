import React from 'react';
import { FaUserClock, FaCalendarCheck, FaVideo, FaFileMedical } from 'react-icons/fa';
import '../Dstyles/DoctorDashboard.css';

const DoctorDashboard = () => {
  return (
    <>
      <div className="dashboard-header">
        <h1>Welcome, Dr. Smith</h1>
        <p className="date">March 15, 2025</p>
      </div>
      
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUserClock />
          </div>
          <div className="stat-content">
            <h3>Waiting</h3>
            <p className="stat-value">5</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarCheck />
          </div>
          <div className="stat-content">
            <h3>Today's Appointments</h3>
            <p className="stat-value">12</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaVideo />
          </div>
          <div className="stat-content">
            <h3>Teleconsultations</h3>
            <p className="stat-value">4</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaFileMedical />
          </div>
          <div className="stat-content">
            <h3>Patient Files</h3>
            <p className="stat-value">120</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="grid-item">
          {/* <PatientQueue /> */}
        </div>
        
        <div className="grid-item">
          {/* <AppointmentList /> */}
        </div>
        
        <div className="grid-item">
          {/* <QuickActions /> */}
        </div>
        
        <div className="grid-item">
          {/* <PatientStats /> */}
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;