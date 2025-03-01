import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Appointments.css';
import sarah from "../images/Screenshot 2025-03-01 223549.png"
import chen from "../images/Screenshot 2025-03-01 223501.png"
import priya from "../images/Screenshot 2025-03-01 223641.png"
import james from "../images/Screenshot 2025-03-01 224911.png"
import emily from "../images/Screenshot 2025-03-01 224927.png"
import david from "../images/Screenshot 2025-03-01 224939.png"


const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'rw', name: 'Kinyarwanda' }
  ];
  
  // Translations object
  const translations = {
    en: {
      scheduleAppointment: 'Schedule an Appointment',
      findHealthcare: 'Find available healthcare professionals and book your next visit',
      searchPlaceholder: 'Search by doctor name or keywords',
      allSpecialties: 'All Specialties',
      inPerson: 'In-Person',
      virtual: 'Virtual',
      clearFilters: 'Clear Filters',
      noResults: 'No doctors found matching your criteria. Try adjusting your filters.',
      select: 'Select',
      backToSearch: 'Back to doctor search',
      virtualAppointment: 'Virtual Appointment',
      inPersonVisit: 'In-Person Visit',
      conflicts: 'Scheduling Conflicts',
      conflictsDesc: 'You already have the following appointment(s) on this date:',
      selectDate: 'Select Date',
      location: 'Location',
      checkAvailability: 'Check Availability',
      checkingAvailability: 'Checking availability...',
      selectTime: 'Select Time',
      reasonForVisit: 'Reason for Visit',
      reasonPlaceholder: 'Briefly describe your symptoms or reason for this appointment',
      insuranceProvider: 'Insurance Provider',
      insurancePlaceholder: 'e.g. Blue Cross Blue Shield',
      memberId: 'Member ID',
      memberIdPlaceholder: 'e.g. XYZ123456789',
      appointmentSummary: 'Appointment Summary',
      doctor: 'Doctor',
      specialty: 'Specialty',
      date: 'Date',
      time: 'Time',
      type: 'Type',
      notSelected: 'Not selected',
      processing: 'Processing...',
      confirmAppointment: 'Confirm Appointment',
      appointmentScheduled: 'Your appointment has been scheduled!',
      redirecting: 'Redirecting to dashboard...',
      successMessage: 'Your appointment with {doctorName} has been scheduled for {date} at {time}.'
    },
    fr: {
      scheduleAppointment: 'Planifier un rendez-vous',
      findHealthcare: 'Trouvez des professionnels de santé disponibles et réservez votre prochaine visite',
      searchPlaceholder: 'Rechercher par nom de médecin ou mots-clés',
      allSpecialties: 'Toutes les spécialités',
      inPerson: 'En personne',
      virtual: 'Virtuel',
      clearFilters: 'Effacer les filtres',
      noResults: 'Aucun médecin ne correspond à vos critères. Essayez de modifier vos filtres.',
      select: 'Sélectionner',
      backToSearch: 'Retour à la recherche de médecin',
      virtualAppointment: 'Rendez-vous virtuel',
      inPersonVisit: 'Visite en personne',
      conflicts: 'Conflits d\'horaire',
      conflictsDesc: 'Vous avez déjà le(s) rendez-vous suivant(s) à cette date:',
      selectDate: 'Sélectionner une date',
      location: 'Lieu',
      checkAvailability: 'Vérifier la disponibilité',
      checkingAvailability: 'Vérification de la disponibilité...',
      selectTime: 'Sélectionner l\'heure',
      reasonForVisit: 'Motif de la visite',
      reasonPlaceholder: 'Décrivez brièvement vos symptômes ou la raison de ce rendez-vous',
      insuranceProvider: 'Assureur',
      insurancePlaceholder: 'ex. Assurance Maladie',
      memberId: 'Numéro d\'adhérent',
      memberIdPlaceholder: 'ex. XYZ123456789',
      appointmentSummary: 'Résumé du rendez-vous',
      doctor: 'Docteur',
      specialty: 'Spécialité',
      date: 'Date',
      time: 'Heure',
      type: 'Type',
      notSelected: 'Non sélectionné',
      processing: 'Traitement en cours...',
      confirmAppointment: 'Confirmer le rendez-vous',
      appointmentScheduled: 'Votre rendez-vous a été planifié!',
      redirecting: 'Redirection vers le tableau de bord...',
      successMessage: 'Votre rendez-vous avec {doctorName} a été programmé pour le {date} à {time}.'
    },
    rw: {
      scheduleAppointment: 'Gufata Gahunda',
      findHealthcare: 'Shaka abaganga bahari maze ufate gahunda y\'ubutaha',
      searchPlaceholder: 'Shakisha izina ry\'umuganga cyangwa amagambo',
      allSpecialties: 'Impuguke zose',
      inPerson: 'Imbonankubone',
      virtual: 'Kuri interineti',
      clearFilters: 'Gusiba ibisahani',
      noResults: 'Nta muganga uhuye n\'ibyo ushaka. Gerageza guhindura ibisahani.',
      select: 'Hitamo',
      backToSearch: 'Garuka ku ishakiro ry\'abaganga',
      virtualAppointment: 'Gahunda kuri interineti',
      inPersonVisit: 'Gusura mu maso',
      conflicts: 'Amakimbirane y\'ingengabihe',
      conflictsDesc: 'Ufite gahunda zikurikira kuri iyi tariki:',
      selectDate: 'Hitamo itariki',
      location: 'Ahantu',
      checkAvailability: 'Reba ko bihari',
      checkingAvailability: 'Kureba ko bihari...',
      selectTime: 'Hitamo igihe',
      reasonForVisit: 'Impamvu yo gusura',
      reasonPlaceholder: 'Sobanura mu buryo bugufi ibimenyetso byawe cyangwa impamvu y\'iyi gahunda',
      insuranceProvider: 'Utanga ubwishingizi',
      insurancePlaceholder: 'urugero. RSSB',
      memberId: 'Nimero y\'umunyamuryango',
      memberIdPlaceholder: 'urugero. XYZ123456789',
      appointmentSummary: 'Incamake ya gahunda',
      doctor: 'Umuganga',
      specialty: 'Ubuhanga',
      date: 'Itariki',
      time: 'Igihe',
      type: 'Ubwoko',
      notSelected: 'Ntabwo hahitamo',
      processing: 'Gutunganya...',
      confirmAppointment: 'Emeza gahunda',
      appointmentScheduled: 'Gahunda yawe yateguwe!',
      redirecting: 'Kuyobora ku rubuga...',
      successMessage: 'Gahunda yawe na {doctorName} yateguwe ku {date} saa {time}.'
    }
  };


