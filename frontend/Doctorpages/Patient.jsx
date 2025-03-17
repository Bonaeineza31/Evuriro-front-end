import React, { useState } from 'react';
import '../Dstyles/patient.css';
import { FaCalendarAlt, FaChartLine, FaUserMd, FaFileMedical, FaHospital, FaExclamationTriangle, FaCheck, FaPlus, FaTimes, FaEdit, FaSave, FaDownload } from 'react-icons/fa';

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
  const [showMedicalRecordModal, setShowMedicalRecordModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [showLabTestModal, setShowLabTestModal] = useState(false);
  const [showViewRecordModal, setShowViewRecordModal] = useState(false);
  const [showViewFullRecordsModal, setShowViewFullRecordsModal] = useState(false);
  const [newAllergy, setNewAllergy] = useState('');
  const [currentViewingRecord, setCurrentViewingRecord] = useState(null);
  
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
  
  const [newMedicalRecord, setNewMedicalRecord] = useState({
    date: '',
    diagnosis: '',
    doctor: 'Dr. Smith',
    notes: ''
  });
  
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'Once daily',
    startDate: '',
    endDate: '',
    notes: ''
  });
  
  const [newLabTest, setNewLabTest] = useState({
    test: '',
    date: '',
    priority: 'Normal',
    notes: ''
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
  
  // Function to add new medical record
  const handleAddMedicalRecord = () => {
    setShowMedicalRecordModal(true);
  };
  
  // Function to save new medical record
  const saveMedicalRecord = () => {
    // Validate inputs
    if (!newMedicalRecord.date || !newMedicalRecord.diagnosis || !newMedicalRecord.doctor) {
      showToast('Please fill in all required fields');
      return;
    }
    
    // Add new record to the array
    const updatedMedicalHistory = [...patientData.medicalHistory, newMedicalRecord];
    setPatientData({
      ...patientData,
      medicalHistory: updatedMedicalHistory
    });
    
    // Close modal and show confirmation
    setShowMedicalRecordModal(false);
    showToast('Medical record added successfully');
    
    // Reset form
    setNewMedicalRecord({
      date: '',
      diagnosis: '',
      doctor: 'Dr. Smith',
      notes: ''
    });
  };
  
  // Function to add new medication
  const handleAddMedication = () => {
    setShowMedicationModal(true);
  };
  
  // Function to save new medication
  const saveMedication = () => {
    // Validate inputs
    if (!newMedication.name || !newMedication.dosage || !newMedication.startDate) {
      showToast('Please fill in all required fields');
      return;
    }
    
    // Add new medication to the array
    const updatedMedications = [...patientData.medications, newMedication];
    setPatientData({
      ...patientData,
      medications: updatedMedications
    });
    
    // Close modal and show confirmation
    setShowMedicationModal(false);
    showToast('Medication added successfully');
    
    // Reset form
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'Once daily',
      startDate: '',
      endDate: '',
      notes: ''
    });
  };
  
  // Function to order lab test
  const handleOrderLabTest = () => {
    setShowLabTestModal(true);
  };
  
  // Function to save new lab test
  const saveLabTest = () => {
    // Validate inputs
    if (!newLabTest.test || !newLabTest.date) {
      showToast('Please fill in all required fields');
      return;
    }
    
    // Add new lab test to the array
    const newLabTestEntry = {
      date: newLabTest.date,
      test: newLabTest.test,
      status: 'Pending',
      results: ''
    };
    
    const updatedLabResults = [...patientData.labResults, newLabTestEntry];
    setPatientData({
      ...patientData,
      labResults: updatedLabResults
    });
    
    // Close modal and show confirmation
    setShowLabTestModal(false);
    showToast('Lab test ordered successfully');
    
    // Reset form
    setNewLabTest({
      test: '',
      date: '',
      priority: 'Normal',
      notes: ''
    });
  };

  // Function to view medical record
  const viewMedicalRecord = (record) => {
    setCurrentViewingRecord(record);
    setShowViewRecordModal(true);
  };
  
  // Function to view full records
  const viewFullRecords = () => {
    setShowViewFullRecordsModal(true);
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

  // Function to process medication refill
 // Function to process medication refill
 const processMedicationRefill = (medicationName) => {
  showToast(`Refill for ${medicationName} has been processed`);
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
    
    {/* Add Medical Record Modal */}
    {showMedicalRecordModal && (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h3>Add Medical Record</h3>
            <button className="modal-close" onClick={() => setShowMedicalRecordModal(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                value={newMedicalRecord.date} 
                onChange={(e) => setNewMedicalRecord({...newMedicalRecord, date: e.target.value})}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Diagnosis</label>
              <input 
                type="text" 
                value={newMedicalRecord.diagnosis} 
                onChange={(e) => setNewMedicalRecord({...newMedicalRecord, diagnosis: e.target.value})}
                className="form-control"
                placeholder="Enter diagnosis"
              />
            </div>
            <div className="form-group">
              <label>Doctor</label>
              <select 
                value={newMedicalRecord.doctor} 
                onChange={(e) => setNewMedicalRecord({...newMedicalRecord, doctor: e.target.value})}
                className="form-control"
              >
                <option value="Dr. Smith">Dr. Smith</option>
                <option value="Dr. Johnson">Dr. Johnson</option>
                <option value="Dr. Brown">Dr. Brown</option>
              </select>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea 
                value={newMedicalRecord.notes} 
                onChange={(e) => setNewMedicalRecord({...newMedicalRecord, notes: e.target.value})}
                className="form-control"
                rows="3"
                placeholder="Enter additional notes"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" onClick={() => setShowMedicalRecordModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={saveMedicalRecord}>Add Record</button>
          </div>
        </div>
      </div>
    )}
    
    {/* Add Medication Modal */}
    {showMedicationModal && (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h3>Add Medication</h3>
            <button className="modal-close" onClick={() => setShowMedicationModal(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Medication Name</label>
              <input 
                type="text" 
                value={newMedication.name} 
                onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                className="form-control"
                placeholder="Enter medication name"
              />
            </div>
            <div className="form-group">
              <label>Dosage</label>
              <input 
                type="text" 
                value={newMedication.dosage} 
                onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                className="form-control"
                placeholder="e.g. 10mg"
              />
            </div>
            <div className="form-group">
              <label>Frequency</label>
              <select 
                value={newMedication.frequency} 
                onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                className="form-control"
              >
                <option value="Once daily">Once daily</option>
                <option value="Twice daily">Twice daily</option>
                <option value="Three times daily">Three times daily</option>
                <option value="Four times daily">Four times daily</option>
                <option value="As needed">As needed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input 
                type="date" 
                value={newMedication.startDate} 
                onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>End Date (leave blank for ongoing)</label>
              <input 
                type="date" 
                value={newMedication.endDate} 
                onChange={(e) => setNewMedication({...newMedication, endDate: e.target.value})}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea 
                value={newMedication.notes} 
                onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})}
                className="form-control"
                rows="2"
                placeholder="Enter additional notes"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" onClick={() => setShowMedicationModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={saveMedication}>Add Medication</button>
          </div>
        </div>
      </div>
    )}
    
    {/* Order Lab Test Modal */}
    {showLabTestModal && (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h3>Order Lab Test</h3>
            <button className="modal-close" onClick={() => setShowLabTestModal(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Test Name</label>
              <select 
                value={newLabTest.test} 
                onChange={(e) => setNewLabTest({...newLabTest, test: e.target.value})}
                className="form-control"
              >
                <option value="">Select a test</option>
                <option value="Complete Blood Count">Complete Blood Count</option>
                <option value="Lipid Panel">Lipid Panel</option>
                <option value="Urinalysis">Urinalysis</option>
                <option value="Blood Glucose">Blood Glucose</option>
                <option value="Liver Function">Liver Function</option>
                <option value="Kidney Function">Kidney Function</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                value={newLabTest.date} 
                onChange={(e) => setNewLabTest({...newLabTest, date: e.target.value})}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select 
                value={newLabTest.priority} 
                onChange={(e) => setNewLabTest({...newLabTest, priority: e.target.value})}
                className="form-control"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="STAT">STAT</option>
              </select>
            </div>
            <div className="form-group">
              <label>Instructions/Notes</label>
              <textarea 
                value={newLabTest.notes} 
                onChange={(e) => setNewLabTest({...newLabTest, notes: e.target.value})}
                className="form-control"
                rows="3"
                placeholder="Enter any special instructions"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" onClick={() => setShowLabTestModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={saveLabTest}>Order Test</button>
          </div>
        </div>
      </div>
    )}
    
    {/* View Medical Record Modal */}
    {showViewRecordModal && currentViewingRecord && (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h3>Medical Record Details</h3>
            <button className="modal-close" onClick={() => setShowViewRecordModal(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="modal-body">
            <div className="record-detail">
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{currentViewingRecord.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Diagnosis:</span>
                <span className="detail-value">{currentViewingRecord.diagnosis}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Doctor:</span>
                <span className="detail-value">{currentViewingRecord.doctor}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Notes:</span>
                <span className="detail-value">{currentViewingRecord.notes || "No additional notes"}</span>
      </div>
    </div>
  </div>
  <div className="modal-footer">
    <button className="btn-secondary" onClick={() => setShowViewRecordModal(false)}>Close</button>
    <button className="btn-primary" onClick={() => window.print()}>
      <FaDownload className="icon-left" /> Print/Download
    </button>
  </div>
</div>
</div>
)}

{/* View Full Records Modal */}
{showViewFullRecordsModal && (
<div className="modal-overlay">
  <div className="modal-container modal-large">
    <div className="modal-header">
      <h3>Complete Medical Records</h3>
      <button className="modal-close" onClick={() => setShowViewFullRecordsModal(false)}>
        <FaTimes />
      </button>
    </div>
    <div className="modal-body">
      <div className="full-records-container">
        <div className="record-section">
          <h4>Patient Information</h4>
          <div className="record-detail">
            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{patientData.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Age:</span>
              <span className="detail-value">{patientData.age}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Gender:</span>
              <span className="detail-value">{patientData.gender}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Patient ID:</span>
              <span className="detail-value">{patientData.patientId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Contact:</span>
              <span className="detail-value">{patientData.contact}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Insurance:</span>
              <span className="detail-value">{patientData.insurance}</span>
            </div>
          </div>
        </div>
        
        <div className="record-section">
          <h4>Medical History</h4>
          <table className="records-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Diagnosis</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {patientData.medicalHistory.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.diagnosis}</td>
                  <td>{record.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="record-section">
          <h4>Medications</h4>
          <table className="records-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {patientData.medications.map((med, index) => (
                <tr key={index}>
                  <td>{med.name}</td>
                  <td>{med.dosage}</td>
                  <td>{med.frequency}</td>
                  <td>{med.startDate}</td>
                  <td>{med.endDate || "Ongoing"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="record-section">
          <h4>Lab Results</h4>
          <table className="records-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Test</th>
                <th>Status</th>
                <th>Results</th>
              </tr>
            </thead>
            <tbody>
              {patientData.labResults.map((lab, index) => (
                <tr key={index}>
                  <td>{lab.date}</td>
                  <td>{lab.test}</td>
                  <td>{lab.status}</td>
                  <td>{lab.results || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="record-section">
          <h4>Allergies</h4>
          <ul className="allergies-list">
            {patientData.allergies.map((allergy, index) => (
              <li key={index}>{allergy}</li>
            ))}
          </ul>
        </div>
        
        <div className="record-section">
          <h4>Notes</h4>
          <p>{patientData.notes}</p>
        </div>
      </div>
    </div>
    <div className="modal-footer">
      <button className="btn-secondary" onClick={() => setShowViewFullRecordsModal(false)}>Close</button>
      <button className="btn-primary" onClick={() => window.print()}>
        <FaDownload className="icon-left" /> Print/Download
      </button>
    </div>
  </div>
</div>
)}

{/* Patient header */}
<div className="patient-header">
  <div className="patient-info">
    <h1>{patientData.name}</h1>
    <div className="patient-meta">
      <span>{patientData.age} yrs • {patientData.gender}</span>
      <span>ID: {patientData.patientId}</span>
      <span>{patientData.contact}</span>
      <span>Insurance: {patientData.insurance}</span>
    </div>
  </div>
  <div className="patient-actions">
    <button className="btn-primary" onClick={handleScheduleAppointment}>
      <FaCalendarAlt className="icon-left" /> Schedule Appointment
    </button>
    <button className="btn-secondary" onClick={handleSendMessage}>
      <FaUserMd className="icon-left" /> Message Patient
    </button>
    <button className="btn-outline" onClick={viewFullRecords}>
      <FaFileMedical className="icon-left" /> View Full Records
    </button>
  </div>
</div>

{/* Patient navigation */}
<div className="patient-nav">
  <button 
    className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`} 
    onClick={() => setActiveTab('overview')}
  >
    Overview
  </button>
  <button 
    className={`nav-btn ${activeTab === 'appointments' ? 'active' : ''}`} 
    onClick={() => setActiveTab('appointments')}
  >
    Appointments
  </button>
  <button 
    className={`nav-btn ${activeTab === 'medicalHistory' ? 'active' : ''}`} 
    onClick={() => setActiveTab('medicalHistory')}
  >
    Medical History
  </button>
  <button 
    className={`nav-btn ${activeTab === 'medications' ? 'active' : ''}`} 
    onClick={() => setActiveTab('medications')}
  >
    Medications
  </button>
  <button 
    className={`nav-btn ${activeTab === 'labResults' ? 'active' : ''}`} 
    onClick={() => setActiveTab('labResults')}
  >
    Lab Results
  </button>
  <button 
    className={`nav-btn ${activeTab === 'notes' ? 'active' : ''}`} 
    onClick={() => setActiveTab('notes')}
  >
    Notes
  </button>
</div>

{/* Patient content */}
<div className="patient-content">
  {/* Overview tab */}
  {activeTab === 'overview' && (
    <div className="overview-tab">
      <div className="overview-section">
        <h3>Vitals</h3>
        <div className="vitals-grid">
          <div className="vital-card">
            <HeartIcon />
            <div className="vital-info">
              <span className="vital-label">Heart Rate</span>
              <span className="vital-value">{patientData.vitals.heartRate} <small>bpm</small></span>
            </div>
          </div>
          <div className="vital-card">
            <BloodPressureIcon />
            <div className="vital-info">
              <span className="vital-label">Blood Pressure</span>
              <span className="vital-value">{patientData.vitals.bloodPressure} <small>mmHg</small></span>
            </div>
          </div>
          <div className="vital-card">
            <TemperatureIcon />
            <div className="vital-info">
              <span className="vital-label">Temperature</span>
              <span className="vital-value">{patientData.vitals.temperature} <small>°C</small></span>
            </div>
          </div>
          <div className="vital-card">
            <OxygenIcon />
            <div className="vital-info">
              <span className="vital-label">Oxygen Level</span>
              <span className="vital-value">{patientData.vitals.oxygenLevel} <small>%</small></span>
            </div>
          </div>
          <div className="vital-card">
            <WeightIcon />
            <div className="vital-info">
              <span className="vital-label">Weight</span>
              <span className="vital-value">{patientData.vitals.weight} <small>kg</small></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overview-section">
        <div className="section-header">
          <h3>Upcoming Appointments</h3>
          <button className="btn-outline-sm" onClick={handleScheduleAppointment}>
            <FaPlus className="icon-left" /> Schedule
          </button>
        </div>
        <div className="appointments-list">
          {patientData.upcomingAppointments.map((appointment, index) => (
            <div className="appointment-card" key={index}>
              <div className="appointment-date">
                <FaCalendarAlt className="icon-left" />
                <span>{appointment.date}</span>
              </div>
              <div className="appointment-details">
                <span className="appointment-time">{appointment.time}</span>
                <span className="appointment-type">{appointment.type}</span>
                <span className="appointment-doctor">{appointment.doctor}</span>
              </div>
              <div className="appointment-actions">
                <button className="btn-icon" title="Edit Appointment">
                  <FaEdit />
                </button>
                <button className="btn-icon" title="Cancel Appointment">
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="overview-section">
        <div className="section-header">
          <h3>Recent Medical History</h3>
          <button className="btn-outline-sm" onClick={handleAddMedicalRecord}>
            <FaPlus className="icon-left" /> Add Record
          </button>
        </div>
        <div className="medical-history-list">
          {patientData.medicalHistory.slice(0, 3).map((record, index) => (
            <div className="medical-record-card" key={index} onClick={() => viewMedicalRecord(record)}>
              <div className="record-date">{record.date}</div>
              <div className="record-diagnosis">{record.diagnosis}</div>
              <div className="record-doctor">{record.doctor}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="overview-section">
        <div className="section-header">
          <h3>Current Medications</h3>
          <button className="btn-outline-sm" onClick={handleAddMedication}>
            <FaPlus className="icon-left" /> Add Medication
          </button>
        </div>
        <div className="medications-list">
          {patientData.medications.map((medication, index) => (
            <div className="medication-card" key={index}>
              <div className="medication-name">{medication.name}</div>
              <div className="medication-details">
                <span>{medication.dosage}</span>
                <span>{medication.frequency}</span>
                <span>{medication.startDate} - {medication.endDate || "Ongoing"}</span>
              </div>
              <div className="medication-actions">
                <button className="btn-sm" onClick={() => processMedicationRefill(medication.name)}>Refill</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="overview-section">
        <div className="section-header">
          <h3>Allergies</h3>
          <button className="btn-outline-sm" onClick={handleAddAllergy}>
            <FaPlus className="icon-left" /> Add Allergy
          </button>
        </div>
        <div className="allergies-badges">
          {patientData.allergies.map((allergy, index) => (
            <div className="allergy-badge" key={index}>
              <FaExclamationTriangle className="icon-left" />
              <span>{allergy}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="overview-section">
        <div className="section-header">
          <h3>Recent Lab Results</h3>
          <button className="btn-outline-sm" onClick={handleOrderLabTest}>
            <FaPlus className="icon-left" /> Order Test
          </button>
        </div>
        <div className="lab-results-list">
          {patientData.labResults.map((result, index) => (
            <div className="lab-result-card" key={index}>
              <div className="result-date">{result.date}</div>
              <div className="result-test">{result.test}</div>
              <div className={`result-status ${result.status.toLowerCase()}`}>{result.status}</div>
              <div className="result-value">{result.results || "Pending"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
  
{/* Appointments tab */}
{activeTab === 'appointments' && (
    <div className="appointments-tab">
      <div className="section-header">
        <h3>Upcoming Appointments</h3>
        <button className="btn-primary" onClick={handleScheduleAppointment}>
          <FaPlus className="icon-left" /> Schedule Appointment
        </button>
      </div>
      <div className="appointments-list-full">
        {patientData.upcomingAppointments.length > 0 ? (
          patientData.upcomingAppointments.map((appointment, index) => (
            <div className="appointment-card-full" key={index}>
              <div className="appointment-main-info">
                <div className="appointment-date">
                  <FaCalendarAlt className="icon-left" />
                  <span>{appointment.date}</span>
                </div>
                <div className="appointment-time">{appointment.time}</div>
              </div>
              <div className="appointment-secondary-info">
                <span className="appointment-type">{appointment.type}</span>
                <span className="appointment-doctor">{appointment.doctor}</span>
              </div>
              <div className="appointment-actions">
                <button className="btn-outline-sm">Reschedule</button>
                <button className="btn-danger-sm">Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No upcoming appointments scheduled.</p>
          </div>
        )}
      </div>
      
      <div className="section-header mt-4">
        <h3>Past Appointments</h3>
      </div>
      <div className="appointments-list-full">
        <div className="appointment-card-full past">
          <div className="appointment-main-info">
            <div className="appointment-date">
              <FaCalendarAlt className="icon-left" />
              <span>10/03/2025</span>
            </div>
            <div className="appointment-time">09:30 AM</div>
          </div>
          <div className="appointment-secondary-info">
            <span className="appointment-type">Consultation</span>
            <span className="appointment-doctor">Dr. Smith</span>
          </div>
          <div className="appointment-status completed">
            <FaCheck className="icon-left" /> Completed
          </div>
        </div>
        <div className="appointment-card-full past">
          <div className="appointment-main-info">
            <div className="appointment-date">
              <FaCalendarAlt className="icon-left" />
              <span>05/02/2025</span>
            </div>
            <div className="appointment-time">11:00 AM</div>
          </div>
          <div className="appointment-secondary-info">
            <span className="appointment-type">Follow-up</span>
            <span className="appointment-doctor">Dr. Johnson</span>
          </div>
          <div className="appointment-status completed">
            <FaCheck className="icon-left" /> Completed
          </div>
        </div>
      </div>
    </div>
  )}
  
  {/* Medical History tab */}
  {activeTab === 'medicalHistory' && (
    <div className="medical-history-tab">
      <div className="section-header">
        <h3>Medical History</h3>
        <button className="btn-primary" onClick={handleAddMedicalRecord}>
          <FaPlus className="icon-left" /> Add Medical Record
        </button>
      </div>
      <div className="records-table-container">
        <table className="records-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Diagnosis</th>
              <th>Doctor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patientData.medicalHistory.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.diagnosis}</td>
                <td>{record.doctor}</td>
                <td>
                  <button className="btn-icon" onClick={() => viewMedicalRecord(record)} title="View Details">
                    <FaFileMedical />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
  
  {/* Medications tab */}
  {activeTab === 'medications' && (
    <div className="medications-tab">
      <div className="section-header">
        <h3>Medications</h3>
        <button className="btn-primary" onClick={handleAddMedication}>
          <FaPlus className="icon-left" /> Add Medication
        </button>
      </div>
      <div className="records-table-container">
        <table className="records-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patientData.medications.map((medication, index) => (
              <tr key={index}>
                <td>{medication.name}</td>
                <td>{medication.dosage}</td>
                <td>{medication.frequency}</td>
                <td>{medication.startDate}</td>
                <td>{medication.endDate || "Ongoing"}</td>
                <td>
                  <button className="btn-sm" onClick={() => processMedicationRefill(medication.name)}>Refill</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="section-header mt-4">
        <h3>Allergies</h3>
        <button className="btn-outline" onClick={handleAddAllergy}>
          <FaPlus className="icon-left" /> Add Allergy
        </button>
      </div>
      <div className="allergies-large">
        {patientData.allergies.map((allergy, index) => (
          <div className="allergy-item" key={index}>
            <FaExclamationTriangle className="icon-left" />
            <span>{allergy}</span>
          </div>
        ))}
      </div>
    </div>
  )}
  
  {/* Lab Results tab */}
  {activeTab === 'labResults' && (
    <div className="lab-results-tab">
      <div className="section-header">
        <h3>Lab Results</h3>
        <button className="btn-primary" onClick={handleOrderLabTest}>
          <FaPlus className="icon-left" /> Order Lab Test
        </button>
      </div>
      <div className="records-table-container">
        <table className="records-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Test</th>
              <th>Status</th>
              <th>Results</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patientData.labResults.map((result, index) => (
              <tr key={index} className={result.status === 'Pending' ? 'pending-row' : ''}>
                <td>{result.date}</td>
                <td>{result.test}</td>
                <td>
                  <span className={`status-badge ${result.status.toLowerCase()}`}>
                    {result.status}
                  </span>
                </td>
                <td>{result.results || "—"}</td>
                <td>
                  {result.status === 'Completed' && (
                    <button className="btn-icon" title="View Details">
                      <FaFileMedical />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
  
  {/* Notes tab */}
  {activeTab === 'notes' && (
    <div className="notes-tab">
      <div className="section-header">
        <h3>Patient Notes</h3>
        {!isEditingNotes ? (
          <button className="btn-outline" onClick={() => setIsEditingNotes(true)}>
            <FaEdit className="icon-left" /> Edit Notes
          </button>
        ) : (
          <button className="btn-primary" onClick={saveNotes}>
            <FaSave className="icon-left" /> Save Notes
          </button>
        )}
      </div>
      <div className="notes-content">
        {!isEditingNotes ? (
          <div className="notes-text">{patientData.notes}</div>
        ) : (
          <textarea 
            value={editedNotes} 
            onChange={(e) => setEditedNotes(e.target.value)}
            className="notes-editor"
            rows="8"
          ></textarea>
        )}
      </div>
    </div>
  )}
</div>
</div>
);
};

export default Patient;
        