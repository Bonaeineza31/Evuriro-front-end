import React from 'react';
import '../styles/dashboard.css'; // Create this CSS file

const Dashboard = ({ language }) => {
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
      viewAll: 'View All'
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
      viewAll: 'Voir Tout'
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
      viewAll: 'Reba Byose'
    }
  };

  // Default to English if language not available
  const text = content[language] || content.english;

  // Mock data - in a real app, this would come from an API
  const mockVitals = {
    heartRate: 72,
    bloodPressure: '120/80',
    temperature: 36.6,
    oxygenLevel: 98,
    weight: 70.5
  };

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

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>{text.welcome}</h1>
      </header>
      
      <div className="dashboard-grid">
        {/* Health summary section */}
        <section className="dashboard-card health-summary">
          <h2>{text.summary}</h2>
          <div className="vitals-grid">
            <div className="vital-item">
              <div className="vital-icon heart-rate-icon"></div>
              <div className="vital-info">
                <span className="vital-name">{text.heartRate}</span>
                <span className="vital-value">{mockVitals.heartRate} {text.bpm}</span>
              </div>
            </div>
            <div className="vital-item">
              <div className="vital-icon blood-pressure-icon"></div>
              <div className="vital-info">
                <span className="vital-name">{text.bloodPressure}</span>
                <span className="vital-value">{mockVitals.bloodPressure} {text.mmHg}</span>
              </div>
            </div>
            <div className="vital-item">
              <div className="vital-icon temperature-icon"></div>
              <div className="vital-info">
                <span className="vital-name">{text.temperature}</span>
                <span className="vital-value">{mockVitals.temperature} {text.celsius}</span>
              </div>
            </div>
            <div className="vital-item">
              <div className="vital-icon oxygen-icon"></div>
              <div className="vital-info">
                <span className="vital-name">{text.oxygenLevel}</span>
                <span className="vital-value">{mockVitals.oxygenLevel}{text.percentage}</span>
              </div>
            </div>
            <div className="vital-item">
              <div className="vital-icon weight-icon"></div>
              <div className="vital-info">
                <span className="vital-name">{text.weight}</span>
                <span className="vital-value">{mockVitals.weight} {text.kg}</span>
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
                  <div className="appointment-icon"></div>
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
            <button className="action-btn schedule-btn">
              <div className="action-icon schedule-icon"></div>
              <span>{text.scheduleBtn}</span>
            </button>
            <button className="action-btn teleconsult-btn">
              <div className="action-icon teleconsult-icon"></div>
              <span>{text.teleconsultBtn}</span>
            </button>
            <button className="action-btn upload-btn">
              <div className="action-icon upload-icon"></div>
              <span>{text.uploadBtn}</span>
            </button>
            <button className="action-btn hospital-btn">
              <div className="action-icon hospital-icon"></div>
              <span>{text.findHospitalBtn}</span>
            </button>
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
  );
};

export default Dashboard;