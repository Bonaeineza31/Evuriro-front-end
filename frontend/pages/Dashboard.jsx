import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import { 
  Calendar, 
  Clock, 
  Heart, 
  Activity, 
  Thermometer, 
  Droplet, 
  User, 
  FileText, 
  Upload, 
  Phone, 
  MapPin, 
  Plus 
} from 'lucide-react';

const Dashboard = ({ user }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [vitals, setVitals] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    temperature: 36.6,
    oxygenLevel: 98,
    weight: 70.5
  });

  // Get first name for personalized greeting
  const firstName = user?.name?.split(' ')[0] || 'User';
  const lastName = user?.name?.split(' ')[1] || '';

  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode') === 'true';
    
    setIsDarkMode(savedMode || prefersDark);
    
    document.body.setAttribute('data-theme', savedMode || prefersDark ? 'dark' : 'light');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.setAttribute('data-theme', newMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', newMode);
  };

  const appointments = [
    {
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '25/03/2025',
      time: '10:00 AM',
      type: 'in-person'
    },
    {
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: '05/04/2025',
      time: '2:30 PM',
      type: 'teleconsultation'
    }
  ];

  const recentActivity = [
    {
      action: 'Took blood pressure medication',
      time: '2 hours ago'
    },
    {
      action: 'Booked appointment with Dr. Johnson',
      time: 'Yesterday'
    },
    {
      action: 'Completed teleconsultation with Dr. Smith',
      time: '3 days ago'
    }
  ];

  // Mock data for health trends chart
  const healthTrends = [65, 59, 80, 81, 56, 55, 72];

  const updateVital = (key, value) => {
    setVitals({
      ...vitals,
      [key]: value
    });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <Heart className="logo-icon" />
          <span>Evuriro</span>
        </div>
        <div className="search-bar">
          <input type="search" placeholder="Search..." />
          <button className="search-button">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        <nav className="main-nav">
          <Link to="/dashboard" className="active">Dashboard</Link>
          <Link to="/teleconsultation">Teleconsultation</Link>
          <Link to="/records">Records</Link>
          <Link to="/hospitals">Nearby Hospitals</Link>
          <Link to="/doctors">Find a Doctor</Link>
        </nav>
        <div className="header-actions">
          <button className="icon-button notification-button">
            <div className="notification-badge">2</div>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <button className="icon-button">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </button>
          <div className="user-profile">
            <div className="avatar">
              {lastName.charAt(0) || 'U'}
            </div>
            <div className="language-selector">
              <button className="language-button active">EN</button>
              <button className="language-button">FR</button>
              <button className="language-button">KIN</button>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <Link to="/dashboard" className="sidebar-item active">
              <div className="sidebar-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
              <span>Dashboard</span>
            </Link>
            <Link to="/appointments" className="sidebar-item">
              <div className="sidebar-icon">
                <Calendar size={20} />
              </div>
              <span>Appointments</span>
            </Link>
            <Link to="/teleconsultation" className="sidebar-item">
              <div className="sidebar-icon">
                <Phone size={20} />
              </div>
              <span>Teleconsultation</span>
            </Link>
            <Link to="/records" className="sidebar-item">
              <div className="sidebar-icon">
                <FileText size={20} />
              </div>
              <span>Medical Records</span>
            </Link>
            <Link to="/hospitals" className="sidebar-item">
              <div className="sidebar-icon">
                <MapPin size={20} />
              </div>
              <span>Nearby Hospitals</span>
            </Link>
            <Link to="/devices" className="sidebar-item">
              <div className="sidebar-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M12 12h.01" />
                </svg>
              </div>
              <span>Connect Device</span>
            </Link>
          </nav>
          <div className="sidebar-footer">
            <Link to="/settings" className="sidebar-item">
              <div className="sidebar-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <span>Settings</span>
            </Link>
            <Link to="/help" className="sidebar-item">
              <div className="sidebar-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <span>Help Center</span>
            </Link>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
              <div className="sidebar-icon">
                {isDarkMode ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </div>
              <span>Dark Mode</span>
            </button>
          </div>
        </aside>

        <main className="main-content">
          <div className="page-header">
            <h1>Welcome to Evuriro Health, <span className="highlight">{firstName}</span></h1>
            <p className="subtitle">Your health journey at a glance</p>
          </div>

          <div className="dashboard-grid">
            <section className="grid-item health-summary">
              <div className="section-header">
                <h2>Health Summary</h2>
                <span className="label">Last updated: Today</span>
              </div>
              <div className="vitals-grid">
                <div className="vital-card">
                  <div className="vital-icon heart-rate">
                    <Heart size={24} />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Heart Rate</span>
                    <span className="vital-value">{vitals.heartRate} <span className="unit">bpm</span></span>
                  </div>
                  <div className="vital-status normal"></div>
                </div>
                <div className="vital-card">
                  <div className="vital-icon blood-pressure">
                    <Activity size={24} />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Blood Pressure</span>
                    <span className="vital-value">{vitals.bloodPressure} <span className="unit">mmHg</span></span>
                  </div>
                  <div className="vital-status normal"></div>
                </div>
                <div className="vital-card">
                  <div className="vital-icon temperature">
                    <Thermometer size={24} />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Temperature</span>
                    <span className="vital-value">{vitals.temperature} <span className="unit">°C</span></span>
                  </div>
                  <div className="vital-status normal"></div>
                </div>
                <div className="vital-card">
                  <div className="vital-icon oxygen">
                    <Droplet size={24} />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Oxygen Level</span>
                    <span className="vital-value">{vitals.oxygenLevel}<span className="unit">%</span></span>
                  </div>
                  <div className="vital-status normal"></div>
                </div>
                <div className="vital-card">
                  <div className="vital-icon weight">
                    <User size={24} />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Weight</span>
                    <span className="vital-value">{vitals.weight} <span className="unit">kg</span></span>
                  </div>
                  <div className="vital-status normal"></div>
                </div>
              </div>
              <div className="vitals-actions">
                <button className="button primary">Update Vitals</button>
                <button className="button secondary">Connect Device</button>
              </div>
              <div className="trend-chart-container">
                <div className="chart-header">
                  <h3>Health Trends</h3>
                  <div className="chart-period">
                    <button className="period-button active">Week</button>
                    <button className="period-button">Month</button>
                    <button className="period-button">Year</button>
                  </div>
                </div>
                <div className="trend-chart">
                  <svg viewBox="0 0 300 100" className="chart">
                    <polyline
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      points={
                        healthTrends.map((value, index) => 
                          `${index * (300 / (healthTrends.length - 1))},${100 - value}`
                        ).join(' ')
                      }
                    />
                    {healthTrends.map((value, index) => (
                      <circle
                        key={index}
                        cx={index * (300 / (healthTrends.length - 1))}
                        cy={100 - value}
                        r="3"
                        fill="var(--color-primary)"
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </section>

            <section className="grid-item appointments">
              <div className="section-header">
                <h2>Upcoming Appointments</h2>
                <Link to="/appointments" className="view-all">View All</Link>
              </div>
              <div className="appointments-list">
                {appointments.map((appointment, index) => (
                  <div className="appointment-card" key={index}>
                    <div className="appointment-header">
                      <h3>{appointment.doctor}</h3>
                      <span className={`appointment-type ${appointment.type}`}>
                        {appointment.type === 'teleconsultation' ? 'Teleconsultation' : 'In-person'}
                      </span>
                    </div>
                    <div className="appointment-specialty">{appointment.specialty}</div>
                    <div className="appointment-time">
                      <div className="appointment-date">
                        <Calendar size={16} />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="appointment-hour">
                        <Clock size={16} />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    <div className="appointment-actions">
                      <button className="button text">Reschedule</button>
                      <button className="button text destructive">Cancel</button>
                    </div>
                  </div>
                ))}
                <button className="new-appointment-button">
                  <Plus size={16} />
                  <span>Book New Appointment</span>
                </button>
              </div>
            </section>

            <section className="grid-item quick-actions">
              <div className="section-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="actions-grid">
                <Link to="/appointments/schedule" className="action-card">
                  <div className="action-icon">
                    <Calendar size={24} />
                  </div>
                  <span>Schedule Appointment</span>
                </Link>
                <Link to="/teleconsultation/start" className="action-card">
                  <div className="action-icon">
                    <Phone size={24} />
                  </div>
                  <span>Start Teleconsultation</span>
                </Link>
                <Link to="/records/upload" className="action-card">
                  <div className="action-icon">
                    <Upload size={24} />
                  </div>
                  <span>Upload Records</span>
                </Link>
                <Link to="/hospitals/find" className="action-card">
                  <div className="action-icon">
                    <MapPin size={24} />
                  </div>
                  <span>Find Hospital</span>
                </Link>
              </div>
            </section>

            <section className="grid-item recent-activity">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <Link to="/activity" className="view-all">View All</Link>
              </div>
              <div className="activity-list">
                {recentActivity.map((activity, index) => (
                  <div className="activity-item" key={index}>
                    <div className="activity-icon"></div>
                    <div className="activity-details">
                      <div className="activity-text">{activity.action}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <div className="weather-widget">
        <div className="weather-temp">19°C</div>
        <div className="weather-condition">Clear</div>
      </div>
    </div>
  );
};

export default Dashboard;