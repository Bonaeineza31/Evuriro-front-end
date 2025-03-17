import React, { useState } from 'react';
import { FaSearch, FaPhone, FaMapMarkerAlt, FaFilter, FaHospital, FaStethoscope, FaAmbulance, FaBed, FaStar, FaCircle } from 'react-icons/fa';
import '../Dstyles/Dhospital.css';

const Dhospital = () => {
  const [activeView, setActiveView] = useState('nearby');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('All');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showHospitalDetails, setShowHospitalDetails] = useState(false);

  // Sample data for hospitals
  const hospitals = [
    {
      id: 1,
      name: "Central Medical Center",
      distance: 2.4,
      address: "123 Main Street, Cityville",
      phone: "+1 (555) 123-4567",
      specialties: ["Cardiology", "Neurology", "Orthopedics"],
      bedAvailability: 15,
      emergencyServices: true,
      rating: 4.7,
      waitTime: "25 min",
      insuranceAccepted: ["RSSB", "MMI", "RAMA"],
      image: "/images/hospital1.jpg"
    },
    {
      id: 2,
      name: "Northern Regional Hospital",
      distance: 5.1,
      address: "456 Oak Avenue, Townsburg",
      phone: "+1 (555) 987-6543",
      specialties: ["Pediatrics", "Oncology", "Gynecology"],
      bedAvailability: 8,
      emergencyServices: true,
      rating: 4.2,
      waitTime: "40 min",
      insuranceAccepted: ["RSSB", "MMI", "RAMA", "SSFR"],
      image: "/images/hospital2.jpg"
    },
    {
      id: 3,
      name: "Eastside Health Center",
      distance: 3.7,
      address: "789 Pine Road, Villageton",
      phone: "+1 (555) 456-7890",
      specialties: ["Dermatology", "Psychiatry", "Gastroenterology"],
      bedAvailability: 23,
      emergencyServices: false,
      rating: 4.5,
      waitTime: "15 min",
      insuranceAccepted: ["RSSB", "MMI"],
      image: "/images/hospital3.jpg"
    },
    {
      id: 4,
      name: "Western Medical Institute",
      distance: 7.2,
      address: "321 Elm Street, Hamletville",
      phone: "+1 (555) 234-5678",
      specialties: ["Cardiology", "Pulmonology", "Ophthalmology"],
      bedAvailability: 5,
      emergencyServices: true,
      rating: 4.8,
      waitTime: "35 min",
      insuranceAccepted: ["RSSB", "RAMA"],
      image: "/images/hospital4.jpg"
    },
    {
      id: 5,
      name: "Southside Community Hospital",
      distance: 1.8,
      address: "654 Maple Avenue, Boroughton",
      phone: "+1 (555) 876-5432",
      specialties: ["Orthopedics", "Neurology", "Rehabilitation"],
      bedAvailability: 0,
      emergencyServices: true,
      rating: 4.0,
      waitTime: "55 min",
      insuranceAccepted: ["RSSB", "MMI", "RAMA"],
      image: "/images/hospital5.jpg"
    }
  ];

  // List of specialties for filtering
  const specialties = [
    "All",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Oncology",
    "Gynecology",
    "Dermatology",
    "Psychiatry",
    "Gastroenterology",
    "Pulmonology",
    "Ophthalmology",
    "Rehabilitation"
  ];

  // Filter hospitals based on search term and specialty
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'All' || hospital.specialties.includes(filterSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  // Sort hospitals by distance for nearby view
  const sortedHospitals = [...filteredHospitals].sort((a, b) => {
    if (activeView === 'nearby') {
      return a.distance - b.distance;
    } else if (activeView === 'emergency') {
      return a.emergencyServices === b.emergencyServices ? 0 : a.emergencyServices ? -1 : 1;
    } else if (activeView === 'beds') {
      return b.bedAvailability - a.bedAvailability;
    } else {
      return b.rating - a.rating;
    }
  });

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    setShowHospitalDetails(true);
  };

  return (
    <div className="hospital-container">
      <div className="hospital-header">
        <h1>Hospital Directory</h1>
        <div className="search-filter-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search hospitals by name or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-button" onClick={() => setShowFilterModal(true)}>
            <FaFilter className="filter-icon" />
            Filter
          </button>
        </div>
      </div>

      <div className="hospital-nav">
        <button 
          className={`nav-btn ${activeView === 'nearby' ? 'active' : ''}`} 
          onClick={() => setActiveView('nearby')}
        >
          <FaMapMarkerAlt className="nav-icon" />
          Nearby
        </button>
        <button 
          className={`nav-btn ${activeView === 'emergency' ? 'active' : ''}`} 
          onClick={() => setActiveView('emergency')}
        >
          <FaAmbulance className="nav-icon" />
          Emergency Services
        </button>
        <button 
          className={`nav-btn ${activeView === 'beds' ? 'active' : ''}`} 
          onClick={() => setActiveView('beds')}
        >
          <FaBed className="nav-icon" />
          Bed Availability
        </button>
        <button 
          className={`nav-btn ${activeView === 'rating' ? 'active' : ''}`} 
          onClick={() => setActiveView('rating')}
        >
          <FaStar className="nav-icon" />
          Top Rated
        </button>
      </div>

      <div className="hospital-content">
        <div className="hospital-list">
          {sortedHospitals.length > 0 ? (
            sortedHospitals.map(hospital => (
              <div className="hospital-card" key={hospital.id} onClick={() => handleHospitalSelect(hospital)}>
                <div className="hospital-card-left">
                  <div className="hospital-name">{hospital.name}</div>
                  <div className="hospital-distance">
                    <FaMapMarkerAlt className="distance-icon" />
                    {hospital.distance} km away
                  </div>
                  <div className="hospital-specialties">
                    {hospital.specialties.slice(0, 3).map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
                <div className="hospital-card-right">
                  <div className="hospital-rating">
                    <FaStar className="rating-icon" />
                    {hospital.rating}
                  </div>
                  <div className="hospital-bed-availability">
                    <FaBed className="bed-icon" />
                    {hospital.bedAvailability > 0 ? (
                      <span className="available">{hospital.bedAvailability} beds</span>
                    ) : (
                      <span className="unavailable">No beds</span>
                    )}
                  </div>
                  <div className="hospital-emergency">
                    {hospital.emergencyServices ? (
                      <div className="emergency-available">
                        <FaCircle className="status-icon available" />
                        ER Available
                      </div>
                    ) : (
                      <div className="emergency-unavailable">
                        <FaCircle className="status-icon unavailable" />
                        No ER
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-hospitals">
              <FaHospital className="no-results-icon" />
              <p>No hospitals found matching your criteria.</p>
              <button className="reset-button" onClick={() => {
                setSearchTerm('');
                setFilterSpecialty('All');
              }}>Reset Filters</button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Filter Hospitals</h3>
              <button className="modal-close" onClick={() => setShowFilterModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="filter-section">
                <h4>By Specialty</h4>
                <div className="specialties-grid">
                  {specialties.map((specialty, index) => (
                    <div 
                      key={index} 
                      className={`specialty-option ${filterSpecialty === specialty ? 'selected' : ''}`}
                      onClick={() => setFilterSpecialty(specialty)}
                    >
                      <FaStethoscope className="specialty-icon" />
                      {specialty}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => {
                setFilterSpecialty('All');
              }}>Reset</button>
              <button className="btn-primary" onClick={() => setShowFilterModal(false)}>Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      {/* Hospital Details Modal */}
      {showHospitalDetails && selectedHospital && (
        <div className="modal-overlay">
          <div className="modal-container modal-large">
            <div className="modal-header">
              <h3>{selectedHospital.name}</h3>
              <button className="modal-close" onClick={() => setShowHospitalDetails(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="hospital-details">
                <div className="hospital-details-top">
                  <div className="hospital-image">
                    <div className="image-placeholder">
                      <FaHospital className="placeholder-icon" />
                    </div>
                  </div>
                  <div className="hospital-info">
                    <div className="info-row">
                      <FaMapMarkerAlt className="info-icon" />
                      <span>{selectedHospital.address}</span>
                    </div>
                    <div className="info-row">
                      <FaPhone className="info-icon" />
                      <span>{selectedHospital.phone}</span>
                    </div>
                    <div className="info-row">
                      <FaBed className="info-icon" />
                      <span>
                        {selectedHospital.bedAvailability > 0 ? (
                          <span className="available">{selectedHospital.bedAvailability} beds available</span>
                        ) : (
                          <span className="unavailable">No beds available</span>
                        )}
                      </span>
                    </div>
                    <div className="info-row">
                      <FaAmbulance className="info-icon" />
                      <span>
                        {selectedHospital.emergencyServices ? (
                          <span className="available">Emergency services available</span>
                        ) : (
                          <span className="unavailable">No emergency services</span>
                        )}
                      </span>
                    </div>
                    <div className="info-row">
                      <FaStar className="info-icon" />
                      <span>{selectedHospital.rating} / 5.0 rating</span>
                    </div>
                    <div className="info-row">
                      <FaCircle className="info-icon" />
                      <span>Current wait time: {selectedHospital.waitTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hospital-details-section">
                  <h4>Specialties</h4>
                  <div className="specialty-tags">
                    {selectedHospital.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-detail-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
                
                <div className="hospital-details-section">
                  <h4>Insurance Accepted</h4>
                  <div className="insurance-tags">
                    {selectedHospital.insuranceAccepted.map((insurance, index) => (
                      <span key={index} className="insurance-tag">{insurance}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowHospitalDetails(false)}>Close</button>
              <button className="btn-primary" onClick={() => {
                alert(`Referral to ${selectedHospital.name} would be processed here`);
                setShowHospitalDetails(false);
              }}>
                Refer Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dhospital;