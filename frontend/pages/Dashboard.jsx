import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

// Icons
import { Heart, Activity, Thermometer, Droplet, Scale, Calendar, Video, FileText, Hospital, Smartphone,Wifi, Clock } from 'lucide-react';

const Dashboard = () => {
  // State for user data
  const [userData, setUserData] = useState({
    name:'User',
    vitals: {
      heartRate: 72,
      bloodPressure: '120/80',
      temperature: 36.6,
      oxygenLevel: 98,
      weight: 70.5
    },
    appointments: [
      {
        id: 1,
        doctor: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        date: '25/03/2025',
        time: '10:00 AM',
        type: 'in-person'
      },
      {
        id: 2,
        doctor: 'Dr. Michael Chen',
        specialty: 'Dermatology',
        date: '05/04/2025',
        time: '2:30 PM',
        type: 'teleconsultation'
      }
    ],
    recentActivity: [
      {
        id: 1,
        action: 'Took blood pressure medication',
        time: '2 hours ago'
      },
      {
        id: 2,
        action: 'Booked appointment with Dr. Johnson',
        time: 'Yesterday'
      },
      {
        id: 3,
        action: 'Completed teleconsultation with Dr. Smith',
        time: '3 days ago'
      }
    ]
  });

  useEffect(() => {
    // Get user name from localStorage
    const userName = localStorage.getItem('userName');
    
    if (userName) {
      setUserData(prevData => ({
        ...prevData,
        name: userName
      }));
    }
  }, []);

  // State for modals
  const [showUpdateVitals, setShowUpdateVitals] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // State for vitals form
  const [vitalsForm, setVitalsForm] = useState({...userData.vitals});

  // Handle vitals update
  const handleVitalsChange = (e) => {
    const { name, value } = e.target;
    setVitalsForm({...vitalsForm, [name]: value});
  };

  const saveVitals = () => {
    setUserData({...userData, vitals: vitalsForm});
    setShowUpdateVitals(false);
  };

  // Handle appointment booking
  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    type: 'in-person'
  });

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({...newAppointment, [name]: value});
  };

  const bookAppointment = () => {
    // Add validation here
    if (!newAppointment.doctor || !newAppointment.date || !newAppointment.time) {
      alert('Please fill in all required fields');
      return;
    }
    
    const appointment = {
      id: userData.appointments.length + 1,
      ...newAppointment
    };
    
    setUserData({
      ...userData, 
      appointments: [...userData.appointments, appointment],
      recentActivity: [
        {
          id: Date.now(),
          action: `Booked appointment with ${appointment.doctor}`,
          time: 'Just now'
        },
        ...userData.recentActivity
      ]
    });
    
    setShowAppointmentModal(false);
    setNewAppointment({
      doctor: '',
      specialty: '',
      date: '',
      time: '',
      type: 'in-person'
    });
  };

  // Handle appointment rescheduling
  const openRescheduleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const rescheduleAppointment = () => {
    // Update the appointment with new date/time
    const updatedAppointments = userData.appointments.map(apt => 
      apt.id === selectedAppointment.id ? selectedAppointment : apt
    );
    
    setUserData({
      ...userData,
      appointments: updatedAppointments,
      recentActivity: [
        {
          id: Date.now(),
          action: `Rescheduled appointment with ${selectedAppointment.doctor}`,
          time: 'Just now'
        },
        ...userData.recentActivity
      ]
    });
    
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
  };

  const handleRescheduleChange = (e) => {
    const { name, value } = e.target;
    setSelectedAppointment({...selectedAppointment, [name]: value});
  };

  // Cancel appointment
  const cancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const appointment = userData.appointments.find(apt => apt.id === id);
      const updatedAppointments = userData.appointments.filter(apt => apt.id !== id);
      
      setUserData({
        ...userData,
        appointments: updatedAppointments,
        recentActivity: [
          {
            id: Date.now(),
            action: `Cancelled appointment with ${appointment.doctor}`,
            time: 'Just now'
          },
          ...userData.recentActivity
        ]
      });
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="welcome-message">Welcome to Evuriro Health, {userData.name}</h1>
      
      <div className="dashboard-grid">
        {/* Health Summary */}
        <div className="dashboard-card health-summary">
          <h2 className="card-title">Health Summary</h2>
          <div className="vital-items">
            <div className="vital-item">
              <div className="vital-icon"><Heart size={20} /></div>
              <div className="vital-info">
                <span className="vital-label">Heart Rate</span>
                <span className="vital-value">{userData.vitals.heartRate} bpm</span>
              </div>
              <div className="vital-status normal"></div>
            </div>
            
            <div className="vital-item">
              <div className="vital-icon"><Activity size={20} /></div>
              <div className="vital-info">
                <span className="vital-label">Blood Pressure</span>
                <span className="vital-value">{userData.vitals.bloodPressure} mmHg</span>
              </div>
              <div className="vital-status normal"></div>
            </div>
            
            <div className="vital-item">
              <div className="vital-icon"><Thermometer size={20} /></div>
              <div className="vital-info">
                <span className="vital-label">Temperature</span>
                <span className="vital-value">{userData.vitals.temperature} °C</span>
              </div>
              <div className="vital-status normal"></div>
            </div>
            
            <div className="vital-item">
              <div className="vital-icon"><Droplet size={20} /></div>
              <div className="vital-info">
                <span className="vital-label">Oxygen Level</span>
                <span className="vital-value">{userData.vitals.oxygenLevel}%</span>
              </div>
              <div className="vital-status normal"></div>
            </div>
            
            <div className="vital-item">
              <div className="vital-icon"><Scale size={20} /></div>
              <div className="vital-info">
                <span className="vital-label">Weight</span>
                <span className="vital-value">{userData.vitals.weight} kg</span>
              </div>
              <div className="vital-status normal"></div>
            </div>
          </div>
          
          <div className="vital-actions">
            <button className="btn primary" onClick={() => setShowUpdateVitals(true)}>
              Update Vitals
            </button>
            <Link to ="/connect-device" className="btn secondary">Connect Device</Link>
          </div>
          
          <div className="vital-history">
            <h3>History</h3>
            <div className="history-tabs">
              <button className="tab active">Week</button>
              <button className="tab">Month</button>
              <button className="tab">Year</button>
            </div>
            <div className="trend-chart">
              {/* Simple chart representation */}
              <div className="chart-line"></div>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="dashboard-card appointments">
          <div className="card-header">
            <h2 className="card-title">Upcoming Appointments</h2>
            <button className="btn text">View All</button>
          </div>
          
          {userData.appointments.length > 0 ? (
            <div className="appointment-list">
              {userData.appointments.map(appointment => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-date">
                    <Calendar size={18} />
                    <div className="date-info">
                      <span>{appointment.date}</span>
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  
                  <div className="appointment-details">
                    <h3 className="doctor-name">{appointment.doctor}</h3>
                    <span className="specialty">{appointment.specialty}</span>
                    <div className="appointment-type">
                      {appointment.type === 'teleconsultation' ? (
                        <span className="teleconsult"><Video size={14} /> Teleconsultation</span>
                      ) : (
                        <span className="in-person"><Hospital size={14} /> In-person</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="appointment-actions">
                    <button 
                      className="btn secondary small" 
                      onClick={() => openRescheduleModal(appointment)}
                    >
                      Reschedule
                    </button>
                    <button 
                      className="btn outline small" 
                      onClick={() => cancelAppointment(appointment.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-appointments">
              <p>No upcoming appointments</p>
            </div>
          )}
          
          <button 
            className="btn primary full-width" 
            onClick={() => setShowAppointmentModal(true)}
          >
            Schedule New Appointment
          </button>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card quick-actions">
          <h2 className="card-title">Quick Actions</h2>
          <div className="action-grid">
            <Link to ="/appointments" className="action-button">
              <Calendar size={24} />
              <span>Schedule Appointment</span>
            </Link>
            <Link to ="/teleconsult" className="action-button">
              <Video size={24} />
              <span>Start Teleconsultation</span>
            </Link>
            <Link to ="/uploadrecord" className="action-button">
              <FileText size={24} />
              <span>Upload Records</span>
            </Link>
            <Link to ="/hospitals" className="action-button">
              <Hospital size={24} />
              <span>Find Hospital</span>
            </Link>
            <Link to ="/connect-device" className="action-button">
              <Wifi size={24} />
              <span>Connect Device</span>
            </Link>
            <button className="action-button">
              <Clock size={24} />
              <span>Medication Reminder</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card recent-activity">
          <div className="card-header">
            <h2 className="card-title">Recent Activity</h2>
            <button className="btn text">View All</button>
          </div>
          
          <div className="activity-list">
            {userData.recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon"></div>
                <div className="activity-details">
                  <span className="activity-text">{activity.action}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Update Vitals Modal */}
      {showUpdateVitals && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Update Vitals</h2>
              <button className="close-btn" onClick={() => setShowUpdateVitals(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Heart Rate</label>
                <input 
                  type="number" 
                  name="heartRate" 
                  value={vitalsForm.heartRate} 
                  onChange={handleVitalsChange}
                />
              </div>
              <div className="form-group">
                <label>Blood Pressure</label>
                <input 
                  type="text" 
                  name="bloodPressure" 
                  value={vitalsForm.bloodPressure} 
                  onChange={handleVitalsChange}
                  placeholder="systolic/diastolic"
                />
              </div>
              <div className="form-group">
                <label>Temperature</label>
                <input 
                  type="number" 
                  name="temperature" 
                  value={vitalsForm.temperature} 
                  onChange={handleVitalsChange}
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label>Oxygen Level</label>
                <input 
                  type="number" 
                  name="oxygenLevel" 
                  value={vitalsForm.oxygenLevel} 
                  onChange={handleVitalsChange}
                />
              </div>
              <div className="form-group">
                <label>Weight</label>
                <input 
                  type="number" 
                  name="weight" 
                  value={vitalsForm.weight} 
                  onChange={handleVitalsChange}
                  step="0.1"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn outline" onClick={() => setShowUpdateVitals(false)}>Cancel</button>
              <button className="btn primary" onClick={saveVitals}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Book Appointment Modal */}
      {showAppointmentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Schedule New Appointment</h2>
              <button className="close-btn" onClick={() => setShowAppointmentModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Doctor *</label>
                <select 
                  name="doctor" 
                  value={newAppointment.doctor} 
                  onChange={handleAppointmentChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  <option value="Dr. Sarah Johnson">Dr. Sarah Johnson (Cardiology)</option>
                  <option value="Dr. Michael Chen">Dr. Michael Chen (Dermatology)</option>
                  <option value="Dr. Lisa Wong">Dr. Lisa Wong (General Practice)</option>
                  <option value="Dr. James Miller">Dr. James Miller (Orthopedics)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Appointment Type</label>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="type" 
                      value="in-person" 
                      checked={newAppointment.type === 'in-person'} 
                      onChange={handleAppointmentChange} 
                    />
                    In-person
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="type" 
                      value="teleconsultation" 
                      checked={newAppointment.type === 'teleconsultation'} 
                      onChange={handleAppointmentChange} 
                    />
                    Teleconsultation
                  </label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input 
                    type="date" 
                    name="date" 
                    value={newAppointment.date} 
                    onChange={handleAppointmentChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time *</label>
                  <input 
                    type="time" 
                    name="time" 
                    value={newAppointment.time} 
                    onChange={handleAppointmentChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Reason for Visit</label>
                <textarea 
                  name="reason" 
                  value={newAppointment.reason || ''} 
                  onChange={handleAppointmentChange}
                  rows="3"
                  placeholder="Briefly describe your symptoms or reason for the visit"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn outline" onClick={() => setShowAppointmentModal(false)}>Cancel</button>
              <button className="btn primary" onClick={bookAppointment}>Book Appointment</button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Appointment Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Reschedule Appointment</h2>
              <button className="close-btn" onClick={() => setShowRescheduleModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p className="appointment-info">
                Appointment with <strong>{selectedAppointment.doctor}</strong>
                <br />
                <span className="specialty">({selectedAppointment.specialty})</span>
              </p>
              
              <div className="form-row">
                <div className="form-group">
                  <label>New Date</label>
                  <input 
                    type="date" 
                    name="date" 
                    value={selectedAppointment.date} 
                    onChange={handleRescheduleChange}
                  />
                </div>
                <div className="form-group">
                  <label>New Time</label>
                  <input 
                    type="time" 
                    name="time" 
                    value={selectedAppointment.time} 
                    onChange={handleRescheduleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Reason for Rescheduling</label>
                <textarea 
                  name="rescheduleReason" 
                  value={selectedAppointment.rescheduleReason || ''} 
                  onChange={handleRescheduleChange}
                  rows="2"
                  placeholder="Optional: Provide a reason for rescheduling"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn outline" onClick={() => setShowRescheduleModal(false)}>Cancel</button>
              <button className="btn primary" onClick={rescheduleAppointment}>Confirm Reschedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;