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

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'en';
    setPreferences(prev => ({
      ...prev,
      theme: savedTheme,
      language: savedLanguage
    }));
    document.body.className = savedTheme;
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = preferences.theme === 'light' ? 'dark' : 'light';
    setPreferences({
      ...preferences,
      theme: newTheme
    });
    // Apply theme to the entire application
    document.body.className = newTheme;
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
  };

  // Change language function
  const changeLanguage = (lang) => {
    setPreferences({
      ...preferences,
      language: lang
    });
    // Save to localStorage
    localStorage.setItem('language', lang);
  };

  // Save changes handler
  const saveChanges = () => {
    // Here you would send the updated profile and preferences to backend
    console.log('Saving profile:', profile);
    console.log('Saving preferences:', preferences);
    alert('Settings saved successfully!');
  };

  // Get translations based on selected language
  const getTranslation = (key) => {
    const translations = {
      'en': {
        'settings': 'Settings',
        'personalInfo': 'Personal Information',
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'email': 'Email',
        'phone': 'Phone Number',
        'dob': 'Date of Birth',
        'gender': 'Gender',
        'male': 'Male',
        'female': 'Female',
        'other': 'Other',
        'preferNotToSay': 'Prefer not to say',
        'idNumber': 'ID Number',
        'address': 'Address',
        'streetAddress': 'Street Address',
        'city': 'City',
        'country': 'Country',
        'emergencyContact': 'Emergency Contact',
        'name': 'Name',
        'relationship': 'Relationship',
        'appearance': 'Appearance',
        'theme': 'Theme',
        'light': 'Light',
        'dark': 'Dark',
        'language': 'Language',
        'notifications': 'Notification Preferences',
        'emailNotifications': 'Email Notifications',
        'smsNotifications': 'SMS Notifications',
        'appNotifications': 'App Notifications',
        'appointmentReminders': 'Appointment Reminders',
        'medicationReminders': 'Medication Reminders',
        'resultUpdates': 'Test Result Updates',
        'privacy': 'Privacy Settings',
        'shareData': 'Share data with healthcare providers',
        'researchUse': 'Allow anonymous data use for research',
        'publicProfile': 'Show my profile to other users',
        'accessibility': 'Accessibility',
        'fontSize': 'Font Size',
        'small': 'Small',
        'medium': 'Medium',
        'large': 'Large',
        'highContrast': 'High Contrast Mode',
        'screenReader': 'Screen Reader Compatibility',
        'cancel': 'Cancel',
        'save': 'Save Changes'
      },
      'fr': {
        'settings': 'Paramètres',
        'personalInfo': 'Informations Personnelles',
        'firstName': 'Prénom',
        'lastName': 'Nom de Famille',
        'email': 'E-mail',
        'phone': 'Numéro de Téléphone',
        'dob': 'Date de Naissance',
        'gender': 'Genre',
        'male': 'Homme',
        'female': 'Femme',
        'other': 'Autre',
        'preferNotToSay': 'Je préfère ne pas dire',
        'idNumber': 'Numéro d\'Identification',
        'address': 'Adresse',
        'streetAddress': 'Adresse',
        'city': 'Ville',
        'country': 'Pays',
        'emergencyContact': 'Contact d\'Urgence',
        'name': 'Nom',
        'relationship': 'Relation',
        'appearance': 'Apparence',
        'theme': 'Thème',
        'light': 'Clair',
        'dark': 'Sombre',
        'language': 'Langue',
        'notifications': 'Préférences de Notification',
        'emailNotifications': 'Notifications par E-mail',
        'smsNotifications': 'Notifications par SMS',
        'appNotifications': 'Notifications de l\'Application',
        'appointmentReminders': 'Rappels de Rendez-vous',
        'medicationReminders': 'Rappels de Médicaments',
        'resultUpdates': 'Mises à Jour des Résultats',
        'privacy': 'Paramètres de Confidentialité',
        'shareData': 'Partager les données avec les professionnels de santé',
        'researchUse': 'Autoriser l\'utilisation anonyme des données pour la recherche',
        'publicProfile': 'Montrer mon profil aux autres utilisateurs',
        'accessibility': 'Accessibilité',
        'fontSize': 'Taille de Police',
        'small': 'Petit',
        'medium': 'Moyen',
        'large': 'Grand',
        'highContrast': 'Mode Contraste Élevé',
        'screenReader': 'Compatibilité avec les Lecteurs d\'Écran',
        'cancel': 'Annuler',
        'save': 'Enregistrer les Modifications'
      },
      'kin': {
        'settings': 'Igenamiterere',
        'personalInfo': 'Amakuru Bwite',
        'firstName': 'Izina',
        'lastName': 'Irindi Zina',
        'email': 'Imeri',
        'phone': 'Telefoni',
        'dob': 'Itariki y\'Amavuko',
        'gender': 'Igitsina',
        'male': 'Gabo',
        'female': 'Gore',
        'other': 'Ikindi',
        'preferNotToSay': 'Sinkunda kubivuga',
        'idNumber': 'Nomero y\'Irangamuntu',
        'address': 'Aderesi',
        'streetAddress': 'Aho Utuye',
        'city': 'Umujyi',
        'country': 'Igihugu',
        'emergencyContact': 'Uwo Guhamagara mu Bihe Bikomeye',
        'name': 'Izina',
        'relationship': 'Isano',
        'appearance': 'Ishusho',
        'theme': 'Isura',
        'light': 'Cyera',
        'dark': 'Umukara',
        'language': 'Ururimi',
        'notifications': 'Ibyo Kumenyeshwa',
        'emailNotifications': 'Kumenyeshwa kuri Imeri',
        'smsNotifications': 'Kumenyeshwa kuri SMS',
        'appNotifications': 'Kumenyeshwa ku Porogaramu',
        'appointmentReminders': 'Urwibutso rw\'Igihe cyo Gusura Muganga',
        'medicationReminders': 'Urwibutso rwo Gufata Imiti',
        'resultUpdates': 'Amakuru y\'Ibisubizo',
        'privacy': 'Amabwiriza y\'Ibanga',
        'shareData': 'Gusangira amakuru n\'abaganga',
        'researchUse': 'Kwemerera gukoresha amakuru mu bushakashatsi',
        'publicProfile': 'Kwerekana umwirondoro wanjye ku bandi',
        'accessibility': 'Uburyo bwo Kugera ku Makuru',
        'fontSize': 'Ingano y\'Imyandiko',
        'small': 'Muto',
        'medium': 'Hagati',
        'large': 'Munini',
        'highContrast': 'Ishusho Igaragara Cyane',
        'screenReader': 'Ibifasha Abasomyi b\'Ishashho',
        'cancel': 'Kureka',
        'save': 'Kubika Impinduka'
      }
    };
    
    return translations[preferences.language][key] || key;
  };

  return (
    <div className={`settings-container2 ${preferences.theme}`}>
      <h1>{getTranslation('settings')}</h1>
      
      <div className="settings-card">
        <h2>{getTranslation('personalInfo')}</h2>
        <div className="form-group">
          <label>{getTranslation('firstName')}</label>
          <input 
            type="text" 
            name="firstName" 
            value={profile.firstName} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>{getTranslation('lastName')}</label>
          <input 
            type="text" 
            name="lastName" 
            value={profile.lastName} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>{getTranslation('email')}</label>
          <input 
            type="email" 
            name="email" 
            value={profile.email} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>{getTranslation('phone')}</label>
          <input 
            type="tel" 
            name="phone" 
            value={profile.phone} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>{getTranslation('dob')}</label>
          <input 
            type="date" 
            name="dateOfBirth" 
            value={profile.dateOfBirth} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>{getTranslation('gender')}</label>
          <select 
            name="gender" 
            value={profile.gender} 
            onChange={handleProfileChange}
          >
            <option value="Male">{getTranslation('male')}</option>
            <option value="Female">{getTranslation('female')}</option>
            <option value="Other">{getTranslation('other')}</option>
            <option value="Prefer not to say">{getTranslation('preferNotToSay')}</option>
          </select>
        </div>
        <div className="form-group">
          <label>{getTranslation('idNumber')}</label>
          <input 
            type="text" 
            name="idNumber" 
            value={profile.idNumber} 
            onChange={handleProfileChange} 
          />
        </div>
      </div>

      <div className="settings-card">
        <h2>{getTranslation('address')}</h2>
        <div className="form-group">
          <label>{getTranslation('streetAddress')}</label>
          <input 
            type="text" 
            name="address" 
            value={profile.address} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>{getTranslation('city')}</label>
          <input 
            type="text" 
            name="city" 
            value={profile.city} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>{getTranslation('country')}</label>
          <input 
            type="text" 
            name="country" 
            value={profile.country} 
            onChange={handleProfileChange} 
          />
        </div>
      </div>

      <div className="settings-card">
        <h2>{getTranslation('emergencyContact')}</h2>
        <div className="form-group">
          <label>{getTranslation('name')}</label>
          <input 
            type="text" 
            name="emergencyContact.name" 
            value={profile.emergencyContact.name} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>{getTranslation('relationship')}</label>
          <input 
            type="text" 
            name="emergencyContact.relationship" 
            value={profile.emergencyContact.relationship} 
            onChange={handleProfileChange} 
          />
        </div>
        <div className="form-group">
          <label>{getTranslation('phone')}</label>
          <input 
            type="tel" 
            name="emergencyContact.phone" 
            value={profile.emergencyContact.phone} 
            onChange={handleProfileChange} 
          />
        </div>
      </div>

      <div className="settings-card">
        <h2>{getTranslation('appearance')}</h2>
        <div className="form-group">
          <label>{getTranslation('theme')}</label>
          <div className="toggle-container">
            <span>{getTranslation('light')}</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={preferences.theme === 'dark'} 
                onChange={toggleTheme}
              />
              <span className="slider round"></span>
            </label>
            <span>{getTranslation('dark')}</span>
          </div>
        </div>
        <div className="form-group">
          <label>{getTranslation('language')}</label>
          <div className="language-selector">
            <button 
              className={`language-btn ${preferences.language === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
            >
              English
            </button>
            <button 
              className={`language-btn ${preferences.language === 'fr' ? 'active' : ''}`}
              onClick={() => changeLanguage('fr')}
            >
              Français
            </button>
            <button 
              className={`language-btn ${preferences.language === 'kin' ? 'active' : ''}`}
              onClick={() => changeLanguage('kin')}
            >
              Kinyarwanda
            </button>
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h2>{getTranslation('notifications')}</h2>
        <div className="form-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              name="notifications.email" 
              checked={preferences.notifications.email} 
              onChange={handlePreferenceChange} 
            />
            <span className="checkmark"></span>
            {getTranslation('emailNotifications')}
          </label>
        </div>
        <div className="form-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              name="notifications.sms" 
              checked={preferences.notifications.sms} 
              onChange={handlePreferenceChange} 
            />
            <span className="checkmark"></span>
            {getTranslation('smsNotifications')}
          </label>
        </div>
        <div className="form-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              name="notifications.app" 
              checked={preferences.notifications.app} 
              onChange={handlePreferenceChange} 
            />
            <span className="checkmark"></span>
            {getTranslation('appNotifications')}
          </label>
        </div>
        <div className="form-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              name="notifications.appointmentReminders" 
              checked={preferences.notifications.appointmentReminders} 
              onChange={handlePreferenceChange} 
            />
            <span className="checkmark"></span>
            {getTranslation('appointmentReminders')}
          </label>
        </div>
        <div className="form-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              name="notifications.medicationReminders" 
              checked={preferences.notifications.medicationReminders} 
              onChange={handlePreferenceChange} 
            />
            <span className="checkmark"></span>
            {getTranslation('medicationReminders')}
          </label>
        </div>
        <div className="form-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              name="notifications.resultUpdates" 
              checked={preferences.notifications.resultUpdates} 
              onChange={handlePreferenceChange} 
            />
            <span className="checkmark"></span>
            {getTranslation('resultUpdates')}
          </label>
        </div>
      </div>

      <div className="settings-card">
        <h2>{getTranslation('privacy')}</h2>
        <div className="form-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              name="privacy.shareDataWithProviders" 
              checked={preferences.privacy.shareDataWithProviders} 
              onChange={handlePreferenceChange} 
            />
            <span className="checkmark"></span>
            {getTranslation('shareData')}
          </label>
        </div>
        <div className="form-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              name="privacy.allowResearchUse" 
              checked={preferences.privacy.allowResearchUse} 
              onChange={handlePreferenceChange} 
            />
            <span className="checkmark"></span>
            {getTranslation('researchUse')}
          </label>
        </div>
        <div className="form-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              name="privacy.showProfilePublicly" 
              checked={preferences.privacy.showProfilePublicly} 
              onChange={handlePreferenceChange} 
            />
            <span className="checkmark"></span>
            {getTranslation('publicProfile')}
          </label>
        </div>
      </div>

      <div className="settings-card">
        <h2>{getTranslation('accessibility')}</h2>
        <div className="form-group">
          <label>{getTranslation('fontSize')}</label>
          <select 
            name="accessibility.fontSize" 
            value={preferences.accessibility.fontSize} 
            onChange={handlePreferenceChange}
          >
            <option value="small">{getTranslation('small')}</option>
            <option value="medium">{getTranslation('medium')}</option>
            <option value="large">{getTranslation('large')}</option>
          </select>
        </div>
        <div className="form-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              name="accessibility.highContrast" 
              checked={preferences.accessibility.highContrast} 
              onChange={handlePreferenceChange} 
            />
            <span className="checkmark"></span>
            {getTranslation('highContrast')}
          </label>
        </div>
        <div className="form-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              name="accessibility.screenReader" 
              checked={preferences.accessibility.screenReader} 
              onChange={handlePreferenceChange} 
            />
            <span className="checkmark"></span>
            {getTranslation('screenReader')}
          </label>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-cancel">{getTranslation('cancel')}</button>
        <button className="btn-save" onClick={saveChanges}>{getTranslation('save')}</button>
      </div>
    </div>
  );
};

export default Settings;