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
  const processMedicationRefill = (medicationName) => {
    showToast(`Refill for ${medicationName} has been processed`);
  };