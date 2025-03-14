



import React, { useState, useEffect, useRef } from 'react';
import '../styles/Teleconsultation.css';
import sarah from "../images/Screenshot 2025-03-01 223549.png"

// SVG Icons
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
    </svg>
);
  
const BloodPressureIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M4 12h16"></path>
    </svg>
);
  
const TemperatureIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
    </svg>
);
  
const OxygenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M8 12h8M12 8v8"></path>
    </svg>
);

const Teleconsultation = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'Dr. Sarah Johnson', text: 'Hello! I can see you have been experiencing some symptoms. How are you feeling today?', time: '10:01 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [callStatus, setCallStatus] = useState('ready');
  
  // New WebRTC States
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMediaAccessRequested, setIsMediaAccessRequested] = useState(false);
  const [mediaAccessError, setMediaAccessError] = useState(null);

  // Refs for Video Elements
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Symptoms and Other Existing States
  const [symptoms, setSymptoms] = useState([
    { name: 'Headache', severity: 'Moderate' },
    { name: 'Sore throat', severity: 'Mild' },
    { name: 'Fatigue', severity: 'Severe' }
  ]);
  const [newSymptom, setNewSymptom] = useState('');
  const [newSymptomSeverity, setNewSymptomSeverity] = useState('Mild');
  const [showAddSymptomForm, setShowAddSymptomForm] = useState(false);
  const [doctorNotes, setDoctorNotes] = useState("I've been experiencing a headache for the past two days along with a sore throat. The headache gets worse in the evening and the fatigue started this morning.");
  const [checklist, setChecklist] = useState([
    { text: 'Confirmation email received', checked: true },
    { text: 'Test your camera and microphone', checked: true },
    { text: 'Prepare a list of your current medications', checked: false },
    { text: 'Write down any questions you have for the doctor', checked: false },
    { text: 'Have your insurance information ready', checked: false },
  ]);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Mock Data
  const upcomingAppointment = {
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: 'March 1, 2025',
    time: '10:00 AM',
    status: 'Scheduled',
    image: sarah,
  };

  const patientVitals = {
    heartRate: '72 bpm',
    bloodPressure: '120/80 mmHg',
    temperature: '36.6 °C',
    oxygenLevel: '98%'
  };

  // Missing function implementations
  const handleUploadVitals = () => {
    // Implementation for uploading vitals
    alert("Upload vitals functionality would be implemented here");
  };

  const saveDoctorNotes = () => {
    // Implementation for saving doctor notes
    alert("Notes saved successfully!");
  };

  // Media Access Request Function
  const requestMediaAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setLocalStream(stream);
      setIsMediaAccessRequested(true);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
      setMediaAccessError(error);
      setIsMediaAccessRequested(false);
    }
  };

  // Modified Start Call Function
  const handleStartCall = async () => {
    setCallStatus('connecting');
    await requestMediaAccess();
    
    setTimeout(() => {
      setCallStatus('ongoing');
    }, 2000);
  };

  // Modified End Call Function
  const handleEndCall = () => {
    // Stop local stream tracks
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    
    // Reset all call-related states
    setCallStatus('ready');
    setLocalStream(null);
    setRemoteStream(null);
    setIsMediaAccessRequested(false);
    setMediaAccessError(null);
    setIsMuted(false);
    setIsVideoOn(true);
    setIsScreenSharing(false);
  };

  // Toggle Video Functionality
  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn(videoTrack.enabled);
    }
  };

  // Toggle Microphone Functionality
  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      setMessages([...messages, { sender: 'You', text: newMessage, time: currentTime }]);
      setNewMessage('');
      
      // Simulate doctor's response after a short delay
      setTimeout(() => {
        const responseMessages = [
          "Thank you for sharing those details. Have you tried any home remedies for your symptoms?",
          "I see. When did these symptoms first appear?",
          "I understand your concern. Let's discuss this further during our video consultation.",
          "Have you checked your temperature recently?"
        ];
        const randomResponse = responseMessages[Math.floor(Math.random() * responseMessages.length)];
        const responseTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        setMessages(prev => [...prev, { sender: 'Dr. Sarah Johnson', text: randomResponse, time: responseTime }]);
      }, 2000);
    }
  };

  const handleAddSymptom = () => {
    if (newSymptom.trim()) {
      setSymptoms([...symptoms, { name: newSymptom, severity: newSymptomSeverity }]);
      setNewSymptom('');
      setShowAddSymptomForm(false);
      
      // Update the symptom timeline
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      // In a real app, we would update the timeline data here
    }
  };

  const handleRemoveSymptom = (index) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms.splice(index, 1);
    setSymptoms(updatedSymptoms);
  };

  const toggleChecklistItem = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].checked = !updatedChecklist[index].checked;
    setChecklist(updatedChecklist);
  };

  // Render Method
  return (
    <div className="telecon-container">
      <div className="telecon-header">
        <h1>Teleconsultation</h1>
        <div className="telecon-appointment-status">
          <span className="telecon-status-indicator active"></span>
          Your appointment with {upcomingAppointment.doctorName} is ready
        </div>
      </div>

      <div className="telecon-appointment-details">
        <div className="telecon-appointment-card">
          <div className="telecon-doctor-info">
            <div className="telecon-doctor-avatar">
              <span className="telecon-avatar-placeholder">SJ</span>
            </div>
            <div className="telecon-doctor-details">
              <h2>{upcomingAppointment.doctorName}</h2>
              <p>{upcomingAppointment.specialty}</p>
              <div className="telecon-appointment-time">
                <i className="telecon-icon-calendar"></i>
                <span>{upcomingAppointment.date} • {upcomingAppointment.time}</span>
              </div>
            </div>
          </div>
          <div className="telecon-action-buttons">
            {callStatus === 'ready' && (
              <button className="telecon-btn-join" onClick={handleStartCall}>
                Join Consultation
              </button>
            )}
            {callStatus === 'connecting' && (
              <button className="telecon-btn-connecting" disabled>
                Connecting...
              </button>
            )}
            {callStatus === 'ongoing' && (
              <button className="telecon-btn-end-call" onClick={handleEndCall}>
                End Call
              </button>
            )}
            <button 
              className={`telecon-btn-chat ${showChat ? 'active' : ''}`} 
              onClick={() => setShowChat(!showChat)}
            >
              {showChat ? 'Hide Chat' : 'Open Chat'}
            </button>
          </div>
        </div>
      </div>

      <div className="telecon-consultation-content">
        <div className="telecon-tabs">
          <button 
            className={activeTab === 'upcoming' ? 'active' : ''} 
            onClick={() => setActiveTab('upcoming')}
          >
            Appointment Details
          </button>
          <button 
            className={activeTab === 'vitals' ? 'active' : ''} 
            onClick={() => setActiveTab('vitals')}
          >
            My Vitals
          </button>
          <button 
            className={activeTab === 'symptoms' ? 'active' : ''} 
            onClick={() => setActiveTab('symptoms')}
          >
            Symptoms
          </button>
          <button 
            className={activeTab === 'history' ? 'active' : ''} 
            onClick={() => setActiveTab('history')}
          >
            Medical History
          </button>
        </div>

        <div className="telecon-tab-content">
          {activeTab === 'upcoming' && (
            <div className="telecon-appointment-info">
              <h3>Appointment Information</h3>
              <div className="telecon-info-grid">
                <div className="telecon-info-item">
                  <span className="telecon-label">Doctor</span>
                  <span className="telecon-value">{upcomingAppointment.doctorName}</span>
                </div>
                <div className="telecon-info-item">
                  <span className="telecon-label">Specialty</span>
                  <span className="telecon-value">{upcomingAppointment.specialty}</span>
                </div>
                <div className="telecon-info-item">
                  <span className="telecon-label">Date</span>
                  <span className="telecon-value">{upcomingAppointment.date}</span>
                </div>
                <div className="telecon-info-item">
                  <span className="telecon-label">Time</span>
                  <span className="telecon-value">{upcomingAppointment.time}</span>
                </div>
                <div className="telecon-info-item">
                  <span className="telecon-label">Duration</span>
                  <span className="telecon-value">30 minutes</span>
                </div>
                <div className="telecon-info-item">
                  <span className="telecon-label">Format</span>
                  <span className="telecon-value">Video consultation</span>
                </div>
              </div>
              <div className="telecon-appointment-notes">
                <h4>Appointment Notes</h4>
                <p>Please be ready 5 minutes before the scheduled time. Ensure you have a stable internet connection and are in a quiet, well-lit area.</p>
              </div>
              <div className="telecon-prepare-checklist">
                <h4>Prepare for your visit</h4>
                <ul className="telecon-checklist">
                  {checklist.map((item, index) => (
                    <li 
                      key={index} 
                      className={item.checked ? "checked" : ""}
                      onClick={() => toggleChecklistItem(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="telecon-vitals-info">
              <h3>My Current Vitals</h3>
              <div className="telecon-vitals-grid">
              <div className="telecon-vital-item">
                  <div className="telecon-vital-data">
                    <div className="vital-icon">
                      <HeartIcon />
                    </div>
                    <span className="telecon-vital-label">Heart Rate</span>
                    <span className="telecon-vital-value">{patientVitals.heartRate}</span>
                  </div>
                </div>
                <div className="telecon-vital-item">
                  <div className="telecon-vital-data">
                    <div className="vital-icon">
                      <BloodPressureIcon />
                    </div>
                    <span className="telecon-vital-label">Blood Pressure</span>
                    <span className="telecon-vital-value">{patientVitals.bloodPressure}</span>
                  </div>
                </div>
                <div className="telecon-vital-item">
                  <div className="telecon-vital-data">
                    <div className="vital-icon">
                      <TemperatureIcon />
                    </div>
                    <span className="telecon-vital-label">Temperature</span>
                    <span className="telecon-vital-value">{patientVitals.temperature}</span>
                  </div>
                </div>
                <div className="telecon-vital-item">
                  <div className="telecon-vital-data">
                    <div className="vital-icon">
                      <OxygenIcon />
                    </div>
                    <span className="telecon-vital-label">Oxygen Level</span>
                    <span className="telecon-vital-value">{patientVitals.oxygenLevel}</span>
                  </div>
                </div>
              </div>
              <div className="telecon-vital-history">
                <h4>Vitals History</h4>
                <div className="telecon-chart-placeholder">
                  <p>Vitals tracking chart would appear here</p>
                </div>
                <button className="telecon-btn-upload" onClick={handleUploadVitals}>Upload New Vitals</button>
              </div>
            </div>
          )}

          {activeTab === 'symptoms' && (
            <div className="telecon-symptoms-tracker">
              <h3>Symptom Tracker</h3>
              <div className="telecon-symptom-form">
                <div className="telecon-symptom-section">
                  <h4>Current Symptoms</h4>
                  <div className="telecon-symptom-tags">
                    {symptoms.map((symptom, index) => (
                      <span key={index} className="telecon-symptom-tag">
                        {symptom.name} ({symptom.severity}) 
                        <button className="telecon-remove-tag" onClick={() => handleRemoveSymptom(index)}>×</button>
                      </span>
                    ))}
                    {!showAddSymptomForm ? (
                      <button className="telecon-add-symptom" onClick={() => setShowAddSymptomForm(true)}>+ Add Symptom</button>
                    ) : (
                      <div className="telecon-add-symptom-form" style={{ marginTop: '10px' }}>
                        <input 
                          type="text" 
                          placeholder="Symptom name" 
                          value={newSymptom} 
                          onChange={(e) => setNewSymptom(e.target.value)}
                          style={{ padding: '5px', marginRight: '5px' }}
                        />
                        <select 
                          value={newSymptomSeverity} 
                          onChange={(e) => setNewSymptomSeverity(e.target.value)}
                          style={{ padding: '5px', marginRight: '5px' }}
                        >
                          <option value="Mild">Mild</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Severe">Severe</option>
                        </select>
                        <button 
                          onClick={handleAddSymptom}
                          style={{ padding: '5px 10px', marginRight: '5px' }}
                        >
                          Add
                        </button>
                        <button 
                          onClick={() => setShowAddSymptomForm(false)}
                          style={{ padding: '5px 10px' }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="telecon-symptom-section">
                  <h4>Symptom Timeline</h4>
                  <div className="telecon-timeline">
                    <div className="telecon-timeline-item">
                      <div className="telecon-timeline-date">Today</div>
                      <div className="telecon-timeline-content">
                        <p>
                          {symptoms.map((symptom, index) => (
                            <span key={index}>
                              {symptom.name} ({symptom.severity})
                              {index < symptoms.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                    <div className="telecon-timeline-item">
                      <div className="telecon-timeline-date">Yesterday</div>
                      <div className="telecon-timeline-content">
                        <p>Headache (Mild), Sore throat (Mild)</p>
                      </div>
                    </div>
                    <div className="telecon-timeline-item">
                      <div className="telecon-timeline-date">Feb 28</div>
                      <div className="telecon-timeline-content">
                        <p>Sore throat (Mild)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="telecon-symptom-notes">
                  <h4>Notes for Doctor</h4>
                  <textarea 
                    placeholder="Describe your symptoms in detail here..." 
                    value={doctorNotes}
                    onChange={(e) => setDoctorNotes(e.target.value)}
                  ></textarea>
                  <button className="telecon-btn-save" onClick={saveDoctorNotes}>Save Notes</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="telecon-medical-history">
              <h3>Medical History</h3>
              <div className="telecon-history-sections">
                <div className="telecon-history-section">
                  <h4>Current Medications</h4>
                  <ul className="telecon-medication-list">
                    <li>
                      <div className="telecon-medication-name">Lisinopril 10mg</div>
                      <div className="telecon-medication-details">1 tablet daily for blood pressure</div>
                    </li>
                    <li>
                      <div className="telecon-medication-name">Vitamin D 1000 IU</div>
                      <div className="telecon-medication-details">1 tablet daily</div>
                    </li>
                  </ul>
                </div>
                
                <div className="telecon-history-section">
                  <h4>Allergies</h4>
                  <ul className="telecon-allergy-list">
                    <li>Penicillin</li>
                    <li>Pollen</li>
                  </ul>
                </div>
                
                <div className="telecon-history-section">
                  <h4>Past Medical Conditions</h4>
                  <ul className="telecon-condition-list">
                    <li>
                      <div className="telecon-condition-name">Hypertension</div>
                      <div className="telecon-condition-details">Diagnosed 2022, Managed with medication</div>
                    </li>
                  </ul>
                </div>
                
                <div className="telecon-history-section">
                  <h4>Previous Appointments</h4>
                  <div className="telecon-appointment-history">
                    <div className="telecon-past-appointment">
                      <div className="telecon-appointment-header">
                        <div className="telecon-past-doctor">Dr. Smith (General Medicine)</div>
                        <div className="telecon-past-date">Jan 15, 2025</div>
                      </div>
                      <div className="telecon-appointment-summary">
                        Annual check-up. All vitals were normal. Recommended continuing current medications.
                      </div>
                    </div>
                    <div className="telecon-past-appointment">
                      <div className="telecon-appointment-header">
                        <div className="telecon-past-doctor">Dr. Johnson (Cardiology)</div>
                        <div className="telecon-past-date">Nov 10, 2024</div>
                      </div>
                      <div className="telecon-appointment-summary">
                        Follow-up for hypertension. Blood pressure well-controlled. Continue with current treatment.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {callStatus === 'ongoing' && (
        <div className="telecon-video-container">
          {/* Remote Doctor's Video */}
          <div className="telecon-main-video">
            <div className="telecon-video-placeholder doctor">
              {remoteStream ? (
                <video 
                  ref={remoteVideoRef} 
                  autoPlay 
                  playsInline 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span>Doctor's Video</span>
              )}
            </div>
          </div>

          {/* Local User's Video */}
          <div className="telecon-self-video">
            {isMediaAccessRequested ? (
              <video 
                ref={localVideoRef} 
                autoPlay 
                playsInline 
                muted 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div className="telecon-video-placeholder self">
                {mediaAccessError ? (
                  <span>Camera Access Denied</span>
                ) : (
                  <span>Your Video</span>
                )}
              </div>
            )}
          </div>

          {/* Media Access Request Modal */}
          {!isMediaAccessRequested && callStatus === 'ongoing' && (
            <div className="telecon-media-access-modal">
              <div className="telecon-media-access-content">
                <h3>Camera and Microphone Access</h3>
                <p>This consultation requires camera and microphone access. Please click 'Allow' in your browser.</p>
                <button onClick={requestMediaAccess}>
                  Request Access
                </button>
              </div>
            </div>
          )}

          {/* Call Controls */}
          <div className="telecon-call-controls">
            <button 
              className={`telecon-control-btn mute ${isMuted ? 'active' : ''}`}
              onClick={toggleMic}
            >
              <i className={`telecon-icon-${isMuted ? 'mic-off' : 'mic'}`}></i>
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button 
              className={`telecon-control-btn video ${!isVideoOn ? 'active' : ''}`}
              onClick={toggleVideo}
            >
              <i className={`telecon-icon-${isVideoOn ? 'video' : 'video-off'}`}></i>
              {isVideoOn ? 'Stop Video' : 'Start Video'}
            </button>
            <button 
              className={`telecon-control-btn share ${isScreenSharing ? 'active' : ''}`}
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            >
              <i className="telecon-icon-screen"></i>
              {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
            </button>
            <button className="telecon-control-btn end" onClick={handleEndCall}>
              <i className="telecon-icon-phone"></i>
              End Call
            </button>
          </div>
        </div>
      )}

      {showChat && (
        <div className="telecon-chat-panel">
          <div className="telecon-chat-header">
            <h3>Chat with {upcomingAppointment.doctorName}</h3>
            <button className="telecon-close-chat" onClick={() => setShowChat(false)}>×</button>
          </div>
          <div className="telecon-chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`telecon-message ${message.sender === 'You' ? 'outgoing' : 'incoming'}`}>
                <div className="telecon-message-content">
                  <div className="telecon-message-header">
                    <span className="telecon-message-sender">{message.sender}</span>
                    <span className="telecon-message-time">{message.time}</span>
                  </div>
                  <p className="telecon-message-text">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="telecon-chat-input">
            <textarea 
              placeholder="Type a message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
            ></textarea>
            <button className="telecon-send-button" onClick={handleSendMessage}>
              <i className="telecon-icon-send"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teleconsultation;
                