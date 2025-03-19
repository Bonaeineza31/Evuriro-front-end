import React, { useState, useEffect, useRef } from 'react';
import '../Dstyles/Dteleconsultation.css';

const DoctorTeleconsult = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
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
  
  const videoRef = useRef(null);
  const localVideoRef = useRef(null);

  useEffect(() => {
    if (isCallActive && isCameraOn) {
      startCamera();
    } else if (!isCallActive || !isCameraOn) {
      stopCamera();
    }
  }, [isCallActive, isCameraOn]);

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
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const togglePrescriptionForm = () => {
    setShowPrescriptionForm(!showPrescriptionForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescription({
      ...prescription,
      [name]: value
    });
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

  return (
    <div className="teleconsult-container">
      <div className="teleconsult-header">
        <h2>Teleconsultation</h2>
        <div className="patient-info">
          <span>Patient: {patientName}</span>
          <span className="consultation-time">
            Started: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

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
                <i className="video-icon">📹</i>
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
        >
          {isMicOn ? '🎙️' : '🔇'}
        </button>
        <button 
          className={`control-btn ${isCameraOn ? 'active' : 'inactive'}`}
          onClick={toggleCamera}
          disabled={!isCallActive}
        >
          {isCameraOn ? '📸' : '🚫'}
        </button>
        {!isCallActive ? (
          <button 
            className="start-call-btn"
            onClick={startCall}
          >
            Start Call
          </button>
        ) : (
          <button 
            className="end-call-btn"
            onClick={endCall}
          >
            End Call
          </button>
        )}
        <button 
          className="prescription-btn"
          onClick={togglePrescriptionForm}
          disabled={!isCallActive}
        >
          Add Prescription
        </button>
      </div>

      {showPrescriptionForm && (
        <div className="prescription-form-overlay">
          <div className="prescription-form-container">
            <h3>New Prescription</h3>
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

      {showConfirmation && (
        <div className="confirmation-message">
          Prescription added successfully!
        </div>
      )}

      <div className="consultation-notes">
        <h3>Consultation Notes</h3>
        <textarea 
          placeholder="Add your consultation notes here..."
          rows="4"
        />
        <button className="save-notes-btn">Save Notes</button>
      </div>
    </div>
  );
};

export default DoctorTeleconsult;