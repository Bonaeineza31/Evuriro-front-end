import React, { useState } from 'react';
import './Patient.css';
import { FaCalendarAlt, FaChartLine, FaUserMd, FaFileMedical, FaHospital, FaExclamationTriangle, FaCheck, FaPlus, FaTimes, FaEdit, FaSave } from 'react-icons/fa';

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
  </svg>
);

const BloodPressureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20"></path>
  </svg>
);

const TemperatureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
  </svg>
);

const OxygenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

const WeightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 18h12M6 6h12M12 2v20"></path>
    <rect x="6" y="8" width="12" height="8" rx="1"></rect>
  </svg>
);

const Patient = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [newAllergy, setNewAllergy] = useState('');
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    type: 'Follow-up',
    doctor: 'Dr. Smith'
  });
  const [newMessage, setNewMessage] = useState({
    subject: '',
    message: ''
  });
  
  const [patientData, setPatientData] = useState({
    name: "John Doe",
    age: 42,
    gender: "Male",
    patientId: "P-1024", 
    contact: "+250 789 123 456",
    insurance: "RSSB",
    lastVisit: "10/03/2025",
    vitals: {
      heartRate: 72,
      bloodPressure: "120/80",
      temperature: 36.6,
      oxygenLevel: 98,
      weight: 70.5
    },
    upcomingAppointments: [
      { date: "20/03/2025", time: "10:00 AM", doctor: "Dr. Smith", type: "Follow-up" },
      { date: "15/04/2025", time: "11:30 AM", doctor: "Dr. Johnson", type: "Consultation" }
    ],
    medicalHistory: [
      { date: "10/03/2025", diagnosis: "Hypertension", doctor: "Dr. Smith" },
      { date: "05/02/2025", diagnosis: "Influenza", doctor: "Dr. Johnson" },
      { date: "15/12/2024", diagnosis: "Annual Check-up", doctor: "Dr. Smith" }
    ],
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "10/03/2025", endDate: "10/06/2025" },
      { name: "Aspirin", dosage: "81mg", frequency: "Once daily", startDate: "10/03/2025", endDate: "Ongoing" }
    ],
    labResults: [
      { date: "10/03/2025", test: "Complete Blood Count", status: "Completed", results: "Normal" },
      { date: "10/03/2025", test: "Lipid Panel", status: "Pending", results: "" },
      { date: "05/02/2025", test: "Urinalysis", status: "Completed", results: "Normal" }
    ],
    allergies: ["Penicillin", "Peanuts"],
    notes: "Patient has family history of cardiovascular disease. Recommend lifestyle modifications and regular follow-ups."
  });

  // Vital sign trend data for charts
  const vitalTrends = {
    heartRate: [68, 72, 70, 74, 72, 76, 72],
    bloodPressure: {
      systolic: [118, 120, 122, 125, 120, 118, 120],
      diastolic: [78, 80, 82, 85, 80, 78, 80]
    },
    weight: [71.2, 71.0, 70.8, 70.5, 70.5, 70.3, 70.5]
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Function to show notification
  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Function to schedule appointment
  const handleScheduleAppointment = () => {
    setShowAppointmentModal(true);
  };
  
  // Function to save new appointment
  const saveAppointment = () => {
    // Validate inputs
    if (!newAppointment.date || !newAppointment.time) {
      showToast('Please fill in all required fields');
      return;
    }
    
    // Add new appointment to the array
    const updatedAppointments = [...patientData.upcomingAppointments, newAppointment];
    setPatientData({
      ...patientData,
      upcomingAppointments: updatedAppointments
    });
    
    // Close modal and show confirmation
    setShowAppointmentModal(false);
    showToast('Appointment scheduled successfully');
    
    // Reset form
    setNewAppointment({
      date: '',
      time: '',
      type: 'Follow-up',
      doctor: 'Dr. Smith'
    });
  };

  // Function to handle sending message
  const handleSendMessage = () => {
    setShowMessageModal(true);
  };
  
  // Function to submit message
  const submitMessage = () => {
    // Validate inputs
    if (!newMessage.subject || !newMessage.message) {
      showToast('Please fill in all required fields');
      return;
    }
    
    // In a real app, this would send the message to an API
    // Close modal and show confirmation
    setShowMessageModal(false);
    showToast('Message sent successfully');
    
    // Reset form
    setNewMessage({
      subject: '',
      message: ''
    });
  };

  // Function to add new allergy
  const handleAddAllergy = () => {
    setShowAllergyModal(true);
  };
  
  // Function to save new allergy
  const saveAllergy = () => {
    // Validate input
    if (!newAllergy) {
      showToast('Please enter an allergy');
      return;
    }
    
    // Check if allergy already exists
    if (patientData.allergies.includes(newAllergy)) {
      showToast('This allergy is already recorded');
      return;
    }
    
    // Add new allergy to the array
    const updatedAllergies = [...patientData.allergies, newAllergy];
    setPatientData({
      ...patientData,
      allergies: updatedAllergies
    });
    
    // Close modal and show confirmation
    setShowAllergyModal(false);
    showToast('Allergy added successfully');
    
    // Reset form
    setNewAllergy('');
  };

  // Function to save patient notes
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState(patientData.notes);
  
  const saveNotes = () => {
    setPatientData({
      ...patientData,
      notes: editedNotes
    });
    setIsEditingNotes(false);
    showToast('Patient notes updated successfully');
  };

  return (
    <div className="patient-container">
      {/* Notification toast */}
      {showNotification && (
        <div className="notification-toast">
          <div className="notification-content">
            <FaCheck className="notification-icon" />
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}
      
      {/* Schedule Appointment Modal */}
      {showAppointmentModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Schedule Appointment</h3>
              <button className="modal-close" onClick={() => setShowAppointmentModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  value={newAppointment.date} 
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input 
                  type="time" 
                  value={newAppointment.time} 
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select 
                  value={newAppointment.type} 
                  onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                  className="form-control"
                >
                  <option value="Follow-up">Follow-up</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Test Results">Test Results</option>
                  <option value="Procedure">Procedure</option>
                </select>
              </div>
              <div className="form-group">
                <label>Doctor</label>
                <select 
                  value={newAppointment.doctor} 
                  onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                  className="form-control"
                >
                  <option value="Dr. Smith">Dr. Smith</option>
                  <option value="Dr. Johnson">Dr. Johnson</option>
                  <option value="Dr. Brown">Dr. Brown</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAppointmentModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={saveAppointment}>Schedule</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Message Patient Modal */}
      {showMessageModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Message Patient</h3>
              <button className="modal-close" onClick={() => setShowMessageModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  value={newMessage.subject} 
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  className="form-control"
                  placeholder="Enter subject"
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  value={newMessage.message} 
                  onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                  className="form-control"
                  rows="5"
                  placeholder="Enter your message"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowMessageModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={submitMessage}>Send Message</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Allergy Modal */}
      {showAllergyModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Add Allergy</h3>
              <button className="modal-close" onClick={() => setShowAllergyModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Allergy Name</label>
                <input 
                  type="text" 
                  value={newAllergy} 
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="form-control"
                  placeholder="Enter allergy name"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAllergyModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={saveAllergy}>Add Allergy</button>
            </div>
          </div>
        </div>
      )}

      <div className="patient-header">
        <div className="patient-info">
          <h2>{patientData.name}</h2>
          <div className="patient-meta">
            <span>{patientData.age} yrs • {patientData.gender}</span>
            <span className="patient-id">ID: {patientData.patientId}</span>
            <span>{patientData.contact}</span>
            <span>Insurance: {patientData.insurance}</span>
          </div>
        </div>
        <div className="patient-actions">
          <button className="btn-primary" onClick={handleScheduleAppointment}>Schedule Appointment</button>
          <button className="btn-secondary" onClick={handleSendMessage}>Message Patient</button>
          <button className="btn-secondary" onClick={() => showToast('Full records opened')}>View Full Records</button>
        </div>
      </div>

      <div className="patient-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'appointments' ? 'active' : ''} 
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button 
          className={activeTab === 'medical-history' ? 'active' : ''} 
          onClick={() => setActiveTab('medical-history')}
        >
          Medical History
        </button>
        <button 
          className={activeTab === 'medications' ? 'active' : ''} 
          onClick={() => setActiveTab('medications')}
        >
          Medications
        </button>
        <button 
          className={activeTab === 'lab-results' ? 'active' : ''} 
          onClick={() => setActiveTab('lab-results')}
        >
          Lab Results
        </button>
        <button 
          className={activeTab === 'notes' ? 'active' : ''} 
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </button>
      </div>

      <div className="patient-content">
        {activeTab === 'overview' && (
          <div className="overview-container">
            <div className="vitals-section">
              <div className="section-header">
                <h3>Current Vitals</h3>
                <span className="last-updated">Last Updated: {patientData.lastVisit}</span>
              </div>
              
              <div className="vitals-grid">
                <div className="vital-card">
                  <div className="vital-icon">
                    <HeartIcon />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Heart Rate</span>
                    <span className="vital-value">{patientData.vitals.heartRate} <span className="unit">bpm</span></span>
                  </div>
                </div>
                
                <div className="vital-card">
                  <div className="vital-icon">
                    <BloodPressureIcon />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Blood Pressure</span>
                    <span className="vital-value">{patientData.vitals.bloodPressure} <span className="unit">mmHg</span></span>
                  </div>
                </div>
                
                <div className="vital-card">
                  <div className="vital-icon">
                    <TemperatureIcon />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Temperature</span>
                    <span className="vital-value">{patientData.vitals.temperature} <span className="unit">°C</span></span>
                  </div>
                </div>
                
                <div className="vital-card">
                  <div className="vital-icon">
                    <OxygenIcon />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Oxygen Level</span>
                    <span className="vital-value">{patientData.vitals.oxygenLevel}<span className="unit">%</span></span>
                  </div>
                </div>
                
                <div className="vital-card">
                  <div className="vital-icon">
                    <WeightIcon />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Weight</span>
                    <span className="vital-value">{patientData.vitals.weight} <span className="unit">kg</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="health-charts">
              <div className="chart-container">
                <h3>Vital Signs Trends</h3>
                <div className="chart">
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color heart-rate"></span>
                      <span>Heart Rate</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color blood-pressure"></span>
                      <span>Blood Pressure (Systolic)</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color weight"></span>
                      <span>Weight</span>
                    </div>
                  </div>
                  <div className="chart-visual">
                    {/* This would be replaced with a real chart component in production */}
                    <div className="chart-placeholder">
                      <div className="chart-lines">
                        {daysOfWeek.map((day, index) => (
                          <div key={day} className="chart-line">
                            <div className="chart-point heart-rate" style={{top: `${100 - (vitalTrends.heartRate[index] - 60) * 2}px`}}></div>
                            <div className="chart-point blood-pressure" style={{top: `${100 - (vitalTrends.bloodPressure.systolic[index] - 110) * 2}px`}}></div>
                            <div className="chart-point weight" style={{top: `${100 - (vitalTrends.weight[index] - 70) * 20}px`}}></div>
                            <div className="chart-label">{day}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="alerts-section">
              <h3>Alerts & Notifications</h3>
              <div className="alerts-list">
                <div className="alert-item urgent">
                  <div className="alert-icon"><FaExclamationTriangle /></div>
                  <div className="alert-content">
                    <span className="alert-title">Medication Refill Needed</span>
                    <span className="alert-desc">Lisinopril prescription will expire in 5 days</span>
                  </div>
                  <button className="btn-small" onClick={() => showToast('Medication refill processed')}>Process Refill</button>
                </div>
                <div className="alert-item">
                  <div className="alert-icon"><FaFileMedical /></div>
                  <div className="alert-content">
                    <span className="alert-title">Lab Results Available</span>
                    <span className="alert-desc">Complete Blood Count results are ready for review</span>
                  </div>
                  <button className="btn-small" onClick={() => showToast('Lab results viewed')}>View Results</button>
                </div>
                <div className="alert-item">
                  <div className="alert-icon"><FaCalendarAlt /></div>
                  <div className="alert-content">
                    <span className="alert-title">Upcoming Appointment</span>
                    <span className="alert-desc">Follow-up scheduled for 20/03/2025</span>
                  </div>
                  <button className="btn-small" onClick={() => showToast('Appointment details viewed')}>View Details</button>
                </div>
              </div>
            </div>

            <div className="quick-summary">
              <div className="summary-section">
                <h3>Medications</h3>
                <div className="summary-list">
                  {patientData.medications.map((med, index) => (
                    <div key={index} className="summary-item">
                      <span className="item-name">{med.name}</span>
                      <span className="item-detail">{med.dosage}, {med.frequency}</span>
                    </div>
                  ))}
                  <button className="btn-link" onClick={() => setActiveTab('medications')}>View All Medications</button>
                </div>
              </div>
              
              <div className="summary-section">
                <h3>Allergies</h3>
                <div className="summary-list">
                  {patientData.allergies.map((allergy, index) => (
                    <div key={index} className="summary-item">
                      <span className="item-name">{allergy}</span>
                    </div>
                  ))}
                  <button className="btn-link" onClick={handleAddAllergy}>Add New Allergy</button>
                </div>
              </div>
              
              <div className="summary-section">
                <h3>Upcoming Appointments</h3>
                <div className="summary-list">
                  {patientData.upcomingAppointments.map((appt, index) => (
                    <div key={index} className="summary-item">
                      <span className="item-name">{appt.date} - {appt.time}</span>
                      <span className="item-detail">{appt.type} with {appt.doctor}</span>
                    </div>
                  ))}
                  <button className="btn-link" onClick={() => setActiveTab('appointments')}>View All Appointments</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="appointments-container">
            <div className="section-header">
              <h3>Appointment History & Schedule</h3>
              <button className="btn-primary" onClick={handleScheduleAppointment}>
                <FaPlus /> New Appointment
              </button>
            </div>
            
            <div className="appointments-list">
              <div className="list-header">
                <span className="header-col">Date & Time</span>
                <span className="header-col">Type</span>
                <span className="header-col">Doctor</span>
                <span className="header-col">Status</span>
                <span className="header-col">Actions</span>
              </div>
              
              {patientData.upcomingAppointments.map((appt, index) => (
                <div key={index} className="list-item">
                  <span className="item-col">{appt.date} - {appt.time}</span>
                  <span className="item-col">{appt.type}</span>
                  <span className="item-col">{appt.doctor}</span>
                  <span className="item-col">
                    <span className="status-badge upcoming">Upcoming</span>
                  </span>
                  <span className="item-col actions">
                    <button className="btn-icon" onClick={() => showToast('Appointment edited')}>
                      <FaEdit />
                    </button>
                    <button className="btn-icon" onClick={() => {
                      const updatedAppointments = patientData.upcomingAppointments.filter((_, i) => i !== index);
                      setPatientData({
                        ...patientData,
                        upcomingAppointments: updatedAppointments
                      });
                      showToast('Appointment cancelled');
                    }}>
                      <FaTimes />
                    </button>
                  </span>
                </div>
              ))}
              
              {/* Past appointments */}
              <div className="list-item past">
                <span className="item-col">01/03/2025 - 09:30 AM</span>
                <span className="item-col">Check-up</span>
                <span className="item-col">Dr. Smith</span>
                <span className="item-col">
                  <span className="status-badge completed">Completed</span>
                </span>
                <span className="item-col actions">
                  <button className="btn-icon" onClick={() => showToast('Appointment details viewed')}>
                    <FaFileMedical />
                  </button>
                </span>
              </div>
              
              <div className="list-item past">
                <span className="item-col">05/02/2025 - 11:00 AM</span>
                <span className="item-col">Illness</span>
                <span className="item-col">Dr. Johnson</span>
                <span className="item-col">
                  <span className="status-badge completed">Completed</span>
                </span>
                <span className="item-col actions">
                  <button className="btn-icon" onClick={() => showToast('Appointment details viewed')}>
                    <FaFileMedical />
                  </button>
                </span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'medical-history' && (
          <div className="medical-history-container">
            <div className="section-header">
              <h3>Medical History</h3>
              <button className="btn-primary" onClick={() => showToast('Add medical record form opened')}>
                <FaPlus /> Add Record
              </button>
            </div>
            
            <div className="medical-history-list">
              <div className="list-header">
                <span className="header-col">Date</span>
                <span className="header-col">Diagnosis</span>
                <span className="header-col">Doctor</span>
                <span className="header-col">Actions</span>
              </div>
              
              {patientData.medicalHistory.map((record, index) => (
                <div key={index} className="list-item">
                  <span className="item-col">{record.date}</span>
                  <span className="item-col">{record.diagnosis}</span>
                  <span className="item-col">{record.doctor}</span>
                  <span className="item-col actions">
                    <button className="btn-icon" onClick={() => showToast('Medical record details viewed')}>
                      <FaFileMedical />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'medications' && (
          <div className="medications-container">
            <div className="section-header">
              <h3>Current Medications</h3>
              <button className="btn-primary" onClick={() => showToast('Add medication form opened')}>
                <FaPlus /> Add Medication
              </button>
            </div>
            
            <div className="medications-list">
              <div className="list-header">
              <span className="header-col">Medication</span>
              <span className="header-col">Dosage</span>
              <span className="header-col">Frequency</span>
              <span className="header-col">Start Date</span>
              <span className="header-col">End Date</span>
              <span className="header-col">Actions</span>
            </div>
            
            {patientData.medications.map((med, index) => (
              <div key={index} className="list-item">
                <span className="item-col">{med.name}</span>
                <span className="item-col">{med.dosage}</span>
                <span className="item-col">{med.frequency}</span>
                <span className="item-col">{med.startDate}</span>
                <span className="item-col">{med.endDate}</span>
                <span className="item-col actions">
                  <button className="btn-icon" onClick={() => showToast('Medication details viewed')}>
                    <FaFileMedical />
                  </button>
                  <button className="btn-icon" onClick={() => showToast('Medication refill processed')}>
                    <FaPlus />
                  </button>
                </span>
              </div>
            ))}
          </div>
          
          <div className="section-header mt-4">
            <h3>Medication History</h3>
          </div>
          
          <div className="medications-list">
            <div className="list-header">
              <span className="header-col">Medication</span>
              <span className="header-col">Dosage</span>
              <span className="header-col">Frequency</span>
              <span className="header-col">Start Date</span>
              <span className="header-col">End Date</span>
              <span className="header-col">Actions</span>
            </div>
            
            <div className="list-item past">
              <span className="item-col">Amoxicillin</span>
              <span className="item-col">500mg</span>
              <span className="item-col">3x daily</span>
              <span className="item-col">05/02/2025</span>
              <span className="item-col">15/02/2025</span>
              <span className="item-col actions">
                <button className="btn-icon" onClick={() => showToast('Medication details viewed')}>
                  <FaFileMedical />
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'lab-results' && (
        <div className="lab-results-container">
          <div className="section-header">
            <h3>Lab Results</h3>
            <button className="btn-primary" onClick={() => showToast('Order lab test form opened')}>
              <FaPlus /> Order Test
            </button>
          </div>
          
          <div className="lab-results-list">
            <div className="list-header">
              <span className="header-col">Date</span>
              <span className="header-col">Test</span>
              <span className="header-col">Status</span>
              <span className="header-col">Results</span>
              <span className="header-col">Actions</span>
            </div>
            
            {patientData.labResults.map((test, index) => (
              <div key={index} className="list-item">
                <span className="item-col">{test.date}</span>
                <span className="item-col">{test.test}</span>
                <span className="item-col">
                  <span className={`status-badge ${test.status === 'Completed' ? 'completed' : 'pending'}`}>
                    {test.status}
                  </span>
                </span>
                <span className="item-col">{test.results || '-'}</span>
                <span className="item-col actions">
                  <button className="btn-icon" onClick={() => showToast('Test details viewed')}>
                    <FaFileMedical />
                  </button>
                  {test.status === 'Completed' && (
                    <button className="btn-icon" onClick={() => showToast('Test results downloaded')}>
                      <FaFileMedical />
                    </button>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'notes' && (
        <div className="notes-container">
          <div className="section-header">
            <h3>Patient Notes</h3>
            {isEditingNotes ? (
              <div>
                <button className="btn-secondary mr-2" onClick={() => {
                  setIsEditingNotes(false);
                  setEditedNotes(patientData.notes);
                }}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={saveNotes}>
                  <FaSave /> Save Notes
                </button>
              </div>
            ) : (
              <button className="btn-primary" onClick={() => setIsEditingNotes(true)}>
                <FaEdit /> Edit Notes
              </button>
            )}
          </div>
          
          <div className="notes-content">
            {isEditingNotes ? (
              <textarea
                className="notes-editor"
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                rows="10"
              ></textarea>
            ) : (
              <div className="notes-text">
                {patientData.notes}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default Patient;