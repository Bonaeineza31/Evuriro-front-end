import React, { useState } from 'react';
import '../styles/find.css';
import sarah from "../images/Screenshot 2025-03-01 223549.png"
import chen from "../images/Screenshot 2025-03-01 223501.png"
import priya from "../images/Screenshot 2025-03-01 223641.png"
import james from "../images/Screenshot 2025-03-01 224911.png"
import emily from "../images/Screenshot 2025-03-01 224927.png"
import david from "../images/Screenshot 2025-03-01 224939.png"

const Find = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  // Sample doctors data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      location: 'Downtown Medical Center',
      rating: 4.8,
      availability: 'Available Today',
      image: sarah
    },
    {
      id: 2,
      name: 'Dr. Michael David',
      specialty: 'Internal Medicine',
      location: 'Westside Hospital',
      rating: 4.6,
      availability: 'Available Tomorrow',
      image: david
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Gynecology',
      location: 'Women\'s Health Clinic',
      rating: 4.9,
      availability: 'Available Today',
      image: emily
    },
    {
      id: 4,
      name: 'Dr. Robert Chen',
      specialty: 'Pediatrics',
      location: 'Children\'s Hospital',
      rating: 4.7,
      availability: 'Available in 3 days',
      image:chen
    },
    {
      id: 5,
      name: 'Dr. Priya Williams',
      specialty: 'Dermatology',
      location: 'Skin Care Center',
      rating: 4.5,
      availability: 'Available Tomorrow',
      image: priya
    },
    {
      id: 6,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      location: 'Sports Medicine Clinic',
      rating: 4.8,
      availability: 'Available Today',
      image: james
    }
  ];

  const specialties = [
    'All Specialties',
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Gastroenterology',
    'Gynecology',
    'Internal Medicine',
    'Neurology',
    'Ophthalmology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Urology'
  ];

  const locations = [
    'All Locations',
    'Downtown Medical Center',
    'Westside Hospital',
    'Eastside Clinic',
    'Women\'s Health Clinic',
    'Children\'s Hospital',
    'Skin Care Center',
    'Sports Medicine Clinic'
  ];

  // Filter doctors based on search term, specialty, and location
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialty === '' || specialty === 'All Specialties' || doctor.specialty === specialty;
    const matchesLocation = location === '' || location === 'All Locations' || doctor.location === location;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  // Sort doctors based on sort option
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'availability') {
      if (a.availability.includes('Today') && !b.availability.includes('Today')) return -1;
      if (!a.availability.includes('Today') && b.availability.includes('Today')) return 1;
      return 0;
    }
    // Default 'recommended' sorting uses rating
    return b.rating - a.rating;
  });

  const handleScheduleAppointment = (doctor) => {
    alert(`Scheduling appointment with ${doctor.name}`);
    // Here you would typically navigate to a scheduling page or open a modal
  };

  const handleViewProfile = (doctor) => {
    alert(`Viewing profile of ${doctor.name}`);
    // Here you would typically navigate to the doctor's profile page
  };

  return (
    <div className="find-doctor-container3">
      <div className="search-section3">
        <h1>Find a Doctor</h1>
        <p>Search for specialists, primary care physicians, and more</p>
        
        <div className="search-filters3">
          <div className="search-bar3">
            <input
              type="text"
              placeholder="Search by doctor name or specialty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button3">Search</button>
          </div>
          
          <div className="filter-options3">
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="availability">Soonest Available</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="results-section3">
        <h2>Available Doctors ({sortedDoctors.length})</h2>
        
        <div className="doctor-cards3">
          {sortedDoctors.map((doctor) => (
            <div className="doctor-card3" key={doctor.id}>
              <div className="doctor-image3">
                <img src={doctor.image} alt={doctor.name} />
              </div>
              <div className="doctor-info3">
                <h3>{doctor.name}</h3>
                <p className="specialty">{doctor.specialty}</p>
                <p className="location">{doctor.location}</p>
                <div className="rating">
                  <span className="stars">{'★'.repeat(Math.floor(doctor.rating))}{'☆'.repeat(5-Math.floor(doctor.rating))}</span>
                  <span className="rating-number">{doctor.rating}</span>
                </div>
                <p className="availability">{doctor.availability}</p>
              </div>
              <div className="doctor-actions3">
                <button 
                  className="schedule-button3"
                  onClick={() => handleScheduleAppointment(doctor)}
                >
                  Schedule Appointment
                </button>
                <button 
                  className="profile-button3"
                  onClick={() => handleViewProfile(doctor)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Find;