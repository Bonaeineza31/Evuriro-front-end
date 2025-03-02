import React, { useState, useEffect } from 'react';
import './nearbyhospitals.css';

const NearbyHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [locationPermission, setLocationPermission] = useState('pending');

  // Sample hospital data (would be fetched from API in production)
  const sampleHospitals = [
    {
      id: 1,
      name: "Memorial Medical Center",
      address: "1233 Main Street, Cityville",
      phone: "(555) 123-4567",
      distance: 2.3,
      specialties: ["Emergency", "Cardiology", "Pediatrics"],
      waitTime: "15 min",
      rating: 4.5,
      openNow: true
    },
    {
      id: 2,
      name: "St. Luke's Hospital",
      address: "456 Health Avenue, Townsburg",
      phone: "(555) 987-6543",
      distance: 3.8,
      specialties: ["Orthopedics", "Neurology", "Oncology"],
      waitTime: "30 min",
      rating: 4.2,
      openNow: true
    },
    {
      id: 3, 
      name: "City General Hospital",
      address: "789 Medical Drive, Metropolis",
      phone: "(555) 456-7890",
      distance: 5.1,
      specialties: ["Emergency", "Surgery", "Internal Medicine"],
      waitTime: "45 min",
      rating: 3.9,
      openNow: true
    },
    {
      id: 4,
      name: "Riverside Health Center",
      address: "321 River Road, Streamville",
      phone: "(555) 234-5678",
      distance: 6.7,
      specialties: ["Family Medicine", "Obstetrics", "Psychiatry"],
      waitTime: "20 min",
      rating: 4.0,
      openNow: false
    },
    {
      id: 5,
      name: "University Medical Hospital",
      address: "101 Scholar Lane, Knowledge Heights",
      phone: "(555) 345-6789",
      distance: 8.5,
      specialties: ["Emergency", "Research", "Teaching", "Specialized Care"],
      waitTime: "25 min",
      rating: 4.7,
      openNow: true
    }
  ];

  // Function to get user location
  const getUserLocation = () => {
    setLocationPermission('loading');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermission('granted');
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationPermission('denied');
          setLoading(false);
          // Still load hospitals, but they won't be sorted by actual distance
          setHospitals(sampleHospitals);
        }
      );
    } else {
      setLocationPermission('unavailable');
      setLoading(false);
      setHospitals(sampleHospitals);
    }
  };

  // Filter and sort hospitals based on user inputs
  useEffect(() => {
    if (!loading) {
      let filteredHospitals = [...sampleHospitals];
      
      // Filter by search query
      if (searchQuery) {
        filteredHospitals = filteredHospitals.filter(hospital => 
          hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hospital.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hospital.specialties.some(specialty => 
            specialty.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
      
      // Filter by specialty
      if (filter !== 'all') {
        filteredHospitals = filteredHospitals.filter(hospital =>
          hospital.specialties.some(specialty => 
            specialty.toLowerCase() === filter.toLowerCase()
          )
        );
      }
      
      // Filter by distance
      filteredHospitals = filteredHospitals.filter(hospital => 
        hospital.distance <= searchRadius
      );
      
      // Sort by distance
      filteredHospitals.sort((a, b) => a.distance - b.distance);
      
      setHospitals(filteredHospitals);
    }
  }, [searchQuery, filter, searchRadius, loading]);

  // Get all unique specialties for filter dropdown
  const allSpecialties = ['all', ...new Set(
    sampleHospitals.flatMap(hospital => hospital.specialties.map(s => s.toLowerCase()))
  )];

  return (
    <div className="nearby-hospitals-container">
      <div className="nearby-hospitals-header">
        <h1>Nearby Hospitals</h1>
        <p>Find healthcare facilities close to your location</p>
      </div>

      <div className="location-permission-container">
        {locationPermission === 'pending' && (
          <div className="location-request">
            <p>To find hospitals near you, we need your location permission</p>
            <button 
              className="primary-button" 
              onClick={getUserLocation}
            >
              Share My Location
            </button>
          </div>
        )}
        
        {locationPermission === 'loading' && (
          <div className="location-loading">
            <p>Getting your location...</p>
          </div>
        )}
        
        {locationPermission === 'denied' && (
          <div className="location-denied">
            <p>Location access was denied. Results may not be accurate to your location.</p>
            <button 
              className="secondary-button"
              onClick={getUserLocation}
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for hospitals, addresses, or specialties"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">
            <span className="material-icons">search</span>
          </button>
        </div>
        
        <div className="filter-options">
          <div className="filter-item">
            <label>Distance (km):</label>
            <select 
              value={searchRadius} 
              onChange={(e) => setSearchRadius(Number(e.target.value))}
            >
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={20}>20 km</option>
              <option value={50}>50 km</option>
            </select>
          </div>
          
          <div className="filter-item">
            <label>Specialty:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Specialties</option>
              {allSpecialties
                .filter(specialty => specialty !== 'all')
                .sort()
                .map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="hospitals-list">
        {loading ? (
          <div className="loading-state">Loading nearby hospitals...</div>
        ) : hospitals.length > 0 ? (
          hospitals.map(hospital => (
            <div className="hospital-card" key={hospital.id}>
              <div className="hospital-header">
                <h2>{hospital.name}</h2>
                <div className="hospital-distance">
                  <span className="material-icons">place</span>
                  <span>{hospital.distance} km away</span>
                </div>
              </div>
              
              <div className="hospital-details">
                <div className="hospital-address">
                  <span className="material-icons">location_on</span>
                  <span>{hospital.address}</span>
                </div>
                
                <div className="hospital-phone">
                  <span className="material-icons">phone</span>
                  <span>{hospital.phone}</span>
                </div>
              </div>
              
              <div className="hospital-status">
                <div className="wait-time">
                  <span className="material-icons">schedule</span>
                  <span>Wait time: {hospital.waitTime}</span>
                </div>
                
                <div className={`open-status ${hospital.openNow ? 'open' : 'closed'}`}>
                  {hospital.openNow ? 'Open Now' : 'Closed'}
                </div>
              </div>
              
              <div className="hospital-specialties">
                {hospital.specialties.map((specialty, index) => (
                  <span className="specialty-tag" key={index}>{specialty}</span>
                ))}
              </div>
              
              <div className="hospital-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`material-icons ${i < Math.floor(hospital.rating) ? 'filled' : 'empty'}`}
                    >
                      {i < Math.floor(hospital.rating) ? 'star' : 'star_border'}
                    </span>
                  ))}
                  <span className="rating-value">{hospital.rating}</span>
                </div>
              </div>
              
              <div className="hospital-actions">
                <button className="primary-button">Get Directions</button>
                <button className="secondary-button">Call Hospital</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No hospitals found matching your criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyHospitals;