import React, { useState, useEffect, useRef } from 'react';
import '../Dstyles/Dteleconsultation.css';
import { 
  FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, 
  FaPhoneAlt, FaPhoneSlash, FaNotesMedical, FaClock, 
  FaSave, FaFilePrescription, FaPaperclip, FaHistory,
  FaChevronLeft, FaChevronRight, FaUserMd
} from 'react-icons/fa';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { BsCalendarCheck, BsClockHistory } from 'react-icons/bs';

const DoctorTeleconsult = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [prescription, setPrescription] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    additionalNotes: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [patientName, setPatientName] = useState('John Doe');
  const [consultationNotes, setConsultationNotes] = useState('');
  const [patientHistory, setPatientHistory] = useState([]);
  const [showPatientHistory, setShowPatientHistory] = useState(false);
  const [timer, setTimer] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { id: 1, name: 'Jane Smith', time: '10:30', reason: 'Follow-up' },
    { id: 2, name: 'Michael Johnson', time: '11:15', reason: 'New consult' }
  ]);
  const [showSidebar, setShowSidebar] = useState(true);
  
  const videoRef = useRef(null);
  const localVideoRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Simulated patient history
    setPatientHistory([
      { date: '2024-12-15', diagnosis: 'Common cold', prescription: 'Antihistamines' },
      { date: '2024-08-21', diagnosis: 'Seasonal allergies', prescription: 'Loratadine' },
      { date: '2023-11-03', diagnosis: 'Bronchitis', prescription: 'Antibiotics' }
    ]);
  }, []);

  useEffect(() => {
    if (isCallActive && isCameraOn) {
      startCamera();
    } else if (!isCallActive || !isCameraOn) {
      stopCamera();
    }
  }, [isCallActive, isCameraOn]);

  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setTimer(0);
    }
    
    return () => clearInterval(timerRef.current);
  }, [isCallActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: isMicOn 
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Failed to access camera and microphone. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const tracks = localVideoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    }
  };

  const startCall = () => {
    setIsCallActive(true);
    setIsCameraOn(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setShowPrescriptionForm(false);
    setIsScreenSharing(false);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const toggleScreenShare = () => {
    // In a real implementation, this would use the Screen Capture API
    setIsScreenSharing(!isScreenSharing);
    // Just a mockup for demonstration
    alert(isScreenSharing ? "Screen sharing stopped" : "Screen sharing started");
  };

  const togglePrescriptionForm = () => {
    setShowPrescriptionForm(!showPrescriptionForm);
  };

  const togglePatientHistory = () => {
    setShowPatientHistory(!showPatientHistory);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescription({
      ...prescription,
      [name]: value
    });
  };

  const handleNotesChange = (e) => {
    setConsultationNotes(e.target.value);
  };

  const handleSubmitPrescription = (e) => {
    e.preventDefault();
    // Here you would normally send the prescription to a backend
    console.log("Prescription submitted:", prescription);
    
    // Show confirmation and reset form
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setShowPrescriptionForm(false);
      setPrescription({
        medication: '',
        dosage: '',
        frequency: '',
        duration: '',
        additionalNotes: ''
      });
    }, 3000);
  };

  const saveConsultationNotes = () => {
    console.log("Saving consultation notes:", consultationNotes);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <div className="teleconsult-container">
      <div className="teleconsult-main">
        <div className="teleconsult-header">
          <h2>Teleconsultation</h2>
          <div className="patient-info">
            <span>Patient: {patientName}</span>
            <span className="consultation-time">
              <BsClockHistory /> {isCallActive ? `Duration: ${formatTime(timer)}` : `Ready to start`}
            </span>
          </div>
        </div>

        <div className="video-section">
          <div className="video-container">
            <div className="main-video">
              {isCallActive ? (
                <video ref={videoRef} className="patient-video" autoPlay>
                  <source src="/api/placeholder/640/480" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="video-placeholder">
                  <div className="placeholder-content">
                    <FaVideo className="video-icon" />
                    <p>Start call to connect with patient</p>
                  </div>
                </div>
              )}
              <div className="patient-name-tag">{patientName}</div>
            </div>

            <div className="doctor-video-container">
              {isCallActive && (
                <video 
                  ref={localVideoRef} 
                  className="doctor-video" 
                  autoPlay 
                  muted
                />
              )}
              <div className="doctor-name-tag">Dr. Smith</div>
            </div>
          </div>

          <div className="call-controls">
            <button 
              className={`control-btn ${isMicOn ? 'active' : 'inactive'}`}
              onClick={toggleMic}
              disabled={!isCallActive}
              title="Toggle Microphone"
            >
              {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </button>
            <button 
              className={`control-btn ${isCameraOn ? 'active' : 'inactive'}`}
              onClick={toggleCamera}
              disabled={!isCallActive}
              title="Toggle Camera"
            >
              {isCameraOn ? <FaVideo /> : <FaVideoSlash />}
            </button>
            <button 
              className={`control-btn ${isScreenSharing ? 'active' : 'inactive'}`}
              onClick={toggleScreenShare}
              disabled={!isCallActive}
              title="Share Screen"
            >
              {isScreenSharing ? <MdStopScreenShare /> : <MdScreenShare />}
            </button>
            {!isCallActive ? (
              <button 
                className="start-call-btn"
                onClick={startCall}
                title="Start Call"
              >
                <FaPhoneAlt /> Start Call
              </button>
            ) : (
              <button 
                className="end-call-btn"
                onClick={endCall}
                title="End Call"
              >
                <FaPhoneSlash /> End Call
              </button>
            )}
            <button 
              className="prescription-btn"
              onClick={togglePrescriptionForm}
              disabled={!isCallActive}
              title="Add Prescription"
            >
              <FaFilePrescription /> Prescription
            </button>
            <button 
              className="patient-history-btn"
              onClick={togglePatientHistory}
              title="View Patient History"
            >
              <FaHistory /> History
            </button>
          </div>
        </div>

        <div className="consultation-notes">
          <div className="notes-header">
            <h3><FaNotesMedical /> Consultation Notes</h3>
            <div className="notes-actions">
              <button className="attachment-btn" title="Add Attachment">
                <FaPaperclip />
              </button>
              <button 
                className="save-notes-btn" 
                onClick={saveConsultationNotes}
                title="Save Notes"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
          <textarea 
            placeholder="Add your consultation notes here..."
            rows="4"
            value={consultationNotes}
            onChange={handleNotesChange}
          />
        </div>
      </div>

      {showSidebar && (
        <div className="consultation-sidebar">
          <div className="sidebar-header">
            <h3><BsCalendarCheck /> Upcoming Appointments</h3>
            <button className="toggle-sidebar-btn" onClick={toggleSidebar} title="Hide Sidebar">
              <FaChevronRight />
            </button>
          </div>
          <div className="upcoming-appointments">
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-time">
                  <FaClock />
                  <span>{appointment.time}</span>
                </div>
                <div className="appointment-info">
                  <strong>{appointment.name}</strong>
                  <span>{appointment.reason}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="doctor-stats">
            <h3><FaUserMd /> Today's Summary</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">8</span>
                <span className="stat-label">Appointments</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">3</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">2</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showSidebar && (
        <button className="show-sidebar-btn" onClick={toggleSidebar} title="Show Sidebar">
          <FaChevronLeft />
        </button>
      )}

      {showPrescriptionForm && (
        <div className="prescription-form-overlay">
          <div className="prescription-form-container">
            <h3><FaFilePrescription /> New Prescription</h3>
            <form onSubmit={handleSubmitPrescription}>
              <div className="form-group">
                <label>Medication:</label>
                <input 
                  type="text" 
                  name="medication"
                  value={prescription.medication}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Dosage:</label>
                <input 
                  type="text" 
                  name="dosage"
                  value={prescription.dosage}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Frequency:</label>
                <select 
                  name="frequency"
                  value={prescription.frequency}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select frequency</option>
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="Four times daily">Four times daily</option>
                  <option value="As needed">As needed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Duration:</label>
                <input 
                  type="text" 
                  name="duration"
                  value={prescription.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 7 days, 2 weeks"
                  required
                />
              </div>
              <div className="form-group">
                <label>Additional Notes:</label>
                <textarea 
                  name="additionalNotes"
                  value={prescription.additionalNotes}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              <div className="form-buttons">
                <button type="button" onClick={togglePrescriptionForm} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Save Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPatientHistory && (
        <div className="patient-history-overlay">
          <div className="patient-history-container">
            <div className="history-header">
              <h3><FaHistory /> Patient History: {patientName}</h3>
              <button className="close-history-btn" onClick={togglePatientHistory}>×</button>
            </div>
            <div className="history-content">
              {patientHistory.length > 0 ? (
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Diagnosis</th>
                      <th>Prescription</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientHistory.map((record, index) => (
                      <tr key={index}>
                        <td>{record.date}</td>
                        <td>{record.diagnosis}</td>
                        <td>{record.prescription}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No previous history available.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-message">
          Saved successfully!
        </div>
      )}
    </div>
  );
};

export default DoctorTeleconsult;