// Mock data for demonstration purposes
const SPECIALTIES = [
  'Cardiology',
  'Internal Medicine',
  'Dermatology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Ophthalmology',
  'ENT (Ear, Nose, Throat)',
  'Gynecology'
];

const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', avatar: sarah, rating: 4.9, reviews: 128, hospital: 'Central Medical Center' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiology', avatar: chen, rating: 4.7, reviews: 93, hospital: 'Riverside Hospital' },
  { id: 3, name: 'Dr. Priya Patel', specialty: 'Internal Medicine', avatar: priya, rating: 4.8, reviews: 156, hospital: 'City General Hospital' },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Internal Medicine', avatar: james, rating: 4.6, reviews: 112, hospital: 'Central Medical Center' },
  { id: 5, name: 'Dr. Emily Rodriguez', specialty: 'Dermatology', avatar: emily, rating: 4.9, reviews: 204, hospital: 'Wellness Medical Group' },
  { id: 6, name: 'Dr. David Thompson', specialty: 'Neurology', avatar: david, rating: 4.8, reviews: 87, hospital: 'Neuroscience Institute' }
];

// Generate available time slots for demo
const generateTimeSlots = (date) => {
  const slots = [];
  const startHour = 8;
  const endHour = 17;
  
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes of ['00', '30']) {
      // Skip lunch hour
      if (hour === 12 && minutes === '30') continue;
      if (hour === 13 && minutes === '00') continue;
      
      const timeString = `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
      const isAvailable = Math.random() > 0.3; // 70% chance of availability for demo
      
      slots.push({
        time: timeString,
        available: isAvailable
      });
    }
  }
  
  return slots;
};

const Appointment = ({ addAppointment, existingAppointments = [] }) => {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [appointmentType, setAppointmentType] = useState('in-person');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [insuranceInfo, setInsuranceInfo] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [step, setStep] = useState(1);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [bookingConflicts, setBookingConflicts] = useState([]);
  
  // Format today's date for min date attribute
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  
  // Filter doctors when specialty or search changes
  useEffect(() => {
    let filtered = MOCK_DOCTORS;
    
    if (specialty) {
      filtered = filtered.filter(doctor => doctor.specialty === specialty);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(query) || 
        doctor.specialty.toLowerCase().includes(query)
      );
    }
    
    setFilteredDoctors(filtered);
  }, [specialty, searchQuery]);
  
  // Generate time slots when date changes
  useEffect(() => {
    if (selectedDate && selectedDoctor) {
      setLoading(true);
      // Simulate API call to get available time slots
      setTimeout(() => {
        const slots = generateTimeSlots(selectedDate);
        
        // Check for conflicts with existing appointments
        const conflicts = existingAppointments.filter(apt => {
          return apt.date === selectedDate;
        });
        
        setBookingConflicts(conflicts);
        setTimeSlots(slots);
        setLoading(false);
      }, 500);
    }
  }, [selectedDate, selectedDoctor, existingAppointments]);

  // Update locations when doctor is selected
  useEffect(() => {
    if (selectedDoctor) {
      // In a real app, this would fetch locations where the doctor practices
      setLocations([
        selectedDoctor.hospital,
        'Downtown Clinic',
        'West Medical Center'
      ]);
      setSelectedLocation(selectedDoctor.hospital);
    }
  }, [selectedDoctor]);
  
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime(''); // Reset time when date changes
  };
  
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };
  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Format the appointment date and time
    const [time, period] = selectedTime.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    // Create the appointment object
    const newAppointment = {
      id: Date.now(), // Use a proper ID generation in production
      doctorName: selectedDoctor.name,
      doctorId: selectedDoctor.id,
      specialty: selectedDoctor.specialty,
      date: selectedDate,
      formattedDate: formatDate(selectedDate),
      time: selectedTime,
      timeValue: `${hour}:${minutes}`,
      type: appointmentType,
      reason: reason,
      location: selectedLocation,
      status: 'Scheduled',
      insuranceInfo: insuranceInfo
    };
    
    // Simulate API call to save appointment
    setTimeout(() => {
        // Add appointment to state/context that manages appointments
        if (addAppointment) {
          addAppointment(newAppointment);
        }
        
        // Create localized success message based on selected language
        const message = t.successMessage
          .replace('{doctorName}', selectedDoctor.name)
          .replace('{date}', formatDate(selectedDate))
          .replace('{time}', selectedTime);
        
        setSuccessMessage(message);
        setSchedulingSuccess(true);
        setLoading(false);
        
        // After 2 seconds (reduced from 3), redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 700);
      }, 400); // Reduced from 1000ms to 800ms for faster feedback
    };
  const goBack = () => {
    setStep(1);
  };

  const checkAvailability = () => {
    // This would normally check real-time availability with the server
    setLoading(true);
    setTimeout(() => {
      setTimeSlots(generateTimeSlots(selectedDate));
      setLoading(false);
    }, 800);
  };

  const clearFilters = () => {
    setSpecialty('');
    setSearchQuery('');
    setFilteredDoctors(MOCK_DOCTORS);
  };
  
  return (
    <div className="appointment-container">
      <div className="appointment-header">
        <h2>Schedule an Appointment</h2>
        <p>Find available healthcare professionals and book your next visit</p>
      </div>
      
      {successMessage && (
        <div className="success-message">
          <i className="fa fa-check-circle"></i>
          <p>{successMessage}</p>
          <p className="redirecting">Redirecting to dashboard...</p>
        </div>
      )}
      
      {!successMessage && step === 1 && (
        <div className="find-doctor-section">
          <div className="search-filters">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by doctor name or keywords"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-button">
                <i className="fa fa-search"></i>
              </button>
            </div>
            
            <div className="filter-options">
              <select 
                value={specialty} 
                onChange={(e) => setSpecialty(e.target.value)}
                className="specialty-select"
              >
                <option value="">All Specialties</option>
                {SPECIALTIES.map((spec, index) => (
                  <option key={index} value={spec}>{spec}</option>
                ))}
              </select>
              
              <div className="appointment-type-toggle">
                <button
                  className={appointmentType === 'in-person' ? 'active' : ''}
                  onClick={() => setAppointmentType('in-person')}
                >
                  In-Person
                </button>
                <button
                  className={appointmentType === 'virtual' ? 'active' : ''}
                  onClick={() => setAppointmentType('virtual')}
                >
                  Virtual
                </button>
              </div>
              
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters
              </button>
            </div>
          </div>
          
          <div className="doctors-list">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map(doctor => (
                <div key={doctor.id} className="doctor-card" onClick={() => handleDoctorSelect(doctor)}>
                  <div className="doctor-avatar">
                    <img src={doctor.avatar} alt={doctor.name} className="avatar-placeholder" />
                  </div>
                  <div className="doctor-info">
                    <h3>{doctor.name}</h3>
                    <p className="specialty">{doctor.specialty}</p>
                    <p className="hospital">{doctor.hospital}</p>
                    <div className="doctor-rating">
                      <span className="stars">{'★'.repeat(Math.round(doctor.rating))}</span>
                      <span className="rating-number">{doctor.rating} ({doctor.reviews} reviews)</span>
                    </div>
                    {appointmentType === 'virtual' && (
                      <span className="virtual-badge">Virtual Available</span>
                    )}
                  </div>
                  <button className="select-doctor-btn">Select</button>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No doctors found matching your criteria. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {!successMessage && step === 2 && selectedDoctor && (
        <div className="booking-section">
          <button className="back-button" onClick={goBack}>
            <i className="fa fa-arrow-left"></i> Back to doctor search
          </button>
          
          <div className="doctor-preview">
            <div className="doctor-avatar">
              <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="avatar-placeholder" />
            </div>
            <div className="doctor-booking-info">
              <h3>{selectedDoctor.name}</h3>
              <p>{selectedDoctor.specialty}</p>
              <p className="hospital-name">{selectedDoctor.hospital}</p>
              <p className="appointment-type-label">
                {appointmentType === 'virtual' ? 'Virtual Appointment' : 'In-Person Visit'}
              </p>
            </div>
          </div>
          
          {bookingConflicts.length > 0 && (
            <div className="booking-conflicts-alert">
              <h4>⚠️ Scheduling Conflicts</h4>
              <p>You already have the following appointment(s) on this date:</p>
              <ul>
                {bookingConflicts.map((conflict, index) => (
                  <li key={index}>
                    {conflict.time} with {conflict.doctorName} ({conflict.specialty})
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="appointment-date">Select Date</label>
                <input
                  id="appointment-date"
                  type="date"
                  min={formattedToday}
                  value={selectedDate}
                  onChange={handleDateChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location-select">Location</label>
                <select
                  id="location-select"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  required
                >
                  {locations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group check-availability">
                <button 
                  type="button" 
                  className="check-availability-btn"
                  onClick={checkAvailability}
                  disabled={!selectedDate}
                >
                  Check Availability
                </button>
              </div>
            </div>
            
            {loading && (
              <div className="loading-spinner-container">
                <div className="loading-spinner"></div>
                <p>Checking availability...</p>
              </div>
            )}
            
            {selectedDate && timeSlots.length > 0 && !loading && (
              <div className="form-group">
                <label>Select Time</label>
                <div className="time-slots">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`time-slot ${slot.available ? 'available' : 'unavailable'} ${selectedTime === slot.time ? 'selected' : ''}`}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="appointment-reason">Reason for Visit</label>
              <textarea
                id="appointment-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe your symptoms or reason for this appointment"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="insurance-provider">Insurance Provider</label>
                <input
                  id="insurance-provider"
                  type="text"
                  value={insuranceInfo}
                  onChange={(e) => setInsuranceInfo(e.target.value)}
                  placeholder="e.g. Blue Cross Blue Shield"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="member-id">Member ID</label>
                <input
                  id="member-id"
                  type="text"
                  placeholder="e.g. XYZ123456789"
                />
              </div>
            </div>
            
            <div className="appointment-summary">
              <h4>Appointment Summary</h4>
              <div className="summary-details">
                <div className="summary-item">
                  <span className="summary-label">Doctor:</span>
                  <span className="summary-value">{selectedDoctor.name}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Specialty:</span>
                  <span className="summary-value">{selectedDoctor.specialty}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Date:</span>
                  <span className="summary-value">{selectedDate ? formatDate(selectedDate) : 'Not selected'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Time:</span>
                  <span className="summary-value">{selectedTime || 'Not selected'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Location:</span>
                  <span className="summary-value">{selectedLocation}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Type:</span>
                  <span className="summary-value">{appointmentType === 'virtual' ? 'Virtual (Video Call)' : 'In-Person Visit'}</span>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="book-appointment-btn" disabled={!selectedDate || !selectedTime || loading}>
                {loading ? 'Processing...' : 'Confirm Appointment'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Appointment;