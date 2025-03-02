import React, { useState, useEffect } from 'react';
import '../styles/settings.css';

const Settings = () => {
  // User profile state
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    idNumber: 'ID12345678',
    address: '123 Main St',
    city: 'Metropolis',
    country: 'United States',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+0987654321'
    }
  });

  // App preferences state
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      sms: true,
      app: true,
      appointmentReminders: true,
      medicationReminders: true,
      resultUpdates: true
    },
    privacy: {
      shareDataWithProviders: true,
      allowResearchUse: false,
      showProfilePublicly: false
    },
    accessibility: {
      fontSize: 'medium',
      highContrast: false,
      screenReader: false
    }
  });

  // Handle profile updates
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile({
        ...profile,
        [parent]: {
          ...profile[parent],
          [child]: value
        }
      });
    } else {
      setProfile({
        ...profile,
        [name]: value
      });
    }
  };

  // Handle preferences updates
  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPreferences({
        ...preferences,
        [parent]: {
          ...preferences[parent],
          [child]: val
        }
      });
    } else {
      setPreferences({
        ...preferences,
        [name]: val
      });
    }
  };

  // Theme toggle handler
  const toggleTheme = () => {
    const newTheme = preferences.theme === 'light' ? 'dark' : 'light';
    setPreferences({
      ...preferences,
      theme: newTheme
    });
    // Apply theme to the entire application
    document.body.className = newTheme;
  };

  // Apply theme on component mount and theme changes
  useEffect(() => {
    document.body.className = preferences.theme;
  }, [preferences.theme]);

  // Save changes handler
  const saveChanges = () => {
    // Here you would send the updated profile and preferences to your backend
    console.log('Saving profile:', profile);
    console.log('Saving preferences:', preferences);
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h1>Account Settings</h1>
      
      <div className="settings-card">
        <h2>Personal Information</h2>
        <div className="form-group">
          <label>First Name</label>
          <input 
            type="text" 
            name="firstName" 
            value={profile.firstName} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input 
            type="text" 
            name="lastName" 
            value={profile.lastName} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={profile.email} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input 
            type="tel" 
            name="phone" 
            value={profile.phone} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input 
            type="date" 
            name="dateOfBirth" 
            value={profile.dateOfBirth} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select 
            name="gender" 
            value={profile.gender} 
            onChange={handleProfileChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div className="form-group">
          <label>ID Number</label>
          <input 
            type="text" 
            name="idNumber" 
            value={profile.idNumber} 
            onChange={handleProfileChange} 
          />
        </div>
      </div>

      <div className="settings-card">
        <h2>Address</h2>
        <div className="form-group">
          <label>Street Address</label>
          <input 
            type="text" 
            name="address" 
            value={profile.address} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input 
            type="text" 
            name="city" 
            value={profile.city} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input 
            type="text" 
            name="country" 
            value={profile.country} 
            onChange={handleProfileChange} 
          />
        </div>
      </div>

      <div className="settings-card">
        <h2>Emergency Contact</h2>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            name="emergencyContact.name" 
            value={profile.emergencyContact.name} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>Relationship</label>
          <input 
            type="text" 
            name="emergencyContact.relationship" 
            value={profile.emergencyContact.relationship} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input 
            type="tel" 
            name="emergencyContact.phone" 
            value={profile.emergencyContact.phone} 
            onChange={handleProfileChange} 
          />
        </div>
      </div>

      <div className="settings-card">
        <h2>Appearance</h2>
        <div className="form-group">
          <label>Theme</label>
          <div className="toggle-container">
            <span>Light</span>
            <div className={`toggle ${preferences.theme === 'dark' ? 'active' : ''}`} onClick={toggleTheme}>
              <div className="toggle-handle"></div>
            </div>
            <span>Dark</span>
          </div>
        </div>
        <div className="form-group">
          <label>Language</label>
          <select 
            name="language" 
            value={preferences.language} 
            onChange={handlePreferenceChange}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="kin">Kinyarwanda</option>
          </select>
        </div>
      </div>

      <div className="settings-card">
        <h2>Notification Preferences</h2>
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="email-notifications" 
            name="notifications.email" 
            checked={preferences.notifications.email} 
            onChange={handlePreferenceChange} 
          />
          <label htmlFor="email-notifications">Email Notifications</label>
        </div>
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="sms-notifications" 
            name="notifications.sms"
            checked={preferences.notifications.sms} 
            onChange={handlePreferenceChange} 
          />
          <label htmlFor="sms-notifications">SMS Notifications</label>
        </div>
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="app-notifications" 
            name="notifications.app" 
            checked={preferences.notifications.app} 
            onChange={handlePreferenceChange} 
          />
          <label htmlFor="app-notifications">App Notifications</label>
        </div>
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="appointment-reminders" 
            name="notifications.appointmentReminders" 
            checked={preferences.notifications.appointmentReminders} 
            onChange={handlePreferenceChange} 
          />
          <label htmlFor="appointment-reminders">Appointment Reminders</label>
        </div>
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="medication-reminders" 
            name="notifications.medicationReminders" 
            checked={preferences.notifications.medicationReminders} 
            onChange={handlePreferenceChange} 
          />
          <label htmlFor="medication-reminders">Medication Reminders</label>
        </div>
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="result-updates" 
            name="notifications.resultUpdates" 
            checked={preferences.notifications.resultUpdates} 
            onChange={handlePreferenceChange} 
          />
          <label htmlFor="result-updates">Test Result Updates</label>
        </div>
      </div>

      <div className="settings-card">
        <h2>Privacy Settings</h2>
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="share-data" 
            name="privacy.shareDataWithProviders" 
            checked={preferences.privacy.shareDataWithProviders} 
            onChange={handlePreferenceChange} 
          />
          <label htmlFor="share-data">Share data with healthcare providers</label>
        </div>
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="research-use" 
            name="privacy.allowResearchUse" 
            checked={preferences.privacy.allowResearchUse} 
            onChange={handlePreferenceChange} 
          />
          <label htmlFor="research-use">Allow anonymous data use for research</label>
        </div>
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="public-profile" 
            name="privacy.showProfilePublicly" 
            checked={preferences.privacy.showProfilePublicly} 
            onChange={handlePreferenceChange} 
          />
          <label htmlFor="public-profile">Show my profile to other users</label>
        </div>
      </div>

      <div className="settings-card">
        <h2>Accessibility</h2>
        <div className="form-group">
          <label>Font Size</label>
          <select 
            name="accessibility.fontSize" 
            value={preferences.accessibility.fontSize} 
            onChange={handlePreferenceChange}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="high-contrast" 
            name="accessibility.highContrast" 
            checked={preferences.accessibility.highContrast} 
            onChange={handlePreferenceChange} 
          />
          <label htmlFor="high-contrast">High Contrast Mode</label>
        </div>
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="screen-reader" 
            name="accessibility.screenReader" 
            checked={preferences.accessibility.screenReader} 
            onChange={handlePreferenceChange} 
          />
          <label htmlFor="screen-reader">Screen Reader Compatibility</label>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-cancel">Cancel</button>
        <button className="btn-save" onClick={saveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;