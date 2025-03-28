import axios from "axios"

// API configuration
const API_URL = 'https://evuriro-backend.onrender.com';


// Create axios instance with default config
const apiService = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests
apiService.interceptors.request.use(
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

// Handle response errors globally
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Appointment service
export const appointmentService = {
  // Get all appointments for the logged-in user
  getAppointments: async () => {
    try {
      const response = await apiService.get("/Appointment")
      return response.data
    } catch (error) {
      console.error("Error fetching appointments:", error)
      throw error
    }
  },

  // Get a single appointment by ID
  getAppointment: async (id) => {
    try {
      const response = await apiService.get(`/Appointment/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching appointment ${id}:`, error)
      throw error
    }
  },

  // Create a new appointment
  createAppointment: async (appointmentData) => {
    try {
      const response = await apiService.post("/Appointment", appointmentData)
      return response.data
    } catch (error) {
      console.error("Error creating appointment:", error)
      throw error
    }
  },

  // Update an existing appointment
  updateAppointment: async (id, appointmentData) => {
    try {
      const response = await apiService.put(`/Appointment/${id}`, appointmentData)
      return response.data
    } catch (error) {
      console.error(`Error updating appointment ${id}:`, error)
      throw error
    }
  },

  // Delete an appointment
  deleteAppointment: async (id) => {
    try {
      const response = await apiService.delete(`/Appointment/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting appointment ${id}:`, error)
      throw error
    }
  },
}

export default apiService

