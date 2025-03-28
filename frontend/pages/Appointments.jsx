"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../styles/Appointments.css"
import { appointmentService } from "../api-service"

// Import doctor images - adjust these paths to match your project structure
import sarah from "../images/Screenshot 2025-03-01 223549.png"
import chen from "../images/Screenshot 2025-03-01 223501.png"
import priya from "../images/Screenshot 2025-03-01 223641.png"
import james from "../images/Screenshot 2025-03-01 224911.png"
import emily from "../images/Screenshot 2025-03-01 224927.png"
import david from "../images/Screenshot 2025-03-01 224939.png"

// API configuration
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5006"
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Specialties list
const SPECIALTIES = [
  "Cardiology",
  "Internal Medicine",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Ophthalmology",
  "ENT (Ear, Nose, Throat)",
  "Gynecology",
]

// Updated doctors data with Rwandan hospitals and proper MongoDB ObjectId strings
const MOCK_DOCTORS = [
  {
    _id: "65f1a2b3c4d5e6f7a8b9c0d1", // MongoDB ObjectId format (string)
    name: "Dr. Mutesi Diane",
    specialty: "Cardiology",
    avatar: sarah,
    rating: 4.9,
    reviews: 128,
    hospital: "King Faisal Hospital",
  },
  {
    _id: "65f1a2b3c4d5e6f7a8b9c0d2",
    name: "Dr. Mugabo Jean",
    specialty: "Cardiology",
    avatar: chen,
    rating: 4.7,
    reviews: 93,
    hospital: "Rwanda Military Hospital",
  },
  {
    _id: "65f1a2b3c4d5e6f7a8b9c0d3",
    name: "Dr. Uwase Claire",
    specialty: "Internal Medicine",
    avatar: priya,
    rating: 4.8,
    reviews: 156,
    hospital: "CHUK (Centre Hospitalier Universitaire de Kigali)",
  },
  {
    _id: "65f1a2b3c4d5e6f7a8b9c0d4",
    name: "Dr. Nshimiyimana Eric",
    specialty: "Internal Medicine",
    avatar: james,
    rating: 4.6,
    reviews: 112,
    hospital: "Kibagabaga Hospital",
  },
  {
    _id: "65f1a2b3c4d5e6f7a8b9c0d5",
    name: "Dr. Mukamana Grace",
    specialty: "Dermatology",
    avatar: emily,
    rating: 4.9,
    reviews: 204,
    hospital: "Masaka Hospital",
  },
  {
    _id: "65f1a2b3c4d5e6f7a8b9c0d6",
    name: "Dr. Ndayishimiye Patrick",
    specialty: "Neurology",
    avatar: david,
    rating: 4.8,
    reviews: 87,
    hospital: "Butaro Hospital",
  },
]

