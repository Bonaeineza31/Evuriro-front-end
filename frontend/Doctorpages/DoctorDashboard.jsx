import React, { useState } from 'react';
import '../Dstyles/DoctorDashboard.css';
import Smith from '../images/Screenshot 2025-03-01 224911.png';

// Custom SVG icons
const PatientWaitingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4"></circle>
    <path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>
  </svg>
);

const AppointmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const TeleconsultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);

const FilesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

const NewPatientIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <line x1="20" y1="8" x2="20" y2="14"></line>
    <line x1="23" y1="11" x2="17" y2="11"></line>
  </svg>
);

const PrescriptionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 15h18v6H3v-6z"></path>
    <path d="M4 10h16v5H4v-5z"></path>
    <path d="M5 5h14v5H5V5z"></path>
    <line x1="12" y1="6" x2="12" y2="4"></line>
    <line x1="8" y1="6" x2="8" y2="4"></line>
    <line x1="16" y1="6" x2="16" y2="4"></line>
  </svg>
);

const LabOrderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <path d="M14 2v6h6"></path>
    <path d="M9 15h6"></path>
    <path d="M9 11h6"></path>
  </svg>
);

const StatisticsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const VideoIndicatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const DoctorDashboard = () => {
  // Dynamic doctor name from login - would come from auth context in a real app
  const [doctorName, setDoctorName] = useState("Dr. Smith");
  const [notifications, setNotifications] = useState(3);
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
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
  
  // For modal management
  const [activeModal, setActiveModal] = useState(null);
  
  // For lab order form
  const [selectedPatient, setSelectedPatient] = useState('');
  const [testTypes, setTestTypes] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // For prescription form
  const [prescriptionPatient, setPrescriptionPatient] = useState('');
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');

  // Function to handle quick action clicks
  const handleQuickAction = (action) => {
    setActiveModal(action);
    setActiveTooltip(null);
  };
  
  // Function to close modal
  const closeModal = () => {
    setActiveModal(null);
  };
  
  // Function to handle lab order submission
  const handleLabOrderSubmit = (e) => {
    e.preventDefault();
    alert(`Lab order for ${selectedPatient} submitted successfully!`);
    setSelectedPatient('');
    setTestTypes([]);
    setSpecialInstructions('');
    closeModal();
  };
  
  // Function to handle prescription submission
  const handlePrescriptionSubmit = (e) => {
    e.preventDefault();
    alert(`Prescription for ${prescriptionPatient} submitted successfully!`);
    setPrescriptionPatient('');
    setMedication('');
    setDosage('');
    setFrequency('');
    setDuration('');
    closeModal();
  };
  
  // Handle checkbox change for test types
  const handleTestTypeChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setTestTypes([...testTypes, value]);
    } else {
      setTestTypes(testTypes.filter(type => type !== value));
    }
  };
  
  // Function to add patient (simplified)
  const handleAddPatient = (e) => {
    e.preventDefault();
    alert('New patient registered successfully!');
    closeModal();
  };
  
  // Function to view statistics (simplified)
  const handleViewStatistics = () => {
    alert('Statistics view would open here');
    closeModal();
  };

  return (
    <div className="evuriro-dashboard">
      {/* Main Content */}
      <div className="dashboard-content">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <h2 className="welcome-heading">Welcome back, {doctorName.split(' ')[1]}</h2>
          <div className="doctor-info">
            <img src={Smith} alt="Doctor profile" className="doctor-avatar" />
            <div>
              <p className="doctor-title">{doctorName}</p>
              <p className="doctor-specialty">Cardiologist</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-container">
              <PatientWaitingIcon />
            </div>
            <div className="stat-info">
              <h3 className="stat-label">Waiting</h3>
              <p className="stat-value">5</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-container">
              <AppointmentIcon />
            </div>
            <div className="stat-info">
              <h3 className="stat-label">Today's Appointments</h3>
              <p className="stat-value">12</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-container">
              <TeleconsultIcon />
            </div>
            <div className="stat-info">
              <h3 className="stat-label">Teleconsultations</h3>
              <p className="stat-value">4</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-container">
              <FilesIcon />
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
                <PatientWaitingIcon />
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
                <AppointmentIcon />
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
                      {appt.isVideo && <span className="video-indicator"><VideoIndicatorIcon /></span>}
                    </div>
                    <div className="appointment-details">
                      <h4 className="patient-name">{appt.patient}</h4>
                      <p className="appointment-reason">{appt.reason}</p>
                    </div>
                    <div className="appointment-actions"></div>