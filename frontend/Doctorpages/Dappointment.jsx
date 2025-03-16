import React, { useState } from 'react';
import '../Dstyles/Dappointment.css';

const Dappointment = () => {
  // Sample appointment data
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      patientName: 'John Doe', 
      time: '10:00 AM', 
      date: '2025-03-16',
      type: 'Follow-up',
      status: 'Scheduled',
      notes: 'Post-surgery checkup',
      contact: '+1 (555) 123-4567',
      medicalHistory: 'Cardiac surgery 2 months ago'
    },
    { 
      id: 2, 
      patientName: 'Sarah Johnson', 
      time: '11:30 AM', 
      date: '2025-03-16',
      type: 'Consultation',
      status: 'Checked-in',
      notes: 'New patient consultation',
      contact: '+1 (555) 234-5678',
      medicalHistory: 'Hypertension, Diabetes'
    },
    { 
      id: 3, 
      patientName: 'Michael Brown', 
      time: '1:15 PM', 
      date: '2025-03-16',
      type: 'Test Results',
      status: 'Waiting',
      notes: 'Review of recent echocardiogram',
      contact: '+1 (555) 345-6789',
      medicalHistory: 'Atrial fibrillation'
    },
    { 
      id: 4, 
      patientName: 'Emily Davis', 
      time: '2:45 PM', 
      date: '2025-03-16',
      type: 'First Visit',
      status: 'Scheduled',
      notes: 'New patient referral from Dr. Wilson',
      contact: '+1 (555) 456-7890',
      medicalHistory: 'None'
    },
    { 
      id: 5, 
      patientName: 'Robert Wilson', 
      time: '4:00 PM', 
      date: '2025-03-16',
      type: 'Prescription Renewal',
      status: 'Scheduled',
      notes: 'Monthly medication review',
      contact: '+1 (555) 567-8901',
      medicalHistory: 'Coronary artery disease, Hyperlipidemia'
    }
  ]);

  // State for managing the active filters
  const [activeFilter, setActiveFilter] = useState('today');

  // State for managing the selected appointment for details view
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Function to filter appointments based on selected filter
  const filterAppointments = () => {
    // In a real application, this would filter based on actual dates
    return appointments;
  };

  // Function to handle appointment status changes
  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: newStatus } : appointment
    ));
  };

  // Function to handle starting an appointment
  const startAppointment = (id) => {
    alert(`Starting appointment with patient ID: ${id}`);
    updateAppointmentStatus(id, 'In Progress');
    // In a real app, this would redirect to a patient consultation page
  };

  // Function to view appointment details
  const viewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  // Function to close the details modal
  const closeDetailsModal = () => {
    setSelectedAppointment(null);
  };

  return (
    <div className="dappointment-container">
      <div className="dappointment-header">
        <h2>Appointments</h2>
        <div className="dappointment-filters">
          <button 
            className={activeFilter === 'today' ? 'active' : ''} 
            onClick={() => setActiveFilter('today')}
          >
            Today
          </button>
          <button 
            className={activeFilter === 'upcoming' ? 'active' : ''} 
            onClick={() => setActiveFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={activeFilter === 'past' ? 'active' : ''} 
            onClick={() => setActiveFilter('past')}
          >
            Past
          </button>
        </div>
        <div className="dappointment-actions">
          <button className="new-appointment-btn">+ New Appointment</button>
        </div>
      </div>

      <div className="dappointment-list">
        <div className="dappointment-list-header">
          <span>Patient</span>
          <span>Time</span>
          <span>Type</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {filterAppointments().map(appointment => (
          <div key={appointment.id} className="dappointment-item">
            <div className="patient-info">
              <span className="patient-name">{appointment.patientName}</span>
            </div>
            <div className="appointment-time">{appointment.time}</div>
            <div className="appointment-type">{appointment.type}</div>
            <div className="appointment-status">
              <span className={`status-badge ${appointment.status.toLowerCase().replace(' ', '-')}`}>
                {appointment.status}
              </span>
            </div>
            <div className="appointment-actions">
              <button className="view-btn" onClick={() => viewAppointmentDetails(appointment)}>View</button>
              {appointment.status !== 'Completed' && appointment.status !== 'In Progress' && (
                <button className="start-btn" onClick={() => startAppointment(appointment.id)}>Start</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedAppointment && (
        <div className="appointment-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Appointment Details</h3>
              <button className="close-btn" onClick={closeDetailsModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Patient:</span>
                <span className="detail-value">{selectedAppointment.patientName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{selectedAppointment.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{selectedAppointment.time}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{selectedAppointment.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value">
                  <span className={`status-badge ${selectedAppointment.status.toLowerCase().replace(' ', '-')}`}>
                    {selectedAppointment.status}
                  </span>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Contact:</span>
                <span className="detail-value">{selectedAppointment.contact}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Notes:</span>
                <span className="detail-value">{selectedAppointment.notes}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Medical History:</span>
                <span className="detail-value">{selectedAppointment.medicalHistory}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeDetailsModal}>Close</button>
              {selectedAppointment.status !== 'Completed' && selectedAppointment.status !== 'In Progress' && (
                <button className="confirm-btn" onClick={() => startAppointment(selectedAppointment.id)}>Start Appointment</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dappointment;