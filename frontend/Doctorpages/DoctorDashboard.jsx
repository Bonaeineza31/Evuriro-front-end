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
                    <div className="appointment-actions">
                      <button className="view-details-btn">View</button>
                      {appt.isVideo && <button className="start-video-btn">Start</button>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3 className="section-title">Quick Actions</h3>
          <div className="action-buttons">
            <button 
              className="action-btn"
              onMouseEnter={() => setActiveTooltip('newPatient')}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => handleQuickAction('newPatient')}
            >
              <NewPatientIcon />
              Register New Patient
              {activeTooltip === 'newPatient' && 
                <div className="tooltip">Add a new patient to the system</div>
              }
            </button>
            
            <button 
              className="action-btn"
              onMouseEnter={() => setActiveTooltip('prescription')}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => handleQuickAction('prescription')}
            >
              <PrescriptionIcon />
              Write a new prescription
              {activeTooltip === 'prescription' && 
                <div className="tooltip">Create and send a new prescription</div>
              }
            </button>
            
            <button 
              className="action-btn"
              onMouseEnter={() => setActiveTooltip('labOrder')}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => handleQuickAction('labOrder')}
            >
              <LabOrderIcon />
              Create Lab Order
              {activeTooltip === 'labOrder' && 
                <div className="tooltip">Order laboratory tests for patients</div>
              }
            </button>
            
            <button 
              className="action-btn"
              onMouseEnter={() => setActiveTooltip('statistics')}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => handleQuickAction('statistics')}
            >
              <StatisticsIcon />
              View Statistics
              {activeTooltip === 'statistics' && 
                <div className="tooltip">View practice statistics and reports</div>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'newPatient' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Register New Patient</h3>
              <button className="close-btn" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddPatient}>
                <div className="form-group">
                  <label htmlFor="patientName">Full Name</label>
                  <input type="text" id="patientName" required />
                </div>
                <div className="form-group">
                  <label htmlFor="patientDOB">Date of Birth</label>
                  <input type="date" id="patientDOB" required />
                </div>
                <div className="form-group">
                  <label htmlFor="patientGender">Gender</label>
                  <select id="patientGender" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="patientContact">Contact Number</label>
                  <input type="tel" id="patientContact" required />
                </div>
                <div className="form-group">
                  <label htmlFor="patientEmail">Email Address</label>
                  <input type="email" id="patientEmail" />
                </div>
                <div className="form-group">
                  <label htmlFor="patientAddress">Address</label>
                  <textarea id="patientAddress" rows="3"></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="submit-btn">Register Patient</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'prescription' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Write New Prescription</h3>
              <button className="close-btn" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handlePrescriptionSubmit}>
                <div className="form-group">
                  <label htmlFor="prescriptionPatient">Patient</label>
                  <select 
                    id="prescriptionPatient" 
                    value={prescriptionPatient} 
                    onChange={(e) => setPrescriptionPatient(e.target.value)}
                    required
                  >
                    <option value="">Select Patient</option>
                    {waitingPatients.map(patient => (
                      <option key={patient.id} value={patient.name}>{patient.name}</option>
                    ))}
                    {upcomingAppointments.map(appt => (
                      <option key={appt.id} value={appt.patient}>{appt.patient}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="medication">Medication</label>
                  <input 
                    type="text" 
                    id="medication" 
                    value={medication} 
                    onChange={(e) => setMedication(e.target.value)}
                    required 
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dosage">Dosage</label>
                    <input 
                      type="text" 
                      id="dosage" 
                      value={dosage} 
                      onChange={(e) => setDosage(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="frequency">Frequency</label>
                    <input 
                      type="text" 
                      id="frequency" 
                      value={frequency} 
                      onChange={(e) => setFrequency(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Duration</label>
                  <input 
                    type="text" 
                    id="duration" 
                    value={duration} 
                    onChange={(e) => setDuration(e.target.value)}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="prescriptionNotes">Special Instructions</label>
                  <textarea id="prescriptionNotes" rows="3"></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="submit-btn">Send Prescription</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'labOrder' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create Lab Order</h3>
              <button className="close-btn" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLabOrderSubmit}>
                <div className="form-group">
                  <label htmlFor="labOrderPatient">Patient</label>
                  <select 
                    id="labOrderPatient" 
                    value={selectedPatient} 
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    required
                  >
                    <option value="">Select Patient</option>
                    {waitingPatients.map(patient => (
                      <option key={patient.id} value={patient.name}>{patient.name}</option>
                    ))}
                    {upcomingAppointments.map(appt => (
                      <option key={appt.id} value={appt.patient}>{appt.patient}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Test Types</label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        value="Blood Test" 
                        onChange={handleTestTypeChange}
                        checked={testTypes.includes('Blood Test')} 
                      />
                      Blood Test
                    </label>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        value="Urinalysis" 
                        onChange={handleTestTypeChange}
                        checked={testTypes.includes('Urinalysis')}  
                      />
                      Urinalysis
                    </label>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        value="ECG" 
                        onChange={handleTestTypeChange}
                        checked={testTypes.includes('ECG')}  
                      />
                      ECG
                    </label>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        value="X-Ray" 
                        onChange={handleTestTypeChange}
                        checked={testTypes.includes('X-Ray')}  
                      />
                      X-Ray
                    </label>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        value="MRI" 
                        onChange={handleTestTypeChange}
                        checked={testTypes.includes('MRI')}  
                      />
                      MRI
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="specialInstructions">Special Instructions</label>
                  <textarea 
                    id="specialInstructions" 
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="submit-btn">Send Lab Order</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'statistics' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Practice Statistics</h3>
              <button className="close-btn" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <div className="statistics-summary">
                <div className="stat-item">
                  <h4>Patients Seen Today</h4>
                  <p className="stat-number">8</p>
                </div>
                <div className="stat-item">
                  <h4>Average Visit Duration</h4>
                  <p className="stat-number">18 mins</p>
                </div>
                <div className="stat-item">
                  <h4>Lab Orders Today</h4>
                  <p className="stat-number">3</p>
                </div>
                <div className="stat-item">
                  <h4>Prescriptions Written</h4>
                  <p className="stat-number">12</p>
                </div>
              </div>
              <div className="stat-actions">
                <button className="view-detailed-btn" onClick={handleViewStatistics}>
                  View Detailed Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;