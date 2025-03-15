import React, { useState } from 'react';
import { FaUserClock, FaCalendarCheck, FaVideo, FaFileMedical, FaBell, FaSearch, FaUserMd, FaClipboardList, FaFilePrescription, FaChartLine } from 'react-icons/fa';
import '../Dstyles/DoctorDashboard.css';

const DoctorDashboard = () => {
  // Dynamic doctor name from login - would come from auth context in a real app
  const [doctorName, setDoctorName] = useState("Dr. Smith");
  const [notifications, setNotifications] = useState(3);
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Sample upcoming appointments
  const upcomingAppointments = [
    { id: 1, time: "10:00 AM", patient: "John Doe", reason: "Follow-up", isVideo: true },
    { id: 2, time: "11:30 AM", patient: "Sarah Johnson", reason: "Consultation", isVideo: false },
    { id: 3, time: "1:15 PM", patient: "Michael Brown", reason: "Test Results", isVideo: true },
    { id: 4, time: "2:45 PM", patient: "Emily Davis", reason: "First Visit", isVideo: false },
    { id: 5, time: "4:00 PM", patient: "Robert Wilson", reason: "Prescription Renewal", isVideo: false }
  ];

  // Sample waiting patients
  const waitingPatients = [
    { id: 1, name: "Alice Thompson", waiting: "15 mins", priority: "Normal" },
    { id: 2, name: "James Martin", waiting: "8 mins", priority: "Urgent" },
    { id: 3, name: "Karen Lewis", waiting: "5 mins", priority: "Normal" },
    { id: 4, name: "David Miller", waiting: "Just arrived", priority: "Normal" },
    { id: 5, name: "Susan Clark", waiting: "20 mins", priority: "Priority" }
  ];

  // For quick action button tooltip/overlay
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Function to handle quick action clicks
  const handleQuickAction = (action) => {
    alert(`${action} action selected`);
    setActiveTooltip(null);
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation */}
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="logo-container">
            <div className="logo-icon">
              <FaUserMd size={24} />
            </div>
            <h1 className="logo-text">MediPortal</h1>
          </div>
          
          <div className="user-controls">
            <div className="notification-bell">
              <button 
                className="bell-button"
                onClick={() => alert(`You have ${notifications} new notifications`)}
              >
                <FaBell size={20} />
                {notifications > 0 && (
                  <span className="notification-badge">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
            <div className="user-info">
              <p className="user-name">{doctorName}</p>
              <p className="user-role">Cardiologist</p>
            </div>
            <img 
              src="/api/placeholder/40/40" 
              alt="Doctor profile" 
              className="user-avatar"
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="banner-content">
            <div>
              <h2 className="welcome-heading">Welcome back, {doctorName.split(' ')[1]}</h2>
              <p className="current-date">{currentDate}</p>
            </div>
            <div className="search-container">
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Search patients..." 
                  className="search-input"
                />
                <FaSearch className="search-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <FaUserClock />
            </div>
            <div className="stat-info">
              <h3 className="stat-label">Waiting</h3>
              <p className="stat-value">5</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon green">
              <FaCalendarCheck />
            </div>
            <div className="stat-info">
              <h3 className="stat-label">Today's Appointments</h3>
              <p className="stat-value">12</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon purple">
              <FaVideo />
            </div>
            <div className="stat-info">
              <h3 className="stat-label">Teleconsultations</h3>
              <p className="stat-value">4</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon amber">
              <FaFileMedical />
            </div>
            <div className="stat-info">
              <h3 className="stat-label">Patient Files</h3>
              <p className="stat-value">120</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-panels">
          {/* Waiting Patients */}
          <div className="panel">
            <div className="panel-header">
              <h3 className="panel-title">
                <FaUserClock className="panel-icon" />
                Waiting Patients
              </h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="panel-content">
              <ul className="patient-list">
                {waitingPatients.map(patient => (
                  <li key={patient.id} className="patient-item">
                    <div className="patient-info">
                      <h4 className="patient-name">{patient.name}</h4>
                      <span className={`priority-badge ${patient.priority.toLowerCase()}`}>
                        {patient.priority}
                      </span>
                    </div>
                    <div className="waiting-time">
                      <span>Waiting: {patient.waiting}</span>
                      <button className="call-btn">Call</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Appointments */}
          <div className="panel">
            <div className="panel-header">
              <h3 className="panel-title">
                <FaCalendarCheck className="panel-icon" />
                Today's Appointments
              </h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="panel-content">
              <ul className="appointment-list">
                {upcomingAppointments.map(appt => (
                  <li key={appt.id} className="appointment-item">
                    <div className="appointment-time">
                      {appt.time}
                      {appt.isVideo && <FaVideo className="video-icon" />}
                    </div>
                    <div className="appointment-details">
                      <h4 className="patient-name">{appt.patient}</h4>
                      <p className="appointment-reason">{appt.reason}</p>
                    </div>
                    <div className="appointment-actions">
                      <button className="view-btn">View</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="panel">
            <div className="panel-header">
              <h3 className="panel-title">
                <FaClipboardList className="panel-icon" />
                Quick Actions
              </h3>
            </div>
            <div className="panel-content">
              <div className="quick-actions-grid">
                <div 
                  className="quick-action-btn"
                  onMouseEnter={() => setActiveTooltip('newPatient')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() => handleQuickAction('New Patient')}
                >
                  <FaUserMd />
                  <span>New Patient</span>
                  {activeTooltip === 'newPatient' && (
                    <div className="tooltip">Register a new patient to the system</div>
                  )}
                </div>
                
                <div 
                  className="quick-action-btn"
                  onMouseEnter={() => setActiveTooltip('prescription')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() => handleQuickAction('Write Prescription')}
                >
                  <FaFilePrescription />
                  <span>Prescription</span>
                  {activeTooltip === 'prescription' && (
                    <div className="tooltip">Write a new prescription</div>
                  )}
                </div>
                
                <div 
                  className="quick-action-btn"
                  onMouseEnter={() => setActiveTooltip('labOrder')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() => handleQuickAction('Lab Order')}
                >
                  <FaFileMedical />
                  <span>Lab Order</span>
                  {activeTooltip === 'labOrder' && (
                    <div className="tooltip">Create a new laboratory order</div>
                  )}
                </div>
                
                <div 
                  className="quick-action-btn"
                  onMouseEnter={() => setActiveTooltip('stats')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() => handleQuickAction('View Statistics')}
                >
                  <FaChartLine />
                  <span>Statistics</span>
                  {activeTooltip === 'stats' && (
                    <div className="tooltip">View your performance statistics</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;