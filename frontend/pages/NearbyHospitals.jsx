

import { useState, useEffect } from "react"
import { Search, Place, LocationOn, Phone, Schedule, Star, StarHalf, StarBorder } from "@mui/icons-material"
import "../styles/nearbyhospitals.css"

const NearbyHospitals = () => {
  // State variables
  const [userLocation, setUserLocation] = useState(null)
  const [searchRadius, setSearchRadius] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [locationPermission, setLocationPermission] = useState("pending")
  const [filteredHospitals, setFilteredHospitals] = useState([])
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  // Sample hospital data (Rwandan hospitals)
  const rwandanHospitals = [
    {
      id: 1,
      name: "King Faisal Hospital",
      address: "KG 544 St, Kigali",
      phone: "+250 252 588 888",
      distance: 2.3,
      specialties: ["Emergency", "Cardiology", "Neurology", "Surgery", "Oncology"],
      waitTime: "15 min",
      rating: 4.7,
      openNow: true,
    },
    {
      id: 2,
      name: "CHUK (University Teaching Hospital of Kigali)",
      address: "KN 4 Ave, Kigali",
      phone: "+250 788 868 240",
      distance: 3.8,
      specialties: ["Emergency", "Surgery", "Internal Medicine", "Pediatrics"],
      waitTime: "30 min",
      rating: 4.2,
      openNow: true,
    },
    {
      id: 3,
      name: "CHUB (University Teaching Hospital of Butare)",
      address: "Huye District, Southern Province",
      phone: "+250 252 530 000",
      distance: 5.1,
      specialties: ["Emergency", "Surgery", "Internal Medicine", "Pediatrics", "Gynecology"],
      waitTime: "25 min",
      rating: 4.0,
      openNow: true,
    },
    {
      id: 4,
      name: "Kibagabaga Hospital",
      address: "KG 28 Ave, Kigali",
      phone: "+250 788 484 444",
      distance: 4.2,
      specialties: ["Emergency", "Obstetrics", "Pediatrics", "Surgery"],
      waitTime: "20 min",
      rating: 3.9,
      openNow: true,
    },
    {
      id: 5,
      name: "Rwanda Military Hospital",
      address: "KK 15 Rd, Kigali",
      phone: "+250 788 305 703",
      distance: 6.5,
      specialties: ["Emergency", "Orthopedics", "Cardiology", "Surgery"],
      waitTime: "15 min",
      rating: 4.3,
      openNow: true,
    },
    {
      id: 6,
      name: "Masaka Hospital",
      address: "Masaka, Kicukiro District",
      phone: "+250 788 423 332",
      distance: 8.7,
      specialties: ["Emergency", "Pediatrics", "Obstetrics", "Internal Medicine"],
      waitTime: "35 min",
      rating: 3.8,
      openNow: true,
    },
    {
      id: 7,
      name: "Nyamata Hospital",
      address: "Bugesera District, Eastern Province",
      phone: "+250 788 565 656",
      distance: 12.4,
      specialties: ["Emergency", "Surgery", "Pediatrics"],
      waitTime: "40 min",
      rating: 3.7,
      openNow: false,
    },
  ]

  // Function to get user location
  const getUserLocation = () => {
    setLocationPermission("loading")

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocationPermission("granted")
          // Now that we have location, filter and display hospitals
          filterAndDisplayHospitals()
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationPermission("denied")
          // Still display hospitals, but they won't be sorted by actual distance
          filterAndDisplayHospitals()
        },
      )
    } else {
      setLocationPermission("unavailable")
      // Display hospitals without location
      filterAndDisplayHospitals()
    }
  }

  // Filter and display hospitals based on user inputs
  const filterAndDisplayHospitals = () => {
    let hospitals = [...rwandanHospitals]

    // Filter by search query
    if (searchQuery) {
      hospitals = hospitals.filter(
        (hospital) =>
          hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hospital.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hospital.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by specialty
    if (selectedSpecialty !== "all") {
      hospitals = hospitals.filter((hospital) =>
        hospital.specialties.some((specialty) => specialty.toLowerCase() === selectedSpecialty.toLowerCase()),
      )
    }

    // Filter by distance
    hospitals = hospitals.filter((hospital) => hospital.distance <= searchRadius)

    // Sort by distance
    hospitals.sort((a, b) => a.distance - b.distance)

    setFilteredHospitals(hospitals)
  }

  // Generate star rating component
  const generateStars = (rating) => {
    const stars = []

    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} className="filled" />)
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<StarHalf key={i} className="filled" />)
      } else {
        stars.push(<StarBorder key={i} className="empty" />)
      }
    }

    return stars
  }

  // Get directions function
  const getDirections = (address) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, "_blank")
  }

  // Call hospital function
  const callHospital = (phone) => {
    window.location.href = `tel:${phone}`
  }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    filterAndDisplayHospitals()
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode")
  }

  // Toggle profile menu
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProfileMenuOpen && !e.target.closest("#profileDropdown")) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isProfileMenuOpen])

  // Initialize the page - don't display hospitals until location is shared
  useEffect(() => {
    // Only filter and display hospitals if location permission has been granted or denied
    if (locationPermission === "granted" || locationPermission === "denied" || locationPermission === "unavailable") {
      filterAndDisplayHospitals()
    }
  }, [locationPermission, searchQuery, searchRadius, selectedSpecialty])

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="main-content">
          <div className="nearby-hospitals-container">
            <div className="nearby-hospitals-header">
              <h1>Nearby Hospitals</h1>
              <p>Find healthcare facilities close to your location in Rwanda</p>
            </div>

            <div className="location-permission-container">
              {locationPermission === "pending" && (
                <div className="location-request">
                  <p>To find hospitals near you, we need your location permission</p>
                  <button className="primary-button" onClick={getUserLocation}>
                    Share My Location
                  </button>
                </div>
              )}

              {locationPermission === "loading" && (
                <div className="location-loading">
                  <p>Getting your location...</p>
                </div>
              )}

              {(locationPermission === "denied" || locationPermission === "unavailable") && (
                <div className="location-denied">
                  <p>Location access was denied. Results may not be accurate to your location.</p>
                  <button className="secondary-button" onClick={getUserLocation}>
                    Try Again
                  </button>
                </div>
              )}
            </div>

            <div className="search-filter-container">
              <form className="search-box" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search for hospitals, addresses, or specialties"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button" type="submit">
                  <Search />
                </button>
              </form>

              <div className="filter-options">
                <div className="filter-item">
                  <label>Distance (km):</label>
                  <select value={searchRadius} onChange={(e) => setSearchRadius(Number.parseInt(e.target.value))}>
                    <option value="5">5 km</option>
                    <option value="10">10 km</option>
                    <option value="20">20 km</option>
                    <option value="50">50 km</option>
                  </select>
                </div>

                <div className="filter-item">
                  <label>Specialty:</label>
                  <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
                    <option value="all">All Specialties</option>
                    <option value="emergency">Emergency</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="neurology">Neurology</option>
                    <option value="oncology">Oncology</option>
                    <option value="surgery">Surgery</option>
                    <option value="internal medicine">Internal Medicine</option>
                    <option value="obstetrics">Obstetrics</option>
                    <option value="gynecology">Gynecology</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="hospitals-list">
              {locationPermission === "pending" ? (
                <div className="no-results">
                  <p>Please share your location to see nearby hospitals.</p>
                </div>
              ) : filteredHospitals.length === 0 ? (
                <div className="no-results">
                  <p>No hospitals found matching your criteria. Try adjusting your filters.</p>
                </div>
              ) : (
                filteredHospitals.map((hospital) => (
                  <div className="hospital-card" key={hospital.id}>
                    <div className="hospital-header">
                      <h2>{hospital.name}</h2>
                      <div className="hospital-distance">
                        <Place />
                        <span>{hospital.distance} km away</span>
                      </div>
                    </div>

                    <div className="hospital-details">
                      <div className="hospital-address">
                        <LocationOn />
                        <span>{hospital.address}</span>
                      </div>

                      <div className="hospital-phone">
                        <Phone />
                        <span>{hospital.phone}</span>
                      </div>
                    </div>

                    <div className="hospital-status">
                      <div className="wait-time">
                        <Schedule />
                        <span>Wait time: {hospital.waitTime}</span>
                      </div>

                      <div className={`open-status ${hospital.openNow ? "open" : "closed"}`}>
                        {hospital.openNow ? "Open Now" : "Closed"}
                      </div>
                    </div>

                    <div className="hospital-specialties">
                      {hospital.specialties.map((specialty, index) => (
                        <span className="specialty-tag" key={index}>
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="hospital-rating">
                      <div className="stars">
                        {generateStars(hospital.rating)}
                        <span className="rating-value">{hospital.rating}</span>
                      </div>
                    </div>

                    <div className="hospital-actions">
                      <button className="primary-button" onClick={() => getDirections(hospital.address)}>
                        Get Directions
                      </button>
                      <button className="secondary-button" onClick={() => callHospital(hospital.phone)}>
                        Call Hospital
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NearbyHospitals

