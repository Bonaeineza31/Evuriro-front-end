import React, { useState } from 'react';
import '../styles/dashboard.css';
import { Link } from "react-router-dom"
import UploadRecords from './UploadRecords';
import Appointment from './Appointments';

// Icons for vitals and actions
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

const WeightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 18h12M6 6h12M6 12h12"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
    <line x1="16" x2="16" y1="2" y2="6"></line>
    <line x1="8" x2="8" y1="2" y2="6"></line>
    <line x1="3" x2="21" y1="10" y2="10"></line>
  </svg>
);

const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 8-6 4 6 4V8Z"></path>
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" x2="12" y1="3" y2="15"></line>
  </svg>
);

const HospitalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
  </svg>
);

const Dashboard = ({ language }) => {
  // Add state for vitals
  const [vitals, setVitals] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    temperature: 36.6,
    oxygenLevel: 98,
    weight: 70.5
  });

  // Add state for showing update vitals modal
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [activeTrend, setActiveTrend] = useState('week');

  // Language texts
  const content = {
    english: {
      welcome: 'Welcome to Evuriro Health Dashboard',
      summary: 'Health Summary',
      appointments: 'Upcoming Appointments',
      vitals: 'Latest Vitals',
      quickActions: 'Quick Actions',
      scheduleBtn: 'Schedule Appointment',
      teleconsultBtn: 'Start Teleconsultation',
      uploadBtn: 'Upload Records',
      findHospitalBtn: 'Find Hospital',
      recentActivity: 'Recent Activity',
      heartRate: 'Heart Rate',
      bloodPressure: 'Blood Pressure',
      temperature: 'Temperature',
      oxygenLevel: 'Oxygen Level',
      weight: 'Weight',
      bpm: 'bpm',
      mmHg: 'mmHg',
      celsius: '°C',
      percentage: '%',
      kg: 'kg',
      noAppointments: 'No upcoming appointments',
      bookNow: 'Book Now',
      viewAll: 'View All',
      updateVitals: 'Update Vitals',
      connectDevice: 'Connect Device',
      history: 'History',
      week: 'Week',
      month: 'Month',
      year: 'Year',
      save: 'Save',
      cancel: 'Cancel'
    },
    french: {
      welcome: 'Bienvenue sur le tableau de bord de santé Evuriro',
      summary: 'Résumé de Santé',
      appointments: 'Rendez-vous à venir',
      vitals: 'Constantes Vitales Récentes',
      quickActions: 'Actions Rapides',
      scheduleBtn: 'Planifier un Rendez-vous',
      teleconsultBtn: 'Démarrer une Téléconsultation',
      uploadBtn: 'Télécharger des Documents',
      findHospitalBtn: 'Trouver un Hôpital',
      recentActivity: 'Activité Récente',
      heartRate: 'Fréquence Cardiaque',
      bloodPressure: 'Tension Artérielle',
      temperature: 'Température',
      oxygenLevel: 'Niveau d\'Oxygène',
      weight: 'Poids',
      bpm: 'bpm',
      mmHg: 'mmHg',
      celsius: '°C',
      percentage: '%',
      kg: 'kg',
      noAppointments: 'Aucun rendez-vous à venir',
      bookNow: 'Réserver',
      viewAll: 'Voir Tout',
      updateVitals: 'Mettre à jour les constantes',
      connectDevice: 'Connecter un appareil',
      history: 'Historique',
      week: 'Semaine',
      month: 'Mois',
      year: 'Année',
      save: 'Sauvegarder',
      cancel: 'Annuler'
    },
    kinyarwanda: {
      welcome: 'Murakaza neza kuri Evuriro dashbord y\'ubuzima',
      summary: 'Incamake y\'Ubuzima',
      appointments: 'Gahunda zizaza',
      vitals: 'Ibipimo by\'ubuzima',
      quickActions: 'Ibikorwa byihuse',
      scheduleBtn: 'Gufata Gahunda',
      teleconsultBtn: 'Gutangira Isuzuma kure',
      uploadBtn: 'Kohereza Inyandiko',
      findHospitalBtn: 'Gushaka Ibitaro',
      recentActivity: 'Ibikorwa bya Vuba',
      heartRate: 'Umutima',
      bloodPressure: 'Umuvuduko w\'Amaraso',
      temperature: 'Ubushyuhe',
      oxygenLevel: 'Urugero rw\'Umwuka',
      weight: 'Ibiro',
      bpm: 'bpm',
      mmHg: 'mmHg',
      celsius: '°C',
      percentage: '%',
      kg: 'kg',
      noAppointments: 'Nta gahunda zizaza',
      bookNow: 'Fata Gahunda',
      viewAll: 'Reba Byose',
      updateVitals: 'Kuvugurura ibipimo',
      connectDevice: 'Guhuza ikintu',
      history: 'Amateka',
      week: 'Icyumweru',
      month: 'Ukwezi',
      year: 'Umwaka',
      save: 'Kubika',
      cancel: 'Guhagarika'
    }
  };

  // Default to English if language not available
  const text = content[language] || content.english;

  // Mock appointments data
  const mockAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2025-03-01',
      time: '10:00 AM',
      type: 'In-person'
    }
  ];

  // Mock activities data
  const mockActivities = [
    {
      id: 1,
      type: 'Medication',
      description: 'Took blood pressure medication',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'Appointment',
      description: 'Booked appointment with Dr. Johnson',
      time: 'Yesterday'
    },
    {
      id: 3,
      type: 'Teleconsult',
      description: 'Completed teleconsultation with Dr. Smith',
      time: '3 days ago'
    }
  ];

  // Handler for updating vitals
  const handleUpdateVitals = () => {
    setShowVitalsModal(true);
  };

  // Handler for saving vitals update
  const handleSaveVitals = (newVitals) => {
    setVitals(newVitals);
    setShowVitalsModal(false);
  };

  // Function to determine status for vital readings
  const getVitalStatus = (type, value) => {
    switch (type) {
      case 'heartRate':
        return value < 60 || value > 100 ? 'warning' : 'normal';
      case 'bloodPressure':
        const [systolic, diastolic] = value.split('/').map(Number);
        return (systolic > 140 || diastolic > 90) ? 'warning' : 'normal';
      case 'temperature':
        return value < 30 || value > 38.5 ? 'warning' : 'normal';
      case 'oxygenLevel':
        return value < 95 ? 'warning' : 'normal';
      default:
        return 'normal';
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>{text.welcome}</h1>
        </header>
        
        <div className="dashboard-grid">
          {/* Health summary section */}
          <section className="dashboard-card health-summary">
            <h2>{text.summary}</h2>
            <div className="vitals-grid">
              <div className="vital-item">
                <div className={`vital-status ${getVitalStatus('heartRate', vitals.heartRate)}`}></div>
                <div className="vital-icon">
                  <HeartIcon />
                </div>
                <div className="vital-info">
                  <span className="vital-name">{text.heartRate}</span>
                  <span className="vital-value">{vitals.heartRate} {text.bpm}</span>
                </div>
              </div>
              
              <div className="vital-item">
                <div className={`vital-status ${getVitalStatus('bloodPressure', vitals.bloodPressure)}`}></div>
                <div className="vital-icon">
                  <BloodPressureIcon />
                </div>
                <div className="vital-info">
                  <span className="vital-name">{text.bloodPressure}</span>
                  <span className="vital-value">{vitals.bloodPressure} {text.mmHg}</span>
                </div>
              </div>
              
              <div className="vital-item">
                <div className={`vital-status ${getVitalStatus('temperature', vitals.temperature)}`}></div>
                <div className="vital-icon">
                  <TemperatureIcon />
                </div>
                <div className="vital-info">
                  <span className="vital-name">{text.temperature}</span>
                  <span className="vital-value">{vitals.temperature} {text.celsius}</span>
                </div>
              </div>
              
              <div className="vital-item">
                <div className={`vital-status ${getVitalStatus('oxygenLevel', vitals.oxygenLevel)}`}></div>
                <div className="vital-icon">
                  <OxygenIcon />
                </div>
                <div className="vital-info">
                  <span className="vital-name">{text.oxygenLevel}</span>
                  <span className="vital-value">{vitals.oxygenLevel}{text.percentage}</span>
                </div>
              </div>
              
              <div className="vital-item">
                <div className="vital-status normal"></div>
                <div className="vital-icon">
                  <WeightIcon />
                </div>
                <div className="vital-info">
                  <span className="vital-name">{text.weight}</span>
                  <span className="vital-value">{vitals.weight} {text.kg}</span>
                </div>
              </div>
            </div>
            
            {/* Vital actions */}
            <div className="vital-actions">
              <button className="update-vitals-btn" onClick={handleUpdateVitals}>
                {text.updateVitals}
              </button>
             <Link to ="/connect-device" className="connect-device-btn">
                {text.connectDevice}
              </Link>
            </div>
            
            {/* Vital trends visualization */}
            <div className="vital-trends">
              <div className="trends-header">
                <h3>{text.history}</h3>
                <div className="trends-period-selector">
                  <button 
                    className={`period-btn ${activeTrend === 'week' ? 'active' : ''}`}
                    onClick={() => setActiveTrend('week')}
                  >
                    {text.week}
                  </button>
                  <button 
                    className={`period-btn ${activeTrend === 'month' ? 'active' : ''}`}
                    onClick={() => setActiveTrend('month')}
                  >
                    {text.month}
                  </button>
                  <button 
                    className={`period-btn ${activeTrend === 'year' ? 'active' : ''}`}
                    onClick={() => setActiveTrend('year')}
                  >
                    {text.year}
                  </button>
                </div>
              </div>
              <div className="trend-chart">
                <div className="chart-placeholder">
                  <div className="chart-line"></div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Upcoming appointments section */}
          <section className="dashboard-card appointments">
            <div className="card-header">
              <h2>{text.appointments}</h2>
              <button className="view-all-btn">{text.viewAll}</button>
            </div>
            
            <div className="appointment-list">
              {mockAppointments.length > 0 ? (
                mockAppointments.map(appointment => (
                  <div className="appointment-item" key={appointment.id}>
                    <div className="appointment-icon">
                      <CalendarIcon />
                    </div>
                    <div className="appointment-details">
                      <h3>{appointment.doctor}</h3>
                      <p>{appointment.specialty}</p>
                      <div className="appointment-time">
                        <span className="date">{new Date(appointment.date).toLocaleDateString()}</span>
                        <span className="time">{appointment.time}</span>
                        <span className="type">{appointment.type}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-appointments">
                  <p>{text.noAppointments}</p>
                  <button className="book-now-btn">{text.bookNow}</button>
                </div>
              )}
            </div>
          </section>
          
          {/* Quick actions section */}
          <section className="dashboard-card quick-actions">
            <h2>{text.quickActions}</h2>
            <div className="action-buttons">
              <Link to = "/appointments" className="action-btn schedule-btn">
                <Appointment />
                <span>{text.scheduleBtn}</span>
              </Link>
              <Link to = "/teleconsult" className="action-btn teleconsult-btn">
                <VideoIcon />
                <span>{text.teleconsultBtn}</span>
              </Link>
              <button className="action-btn upload-btn">
                <UploadRecords />
                <span>{text.uploadBtn}</span>
              </button>
              <Link to ="/hospitals" className="action-btn hospital-btn">
                <HospitalIcon />
                <span>{text.findHospitalBtn}</span>
              </Link>
            </div>
          </section>
          
          {/* Recent activity section */}
          <section className="dashboard-card recent-activity">
            <div className="card-header">
              <h2>{text.recentActivity}</h2>
              <button className="view-all-btn">{text.viewAll}</button>
            </div>
            
            <div className="activity-list">
              {mockActivities.map(activity => (
                <div className="activity-item" key={activity.id}>
                  <div className={`activity-icon ${activity.type.toLowerCase()}-icon`}></div>
                  <div className="activity-details">
                    <p className="activity-description">{activity.description}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      {/* Update Vitals Modal */}
      {showVitalsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{text.updateVitals}</h2>
            <div className="form-group">
              
              <label>{text.heartRate}</label>
              <input 
                type="number" 
                value={vitals.heartRate} 
                onChange={(e) => setVitals({...vitals, heartRate: Number(e.target.value)})}
              />
            </div>
            <div className="form-group">
              <label>{text.bloodPressure}</label>
              <input 
                type="text" 
                value={vitals.bloodPressure} 
                onChange={(e) => setVitals({...vitals, bloodPressure: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>{text.temperature}</label>
              <input 
                type="number" 
                step="0.1" 
                value={vitals.temperature} 
                onChange={(e) => setVitals({...vitals, temperature: Number(e.target.value)})}
              />
            </div>
            <div className="form-group">
              <label>{text.oxygenLevel}</label>
              <input 
                type="number" 
                value={vitals.oxygenLevel} 
                onChange={(e) => setVitals({...vitals, oxygenLevel: Number(e.target.value)})}
              />
            </div>
            <div className="form-group">
              <label>{text.weight}</label>
              <input 
                type="number" 
                step="0.1" 
                value={vitals.weight} 
                onChange={(e) => setVitals({...vitals, weight: Number(e.target.value)})}
              />
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowVitalsModal(false)}>
                {text.cancel}
              </button>
              <button className="save-btn" onClick={() => setShowVitalsModal(false)}>
                {text.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;