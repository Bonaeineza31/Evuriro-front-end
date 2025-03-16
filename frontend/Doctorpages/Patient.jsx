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