const Appointments = () => {
  const navigate = useNavigate()

  // State variables
  const [specialty, setSpecialty] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [appointmentType, setAppointmentType] = useState("in-person")
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [reason, setReason] = useState("")
  const [insuranceInfo, setInsuranceInfo] = useState("")
  const [memberId, setMemberId] = useState("")
  const [timeSlots, setTimeSlots] = useState([])
  const [step, setStep] = useState(1)
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [bookingConflicts, setBookingConflicts] = useState([])
  const [existingAppointments, setExistingAppointments] = useState([])
  const [successMessage, setSuccessMessage] = useState("")
  const [doctors, setDoctors] = useState([])
  const [error, setError] = useState(null)

  // Format today's date for min date attribute
  const today = new Date()
  const formattedToday = today.toISOString().split("T")[0]

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // In a real implementation, you would fetch doctors from your API
        // For example:
        // const response = await axiosInstance.get('/user/doctors')
        // setDoctors(response.data)
        // setFilteredDoctors(response.data)

        // For now, we'll use the mock data
        setDoctors(MOCK_DOCTORS)
        setFilteredDoctors(MOCK_DOCTORS)
      } catch (error) {
        console.error("Error fetching doctors:", error)
        setError("Failed to load doctors. Please try again.")
      }
    }

    fetchDoctors()
  }, [])

  // Fetch user's existing appointments
  useEffect(() => {
    const fetchExistingAppointments = async () => {
      try {
        const response = await appointmentService.getAppointments()
        setExistingAppointments(response.data || [])
      } catch (error) {
        console.error("Error fetching appointments:", error)
        // We don't show an error message here as this is not critical for the user
      }
    }

    fetchExistingAppointments()
  }, [])

  // Filter doctors when specialty or search changes
  useEffect(() => {
    let filtered = doctors

    if (specialty) {
      filtered = filtered.filter((doctor) => doctor.specialty === specialty)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (doctor) => doctor.name.toLowerCase().includes(query) || doctor.specialty.toLowerCase().includes(query),
      )
    }

    setFilteredDoctors(filtered)
  }, [specialty, searchQuery, doctors])

  // Update locations when doctor is selected
  useEffect(() => {
    if (selectedDoctor) {
      // In a real app, this would fetch locations where the doctor practices
      // Updated with Rwandan locations
      setLocations([selectedDoctor.hospital, "Nyarugenge District Hospital", "Remera Health Center"])
      setSelectedLocation(selectedDoctor.hospital)
    }
  }, [selectedDoctor])

  // Check for booking conflicts when date changes
  useEffect(() => {
    if (selectedDate && existingAppointments.length > 0) {
      const conflicts = existingAppointments.filter((apt) => {
        const aptDate = new Date(apt.date).toISOString().split("T")[0]
        return aptDate === selectedDate
      })

      setBookingConflicts(conflicts)
    } else {
      setBookingConflicts([])
    }
  }, [selectedDate, existingAppointments])

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
    setSelectedTime("") // Reset time when date changes
    setTimeSlots([]) // Clear time slots when date changes
  }

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor)
    setStep(2)
  }

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const checkAvailability = async () => {
    if (!selectedDate || !selectedDoctor) {
      setError("Please select a date and doctor to check availability.")
      return
    }

    setCheckingAvailability(true)
    setError(null)

    try {
      // In a real implementation, you would fetch available time slots from your API
      // For example:
      // const response = await axiosInstance.get(`/availability?doctorId=${selectedDoctor._id}&date=${selectedDate}`)
      // setTimeSlots(response.data.timeSlots)

      // For now, we'll simulate an API call with a timeout
      setTimeout(() => {
        // Generate mock time slots
        const slots = []
        const startHour = 8
        const endHour = 17

        for (let hour = startHour; hour <= endHour; hour++) {
          for (const minutes of ["00", "30"]) {
            // Skip lunch hour
            if (hour === 12 && minutes === "30") continue
            if (hour === 13 && minutes === "00") continue

            const timeString = `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? "PM" : "AM"}`
            const isAvailable = Math.random() > 0.3 // 70% chance of availability for demo

            slots.push({
              time: timeString,
              available: isAvailable,
            })
          }
        }

        setTimeSlots(slots)
        setCheckingAvailability(false)
      }, 1000)
    } catch (error) {
      console.error("Error checking availability:", error)
      setError("Failed to check availability. Please try again.")
      setCheckingAvailability(false)
    }
  }

  // Updated to use the MongoDB ObjectId format and ensure doctor field is included
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!selectedDoctor || !selectedDoctor._id) {
      setError("Please select a doctor to book an appointment.")
      setLoading(false)
      return
    }

    // Format the appointment date and time
    const [time, period] = selectedTime.split(" ")
    const [hours, minutes] = time.split(":")
    let hour = Number.parseInt(hours)
    if (period === "PM" && hour !== 12) {
      hour += 12
    } else if (period === "AM" && hour === 12) {
      hour = 0
    }

    // Create the appointment object with the correct doctor ID format
    const appointmentData = {
      doctor: selectedDoctor._id, // Using the MongoDB ObjectId string
      speciality: selectedDoctor.specialty,
      date: selectedDate, // Send as ISO string
      time: selectedTime,
      type: appointmentType,
      notes: reason,
      location: selectedLocation,
      // The user ID will be extracted from the JWT token on the server
    }

    console.log("Submitting appointment data:", appointmentData)

    try {
      // Use the direct axios instance to have more control over the request
      const response = await axiosInstance.post("/Appointment", appointmentData)

      if (response.data.success) {
        // Create success message
        const message = `Your appointment with ${selectedDoctor.name} has been scheduled for ${formatDate(selectedDate)} at ${selectedTime}.`
        setSuccessMessage(message)

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate("/dashboard")
        }, 2000)
      } else {
        throw new Error(response.data.error || "Failed to create appointment")
      }
    } catch (error) {
      console.error("Error creating appointment:", error)
      setError(error.response?.data?.error || error.message || "Failed to schedule appointment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const goBack = () => {
    setStep(1)
  }

  const clearFilters = () => {
    setSpecialty("")
    setSearchQuery("")
    setFilteredDoctors(doctors)
  }

  // Render star rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push("★")
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push("⯨")
      } else {
        stars.push("☆")
      }
    }

    return stars.join("")
  }

  // Simplified time slot class - just using available or not
  const getTimeSlotClass = (slot, isSelected) => {
    if (!slot.available) {
      return "time-slot unavailable"
    }

    if (isSelected) {
      return "time-slot selected"
    }

    return "time-slot available"
  }

  return (
    <div className="appointment-container">
      <div className="appointment-header">
        <h2>Schedule an Appointment</h2>
        <p>Find available healthcare professionals and book your next visit</p>
      </div>

      {error && (
        <div className="error-message">
          <i className="fa fa-exclamation-circle"></i>
          <p>{error}</p>
        </div>
      )}

      {successMessage ? (
        <div className="success-message">
          <i className="fa fa-check-circle"></i>
          <p>{successMessage}</p>
          <p className="redirecting">Redirecting to dashboard...</p>
        </div>
      ) : (
        <>
          {step === 1 && (
            <div className="find-doctor-section">
              <div className="search-filters">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search by doctor name or keywords"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="search-button2">
                    <i className="fa fa-search"></i>
                  </button>
                </div>

                <div className="filter-options">
                  <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="specialty-select">
                    <option value="">All Specialties</option>
                    {SPECIALTIES.map((spec, index) => (
                      <option key={index} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>

                  <div className="appointment-type-toggle2">
                    <button
                      className={appointmentType === "in-person" ? "active" : ""}
                      onClick={() => setAppointmentType("in-person")}
                    >
                      In-Person
                    </button>
                    <button
                      className={appointmentType === "teleconsultation" ? "active" : ""}
                      onClick={() => setAppointmentType("teleconsultation")}
                    >
                      Virtual
                    </button>
                  </div>

                  <button onClick={clearFilters} className="clear-filters-btn2">
                    Clear Filters
                  </button>
                </div>
              </div>

              <div className="doctors-list2">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <div key={doctor._id} className="doctor-card2" onClick={() => handleDoctorSelect(doctor)}>
                      <div className="doctor-avatar2">
                        <img
                          src={doctor.avatar || "/placeholder.svg"}
                          alt={doctor.name}
                          className="avatar-placeholder"
                        />
                      </div>
                      <div className="doctor-info2">
                        <h3>{doctor.name}</h3>
                        <p className="specialty">{doctor.specialty}</p>
                        <p className="hospital">{doctor.hospital}</p>
                        <div className="doctor-rating">
                          <span className="stars">{"★".repeat(Math.round(doctor.rating))}</span>
                          <span className="rating-number2">
                            {doctor.rating} ({doctor.reviews} reviews)
                          </span>
                        </div>
                        {appointmentType === "teleconsultation" && (
                          <span className="virtual-badge2">Virtual Available</span>
                        )}
                      </div>
                      <button className="select-doctor-btn2">Select</button>
                    </div>
                  ))
                ) : (
                  <div className="no-results2">
                    <p>No doctors found matching your criteria. Try adjusting your filters.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && selectedDoctor && (
            <div className="booking-section">
              <button className="back-button" onClick={goBack}>
                <i className="fa fa-arrow-left"></i> Back to doctor search
              </button>

              <div className="doctor-preview">
                <div className="doctor-avatar">
                  <img
                    src={selectedDoctor.avatar || "/placeholder.svg"}
                    alt={selectedDoctor.name}
                    className="avatar-placeholder"
                  />
                </div>
                <div className="doctor-booking-info">
                  <h3>{selectedDoctor.name}</h3>
                  <p>{selectedDoctor.specialty}</p>
                  <p className="hospital-name">{selectedDoctor.hospital}</p>
                  <p className="appointment-type-label">
                    {appointmentType === "teleconsultation" ? "Virtual Appointment" : "In-Person Visit"}
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
                        {conflict.time} with {conflict.doctor?.name || "Unknown Doctor"} ({conflict.speciality})
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
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group check-availability">
                    <button
                      type="button"
                      className="check-availability-btn-small"
                      onClick={checkAvailability}
                      disabled={!selectedDate || checkingAvailability}
                    >
                      {checkingAvailability ? (
                        <>
                          <i className="fa fa-spinner fa-spin"></i> Checking...
                        </>
                      ) : (
                        "Check Availability"
                      )}
                    </button>
                  </div>
                </div>

                {checkingAvailability && (
                  <div className="loading-spinner-container">
                    <div className="loading-spinner"></div>
                    <p>Checking availability...</p>
                  </div>
                )}

                {selectedDate && timeSlots.length > 0 && !checkingAvailability && (
                  <div className="form-group">
                    <label>Select Time</label>
                    <div className="time-slots">
                      {timeSlots.map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          className={getTimeSlotClass(slot, selectedTime === slot.time)}
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
                      placeholder="e.g. RSSB, MMI, Radiant"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="member-id">Member ID</label>
                    <input
                      id="member-id"
                      type="text"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
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
                      <span className="summary-value">{selectedDate ? formatDate(selectedDate) : "Not selected"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Time:</span>
                      <span className="summary-value">{selectedTime || "Not selected"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Location:</span>
                      <span className="summary-value">{selectedLocation}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Type:</span>
                      <span className="summary-value">
                        {appointmentType === "teleconsultation" ? "Virtual (Video Call)" : "In-Person Visit"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="book-appointment-btn"
                    disabled={!selectedDate || !selectedTime || loading}
                  >
                    {loading ? (
                      <>
                        <i className="fa fa-spinner fa-spin"></i> Processing...
                      </>
                    ) : (
                      "Confirm Appointment"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Appointments

