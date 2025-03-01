import React, { useState } from 'react';
import '../styles/Teleconsultation.css';

const Teleconsultation = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'Dr. Sarah Johnson', text: 'Hello! I can see you have  been experiencing some symptoms. How are you feeling today?', time: '10:01 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [callStatus, setCallStatus] = useState('ready'); // ready, connecting, ongoing

  // Mock data
  const upcomingAppointment = {
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: 'March 1, 2025',
    time: '10:00 AM',
    status: 'Scheduled',
    image: 'https://cdn.example.com/doctor-sarah.jpg',
  };

  const patientVitals = {
    heartRate: '72 bpm',
    bloodPressure: '120/80 mmHg',
    temperature: '36.6 °C',
    oxygenLevel: '98%'
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'You', text: newMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      setNewMessage('');
    }
  };

  const handleStartCall = () => {
    setCallStatus('connecting');
    setTimeout(() => {
      setCallStatus('ongoing');
    }, 2000);
  };

  const handleEndCall = () => {
    setCallStatus('ready');
  };

  return (
    <div className="teleconsultation-container">
      <div className="teleconsultation-header">
        <h1>Teleconsultation</h1>
        <div className="appointment-status">
          <span className="status-indicator active"></span>
          Your appointment with {upcomingAppointment.doctorName} is ready
        </div>
      </div>

      <div className="appointment-details">
        <div className="appointment-card">
          <div className="doctor-info">
            <div className="doctor-avatar">
              <span className="avatar-placeholder">SJ</span>
            </div>
            <div className="doctor-details">
              <h2>{upcomingAppointment.doctorName}</h2>
              <p>{upcomingAppointment.specialty}</p>
              <div className="appointment-time">
                <i className="icon-calendar"></i>
                <span>{upcomingAppointment.date} • {upcomingAppointment.time}</span>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            {callStatus === 'ready' && (
              <button className="btn-join" onClick={handleStartCall}>
                Join Consultation
              </button>
            )}
            {callStatus === 'connecting' && (
              <button className="btn-connecting" disabled>
                Connecting...
              </button>
            )}
            {callStatus === 'ongoing' && (
              <button className="btn-end-call" onClick={handleEndCall}>
                End Call
              </button>
            )}
            <button 
              className={`btn-chat ${showChat ? 'active' : ''}`} 
              onClick={() => setShowChat(!showChat)}
            >
              {showChat ? 'Hide Chat' : 'Open Chat'}
            </button>
          </div>
        </div>
      </div>

      <div className="consultation-content">
        <div className="tabs">
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

        <div className="tab-content">
          {activeTab === 'upcoming' && (
            <div className="appointment-info">
              <h3>Appointment Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Doctor</span>
                  <span className="value">{upcomingAppointment.doctorName}</span>
                </div>
                <div className="info-item">
                  <span className="label">Specialty</span>
                  <span className="value">{upcomingAppointment.specialty}</span>
                </div>
                <div className="info-item">
                  <span className="label">Date</span>
                  <span className="value">{upcomingAppointment.date}</span>
                </div>
                <div className="info-item">
                  <span className="label">Time</span>
                  <span className="value">{upcomingAppointment.time}</span>
                </div>
                <div className="info-item">
                  <span className="label">Duration</span>
                  <span className="value">30 minutes</span>
                </div>
                <div className="info-item">
                  <span className="label">Format</span>
                  <span className="value">Video consultation</span>
                </div>
              </div>
              <div className="appointment-notes">
                <h4>Appointment Notes</h4>
                <p>Please be ready 5 minutes before the scheduled time. Ensure you have a stable internet connection and are in a quiet, well-lit area.</p>
              </div>
              <div className="prepare-checklist">
                <h4>Prepare for your visit</h4>
                <ul className="checklist">
                  <li className="checked">Confirmation email received</li>
                  <li className="checked">Test your camera and microphone</li>
                  <li>Prepare a list of your current medications</li>
                  <li>Write down any questions you have for the doctor</li>
                  <li>Have your insurance information ready</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="vitals-info">
              <h3>My Current Vitals</h3>
              <div className="vitals-grid">
                <div className="vital-item">
                  <i className="icon-heart"></i>
                  <div className="vital-data">
                    <span className="vital-label">Heart Rate</span>
                    <span className="vital-value">{patientVitals.heartRate}</span>
                  </div>
                </div>
                <div className="vital-item">
                  <i className="icon-pressure"></i>
                  <div className="vital-data">
                    <span className="vital-label">Blood Pressure</span>
                    <span className="vital-value">{patientVitals.bloodPressure}</span>
                  </div>
                </div>
                <div className="vital-item">
                  <i className="icon-temperature"></i>
                  <div className="vital-data">
                    <span className="vital-label">Temperature</span>
                    <span className="vital-value">{patientVitals.temperature}</span>
                  </div>
                </div>
                <div className="vital-item">
                  <i className="icon-oxygen"></i>
                  <div className="vital-data">
                    <span className="vital-label">Oxygen Level</span>
                    <span className="vital-value">{patientVitals.oxygenLevel}</span>
                  </div>
                </div>
              </div>
              <div className="vital-history">
                <h4>Vitals History</h4>
                <div className="chart-placeholder">
                  <p>Vitals tracking chart would appear here</p>
                </div>
                <button className="btn-upload">Upload New Vitals</button>
              </div>
            </div>
          )}

          {activeTab === 'symptoms' && (
            <div className="symptoms-tracker">
              <h3>Symptom Tracker</h3>
              <div className="symptom-form">
                <div className="symptom-section">
                  <h4>Current Symptoms</h4>
                  <div className="symptom-tags">
                    <span className="symptom-tag">Headache <button className="remove-tag">×</button></span>
                    <span className="symptom-tag">Sore throat <button className="remove-tag">×</button></span>
                    <span className="symptom-tag">Fatigue <button className="remove-tag">×</button></span>
                    <button className="add-symptom">+ Add Symptom</button>
                  </div>
                </div>
                
                <div className="symptom-section">
                  <h4>Symptom Timeline</h4>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-date">Today</div>
                      <div className="timeline-content">
                        <p>Headache (Moderate), Sore throat (Mild), Fatigue (Severe)</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Yesterday</div>
                      <div className="timeline-content">
                        <p>Headache (Mild), Sore throat (Mild)</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Feb 28</div>
                      <div className="timeline-content">
                        <p>Sore throat (Mild)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="symptom-notes">
                  <h4>Notes for Doctor</h4>
                  <textarea placeholder="Describe your symptoms in detail here...">I've been experiencing a headache for the past two days along with a sore throat. The headache gets worse in the evening and the fatigue started this morning.</textarea>
                  <button className="btn-save">Save Notes</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="medical-history">
              <h3>Medical History</h3>
              <div className="history-sections">
                <div className="history-section">
                  <h4>Current Medications</h4>
                  <ul className="medication-list">
                    <li>
                      <div className="medication-name">Lisinopril 10mg</div>
                      <div className="medication-details">1 tablet daily for blood pressure</div>
                    </li>
                    <li>
                      <div className="medication-name">Vitamin D 1000 IU</div>
                      <div className="medication-details">1 tablet daily</div>
                    </li>
                  </ul>
                </div>
                
                <div className="history-section">
                  <h4>Allergies</h4>
                  <ul className="allergy-list">
                    <li>Penicillin</li>
                    <li>Pollen</li>
                  </ul>
                </div>
                
                <div className="history-section">
                  <h4>Past Medical Conditions</h4>
                  <ul className="condition-list">
                    <li>
                      <div className="condition-name">Hypertension</div>
                      <div className="condition-details">Diagnosed 2022, Managed with medication</div>
                    </li>
                  </ul>
                </div>
                
                <div className="history-section">
                  <h4>Previous Appointments</h4>
                  <div className="appointment-history">
                    <div className="past-appointment">
                      <div className="appointment-header">
                        <div className="past-doctor">Dr. Smith (General Medicine)</div>
                        <div className="past-date">Jan 15, 2025</div>
                      </div>
                      <div className="appointment-summary">
                        Annual check-up. All vitals were normal. Recommended continuing current medications.
                      </div>
                    </div>
                    <div className="past-appointment">
                      <div className="appointment-header">
                        <div className="past-doctor">Dr. Johnson (Cardiology)</div>
                        <div className="past-date">Nov 10, 2024</div>
                      </div>
                      <div className="appointment-summary">
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
        <div className="video-container">
          <div className="main-video">
            <div className="video-placeholder doctor">
              <span>Doctor's Video</span>
            </div>
          </div>
          <div className="self-video">
            <div className="video-placeholder self">
              <span>Your Video</span>
            </div>
          </div>
          <div className="call-controls">
            <button className="control-btn mute"><i className="icon-mic"></i></button>
            <button className="control-btn video"><i className="icon-video"></i></button>
            <button className="control-btn share"><i className="icon-screen"></i></button>
            <button className="control-btn end" onClick={handleEndCall}><i className="icon-phone"></i></button>
          </div>
        </div>
      )}

      {showChat && (
        <div className="chat-panel">
          <div className="chat-header">
            <h3>Chat with {upcomingAppointment.doctorName}</h3>
            <button className="close-chat" onClick={() => setShowChat(false)}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender === 'You' ? 'outgoing' : 'incoming'}`}>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-sender">{message.sender}</span>
                    <span className="message-time">{message.time}</span>
                  </div>
                  <p className="message-text">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <textarea 
              placeholder="Type a message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
            ></textarea>
            <button className="send-button" onClick={handleSendMessage}>
              <i className="icon-send"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teleconsultation;