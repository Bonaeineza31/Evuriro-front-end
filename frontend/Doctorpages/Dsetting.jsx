import React, { useState, useEffect } from 'react';
import './DoctorSettings.css';

const DoctorSettings = () => {
  // State for all settings
  const [profile, setProfile] = useState({
    firstName: 'James',
    lastName: 'Wilson',
    title: 'Dr.',
    specialization: 'Cardiology',
    licenseNumber: 'MD12345',
    email: 'dr.wilson@evriro.com',
    phone: '+250 789 123 456',
    availableForNewPatients: true,
    consultationFee: 120,
    biography: 'Board-certified cardiologist with 15 years of experience specializing in preventive cardiology and heart failure management.'
  });
  
  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    patientMessages: true,
    systemUpdates: true,
    emergencyAlerts: true,
    newPatientRequests: true,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true
  });
  
  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '10:00', end: '14:00' },
    sunday: { enabled: false, start: '10:00', end: '14:00' },
    appointmentDuration: 30,
    bufferTime: 10,
    maxDailyAppointments: 20
  });
  
  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    allowBiometricLogin: true,
    lastPasswordChange: '2025-01-15'
  });
  
  const [preferences, setPreferences] = useState({
    language: 'English',
    theme: 'light',
    teleconsultPlatform: 'integrated',
    defaultView: 'appointments',
    recordsPerPage: 10,
    autoSaveInterval: 5
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState('profile');
  
  // Success message state
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = (e, formType) => {
    e.preventDefault();
    console.log(`Saving ${formType} settings:`, 
      formType === 'profile' ? profile : 
      formType === 'notifications' ? notifications :
      formType === 'availability' ? availability :
      formType === 'security' ? security : preferences
    );
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Handle profile changes
  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle notification changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({
      ...notifications,
      [name]: checked
    });
  };

  // Handle availability changes
  const handleAvailabilityChange = (e, day) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setAvailability({
        ...availability,
        [day]: {
          ...availability[day],
          enabled: checked
        }
      });
    } else if (name === 'appointmentDuration' || name === 'bufferTime' || name === 'maxDailyAppointments') {
      setAvailability({
        ...availability,
        [name]: parseInt(value)
      });
    } else {
      setAvailability({
        ...availability,
        [day]: {
          ...availability[day],
          [name]: value
        }
      });
    }
  };

  // Handle security changes
  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurity({
      ...security,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle preferences changes
  const handlePreferencesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseInt(value) : value
    });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
    
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    // Password change logic would go here
    console.log("Password change requested", { oldPassword, newPassword });
    
    // Update last password change date
    setSecurity({
      ...security,
      lastPasswordChange: new Date().toISOString().split('T')[0]
    });
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Reset form
    e.target.reset();
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = preferences.theme === 'light' ? 'dark' : 'light';
    setPreferences({
      ...preferences,
      theme: newTheme
    });
    document.body.classList.toggle('dark-mode');
  };

  // Effect to sync theme with system preference
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      setPreferences(prev => ({
        ...prev,
        theme: 'dark'
      }));
    }
  }, []);

  return (
    <div className="doctor-settings">
      <h1>Settings</h1>
      
      {showSuccess && (
        <div className="success-message">
          Settings saved successfully!
        </div>
      )}
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <ul>
            <li 
              className={activeTab === 'profile' ? 'active' : ''} 
              onClick={() => setActiveTab('profile')}
            >
              <i className="icon-user"></i> Profile
            </li>
            <li 
              className={activeTab === 'notifications' ? 'active' : ''} 
              onClick={() => setActiveTab('notifications')}
            >
              <i className="icon-bell"></i> Notifications
            </li>
            <li 
              className={activeTab === 'availability' ? 'active' : ''} 
              onClick={() => setActiveTab('availability')}
            >
              <i className="icon-calendar"></i> Availability
            </li>
            <li 
              className={activeTab === 'security' ? 'active' : ''} 
              onClick={() => setActiveTab('security')}
            >
              <i className="icon-lock"></i> Security
            </li>
            <li 
              className={activeTab === 'preferences' ? 'active' : ''} 
              onClick={() => setActiveTab('preferences')}
            >
              <i className="icon-settings"></i> Preferences
            </li>
          </ul>
        </div>
        
        <div className="settings-content">
          {activeTab === 'profile' && (
            <form onSubmit={(e) => handleSubmit(e, 'profile')}>
              <h2>Profile Settings</h2>
              
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <select 
                  id="title" 
                  name="title" 
                  value={profile.title}
                  onChange={handleProfileChange}
                >
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                  <option value="Assoc. Prof.">Assoc. Prof.</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={profile.firstName}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={profile.lastName}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="specialization">Specialization</label>
                <input 
                  type="text" 
                  id="specialization" 
                  name="specialization" 
                  value={profile.specialization}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="licenseNumber">License Number</label>
                <input 
                  type="text" 
                  id="licenseNumber" 
                  name="licenseNumber" 
                  value={profile.licenseNumber}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={profile.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={profile.phone}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="consultationFee">Consultation Fee ($)</label>
                <input 
                  type="number" 
                  id="consultationFee" 
                  name="consultationFee" 
                  value={profile.consultationFee}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="biography">Biography</label>
                <textarea 
                  id="biography" 
                  name="biography" 
                  value={profile.biography}
                  onChange={handleProfileChange}
                  rows="4"
                />
              </div>
              
              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="availableForNewPatients" 
                  name="availableForNewPatients" 
                  checked={profile.availableForNewPatients}
                  onChange={handleProfileChange}
                />
                <label htmlFor="availableForNewPatients">Available for new patients</label>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          )}
          
          {activeTab === 'notifications' && (
            <form onSubmit={(e) => handleSubmit(e, 'notifications')}>
              <h2>Notification Settings</h2>
              
              <div className="form-section">
                <h3>Notification Types</h3>
                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="appointmentReminders" 
                    name="appointmentReminders" 
                    checked={notifications.appointmentReminders}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="appointmentReminders">Appointment Reminders</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="patientMessages" 
                    name="patientMessages" 
                    checked={notifications.patientMessages}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="patientMessages">Patient Messages</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="systemUpdates" 
                    name="systemUpdates" 
                    checked={notifications.systemUpdates}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="systemUpdates">System Updates</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="emergencyAlerts" 
                    name="emergencyAlerts" 
                    checked={notifications.emergencyAlerts}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="emergencyAlerts">Emergency Alerts</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="newPatientRequests" 
                    name="newPatientRequests" 
                    checked={notifications.newPatientRequests}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="newPatientRequests">New Patient Requests</label>
                </div>
              </div>
              
              <div className="form-section">
                <h3>Notification Methods</h3>
                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="emailNotifications" 
                    name="emailNotifications" 
                    checked={notifications.emailNotifications}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="emailNotifications">Email</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="smsNotifications" 
                    name="smsNotifications" 
                    checked={notifications.smsNotifications}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="smsNotifications">SMS</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="pushNotifications" 
                    name="pushNotifications" 
                    checked={notifications.pushNotifications}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="pushNotifications">Push Notifications</label>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          )}
          
          {activeTab === 'availability' && (
            <form onSubmit={(e) => handleSubmit(e, 'availability')}>
              <h2>Availability Settings</h2>
              
              <div className="form-section">
                <h3>Weekly Schedule</h3>
                
                <div className="schedule-grid">
                  <div className="schedule-day">
                    <div className="day-header">
                      <input 
                        type="checkbox" 
                        id="monday-enabled" 
                        checked={availability.monday.enabled}
                        onChange={(e) => handleAvailabilityChange(e, 'monday')}
                      />
                      <label htmlFor="monday-enabled">Monday</label>
                    </div>
                    <div className="day-hours">
                      <div className="time-input">
                        <label>Start:</label>
                        <input 
                          type="time" 
                          name="start" 
                          value={availability.monday.start}
                          onChange={(e) => handleAvailabilityChange(e, 'monday')}
                          disabled={!availability.monday.enabled}
                        />
                      </div>
                      <div className="time-input">
                        <label>End:</label>
                        <input 
                          type="time" 
                          name="end" 
                          value={availability.monday.end}
                          onChange={(e) => handleAvailabilityChange(e, 'monday')}
                          disabled={!availability.monday.enabled}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="schedule-day">
                    <div className="day-header">
                      <input 
                        type="checkbox" 
                        id="tuesday-enabled" 
                        checked={availability.tuesday.enabled}
                        onChange={(e) => handleAvailabilityChange(e, 'tuesday')}
                      />
                      <label htmlFor="tuesday-enabled">Tuesday</label>
                    </div>
                    <div className="day-hours">
                      <div className="time-input">
                        <label>Start:</label>
                        <input 
                          type="time" 
                          name="start" 
                          value={availability.tuesday.start}
                          onChange={(e) => handleAvailabilityChange(e, 'tuesday')}
                          disabled={!availability.tuesday.enabled}
                        />
                      </div>
                      <div className="time-input">
                        <label>End:</label>
                        <input 
                          type="time" 
                          name="end" 
                          value={availability.tuesday.end}
                          onChange={(e) => handleAvailabilityChange(e, 'tuesday')}
                          disabled={!availability.tuesday.enabled}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="schedule-day">
                    <div className="day-header">
                      <input 
                        type="checkbox" 
                        id="wednesday-enabled" 
                        checked={availability.wednesday.enabled}
                        onChange={(e) => handleAvailabilityChange(e, 'wednesday')}
                      />
                      <label htmlFor="wednesday-enabled">Wednesday</label>
                    </div>
                    <div className="day-hours">
                      <div className="time-input">
                        <label>Start:</label>
                        <input 
                          type="time" 
                          name="start" 
                          value={availability.wednesday.start}
                          onChange={(e) => handleAvailabilityChange(e, 'wednesday')}
                          disabled={!availability.wednesday.enabled}
                        />
                      </div>
                      <div className="time-input">
                        <label>End:</label>
                        <input 
                          type="time" 
                          name="end" 
                          value={availability.wednesday.end}
                          onChange={(e) => handleAvailabilityChange(e, 'wednesday')}
                          disabled={!availability.wednesday.enabled}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="schedule-day">
                    <div className="day-header">
                      <input 
                        type="checkbox" 
                        id="thursday-enabled" 
                        checked={availability.thursday.enabled}
                        onChange={(e) => handleAvailabilityChange(e, 'thursday')}
                      />
                      <label htmlFor="thursday-enabled">Thursday</label>
                    </div>
                    <div className="day-hours">
                      <div className="time-input">
                        <label>Start:</label>
                        <input 
                          type="time" 
                          name="start" 
                          value={availability.thursday.start}
                          onChange={(e) => handleAvailabilityChange(e, 'thursday')}
                          disabled={!availability.thursday.enabled}
                        />
                      </div>
                      <div className="time-input">
                        <label>End:</label>
                        <input 
                          type="time" 
                          name="end" 
                          value={availability.thursday.end}
                          onChange={(e) => handleAvailabilityChange(e, 'thursday')}
                          disabled={!availability.thursday.enabled}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="schedule-day">
                    <div className="day-header">
                      <input 
                        type="checkbox" 
                        id="friday-enabled" 
                        checked={availability.friday.enabled}
                        onChange={(e) => handleAvailabilityChange(e, 'friday')}
                      />
                      <label htmlFor="friday-enabled">Friday</label>
                    </div>
                    <div className="day-hours">
                      <div className="time-input">
                        <label>Start:</label>
                        <input 
                          type="time" 
                          name="start" 
                          value={availability.friday.start}
                          onChange={(e) => handleAvailabilityChange(e, 'friday')}
                          disabled={!availability.friday.enabled}
                        />
                      </div>
                      <div className="time-input">
                        <label>End:</label>
                        <input 
                          type="time" 
                          name="end" 
                          value={availability.friday.end}
                          onChange={(e) => handleAvailabilityChange(e, 'friday')}
                          disabled={!availability.friday.enabled}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="schedule-day">
                    <div className="day-header">
                      <input 
                        type="checkbox" 
                        id="saturday-enabled" 
                        checked={availability.saturday.enabled}
                        onChange={(e) => handleAvailabilityChange(e, 'saturday')}
                      />
                      <label htmlFor="saturday-enabled">Saturday</label>
                    </div>
                    <div className="day-hours">
                      <div className="time-input">
                        <label>Start:</label>
                        <input 
                          type="time" 
                          name="start" 
                          value={availability.saturday.start}
                          onChange={(e) => handleAvailabilityChange(e, 'saturday')}
                          disabled={!availability.saturday.enabled}
                        />
                      </div>
                      <div className="time-input">
                        <label>End:</label>
                        <input 
                          type="time" 
                          name="end" 
                          value={availability.saturday.end}
                          onChange={(e) => handleAvailabilityChange(e, 'saturday')}
                          disabled={!availability.saturday.enabled}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="schedule-day">
                    <div className="day-header">
                      <input 
                        type="checkbox" 
                        id="sunday-enabled" 
                        checked={availability.sunday.enabled}
                        onChange={(e) => handleAvailabilityChange(e, 'sunday')}
                      />
                      <label htmlFor="sunday-enabled">Sunday</label>
                    </div>
                    <div className="day-hours">
                      <div className="time-input">
                        <label>Start:</label>
                        <input 
                          type="time" 
                          name="start" 
                          value={availability.sunday.start}
                          onChange={(e) => handleAvailabilityChange(e, 'sunday')}
                          disabled={!availability.sunday.enabled}
                        />
                      </div>
                      <div className="time-input">
                        <label>End:</label>
                        <input 
                          type="time" 
                          name="end" 
                          value={availability.sunday.end}
                          onChange={(e) => handleAvailabilityChange(e, 'sunday')}
                          disabled={!availability.sunday.enabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h3>Appointment Settings</h3>
                
                <div className="form-group">
                  <label htmlFor="appointmentDuration">Appointment Duration (minutes)</label>
                  <input 
                    type="number" 
                    id="appointmentDuration" 
                    name="appointmentDuration" 
                    value={availability.appointmentDuration}
                    onChange={(e) => handleAvailabilityChange(e)}
                    min="5"
                    step="5"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="bufferTime">Buffer Time Between Appointments (minutes)</label>
                  <input 
                    type="number" 
                    id="bufferTime" 
                    name="bufferTime" 
                    value={availability.bufferTime}
                    onChange={(e) => handleAvailabilityChange(e)}
                    min="0"
                    step="5"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="maxDailyAppointments">Maximum Daily Appointments</label>
                  <input 
                    type="number" 
                    id="maxDailyAppointments" 
                    name="maxDailyAppointments" 
                    value={availability.maxDailyAppointments}
                    onChange={(e) => handleAvailabilityChange(e)}
                    min="1"
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          )}
          
          {activeTab === 'security' && (
            <div>
              <h2>Security Settings</h2>
              
              <form onSubmit={(e) => handleSubmit(e, 'security')}>
                <div className="form-section">
                  <h3>Account Security</h3>
                  
                  <div className="form-group checkbox-group">
                    <input 
                      type="checkbox" 
                      id="twoFactorAuth" 
                      name="twoFactorAuth" 
                      checked={security.twoFactorAuth}
                      onChange={handleSecurityChange}
                    />
                    <label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</label>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="sessionTimeout">Session Timeout (minutes)</label>
                    <input 
                      type="number" 
                      id="sessionTimeout" 
                      name="sessionTimeout" 
                      value={security.sessionTimeout}
                      onChange={handleSecurityChange}
                      min="5"
                      max="120"
                    />
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <input 
                      type="checkbox" 
                      id="allowBiometricLogin" 
                      name="allowBiometricLogin" 
                      checked={security.allowBiometricLogin}
                      onChange={handleSecurityChange}
                    />
                    <label htmlFor="allowBiometricLogin">Allow Biometric Login</label>
                  </div>
                </div>
                
                <div className="form-section">
                  <p>Last password change: {security.lastPasswordChange}</p>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn-primary">Save Changes</button>
                </div>
              </form>
              
              <div className="form-section">
                <h3>Change Password</h3>
                
                <form onSubmit={handlePasswordChange}>
                  <div className="form-group">
                    <label htmlFor="oldPassword">Current Password</label>
                    <input 
                      type="password" 
                      id="oldPassword" 
                      name="oldPassword" 
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input 
                      type="password" 
                      id="newPassword" 
                      name="newPassword" 
                      required
                      minLength="8"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      required
                      minLength="8"
                    />
                  </div>
                  
                  <div className="password-requirements">
                    <p>Password must:</p>
                    <ul>
                      <li>Be at least 8 characters long</li>
                      <li>Include at least one uppercase letter</li>
                      <li>Include at least one number</li>
                      <li>Include at least one special character</li>
                    </ul>
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" className="btn-secondary">Change Password</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {activeTab === 'preferences' && (
            <form onSubmit={(e) => handleSubmit(e, 'preferences')}>
              <h2>User Preferences</h2>
              
              <div className="form-section">
                <h3>Application Settings</h3>
                
                <div className="form-group">
                  <label htmlFor="language">Language</label>
                  <select 
                    id="language" 
                    name="language" 
                    value={preferences.language}
                    onChange={handlePreferencesChange}
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Kinyarwanda">Kinyarwanda</option>
                  </select>
                </div>
                
                <div className="form-group theme-toggle">
                  <span>Theme:</span>
                  <button 
                    type="button" 
                    className={`theme-btn ${preferences.theme === 'light' ? 'active' : ''}`}
                    onClick={() => setPreferences({...preferences, theme: 'light'})}
                  >
                    Light
                  </button>