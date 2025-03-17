import React, { useState } from 'react';
import '../Dstyles/Dappointment.css';

const DAppointment = () => {
  // Sample appointment data for different tabs
  const [todayAppointments] = useState([
    { 
      id: 1, 
      patientName: 'John Doe', 
      time: '10:00 AM', 
      type: 'Follow-up',
      status: 'Scheduled'
    },
    { 
      id: 2, 
      patientName: 'Sarah Johnson', 
      time: '11:30 AM', 
      type: 'Consultation',
      status: 'Checked-in'
    },
    { 
      id: 3, 
      patientName: 'Michael Brown', 
      time: '1:15 PM', 
      type: 'Test Results',
      status: 'Waiting'
    },
    { 
      id: 4, 
      patientName: 'Emily Davis', 
      time: '2:45 PM', 
      type: 'First Visit',
      status: 'Scheduled'
    },
    { 
      id: 5, 
      patientName: 'Robert Wilson', 
      time: '4:00 PM', 
      type: 'Prescription Renewal',
      status: 'Scheduled'
    }
  ]);

  const [upcomingAppointments] = useState([
    { 
      id: 6, 
      patientName: 'Thomas Anderson', 
      time: '9:30 AM', 
      date: 'Tomorrow',
      type: 'Annual Check-up',
      status: 'Scheduled'
    },
    { 
      id: 7, 
      patientName: 'Jennifer Lopez', 
      time: '2:00 PM', 
      date: 'Tomorrow',
      type: 'Follow-up',
      status: 'Scheduled'
    },
    { 
      id: 8, 
      patientName: 'William Smith', 
      time: '11:00 AM', 
      date: '19/03/2025',
      type: 'Consultation',
      status: 'Scheduled'
    }
  ]);

  const [pastAppointments] = useState([
    { 
      id: 9, 
      patientName: 'Emma Wilson', 
      time: '10:30 AM', 
      date: '16/03/2025',
      type: 'Follow-up',
      status: 'Completed'
    },
    { 
      id: 10, 
      patientName: 'James Brown', 
      time: '3:15 PM', 
      date: '15/03/2025',
      type: 'Test Results',
      status: 'Completed'
    },
    { 
      id: 11, 
      patientName: 'Olivia Martinez', 
      time: '9:00 AM', 
      date: '14/03/2025',
      type: 'First Visit',
      status: 'Cancelled'
    }
  ]);

  // State for managing the active tab
  const [activeTab, setActiveTab] = useState('today');

  // State for managing the new appointment form
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    date: '',
    time: '',
    type: 'Consultation',
    status: 'Scheduled'
  });

  // Function to get appointments based on active tab
  const getAppointments = () => {
    switch(activeTab) {
      case 'upcoming':
        return upcomingAppointments;
      case 'past':
        return pastAppointments;
      default:
        return todayAppointments;
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to handle new appointment submission
  const handleNewAppointmentSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would add the appointment to the database
    alert(`New appointment created for ${newAppointment.patientName} on ${newAppointment.date} at ${newAppointment.time}`);
    setShowNewAppointmentForm(false);
    setNewAppointment({
      patientName: '',
      date: '',
      time: '',
      type: 'Consultation',
      status: 'Scheduled'
    });
  };

  // Function to handle starting an appointment
  const startAppointment = (id) => {
    alert(`Starting appointment with patient ID: ${id}`);
    // In a real app, this would change the appointment status and redirect to a patient console
  };

  return (
    <div className="dappointment-container">
      <div className="dappointment-header">
        <h2>Appointments</h2>
        <div className="dappointment-tabs">
          <button 
            className={activeTab === 'today' ? 'active' : ''} 
            onClick={() => setActiveTab('today')}
          >
            Today
          </button>
          <button 
            className={activeTab === 'upcoming' ? 'active' : ''} 
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={activeTab === 'past' ? 'active' : ''} 
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
        </div>
        <button 
          className="new-appointment-btn"
          onClick={() => setShowNewAppointmentForm(true)}
        >
          + New Appointment
        </button>
      </div>

      <div className="dappointment-table">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Time</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getAppointments().map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>
                  {appointment.time}
                  {appointment.date && activeTab !== 'today' && (
                    <span className="appointment-date">{appointment.date}</span>
                  )}
                </td>
                <td>{appointment.type}</td>
                <td>
                  <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="view-btn">View</button>
                  {(appointment.status === 'Scheduled' || appointment.status === 'Checked-in' || appointment.status === 'Waiting') && (
                    <button className="start-btn" onClick={() => startAppointment(appointment.id)}>Start</button>
                  )}
                </td>
              </tr>
            ))}
            {getAppointments().length === 0 && (
              <tr>
                <td colSpan="5" className="no-appointments">
                  No appointments found for this period.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New Appointment Form Modal */}
      {showNewAppointmentForm && (
        <div className="modal-overlay">
          <div className="appointment-form-modal">
            <div className="modal-header">
              <h3>New Appointment</h3>
              <button 
                className="close-btn"
                onClick={() => setShowNewAppointmentForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleNewAppointmentSubmit}>
              <div className="form-group">
                <label htmlFor="patientName">Patient Name</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={newAppointment.patientName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newAppointment.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={newAppointment.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="type">Appointment Type</label>
                <select
                  id="type"
                  name="type"
                  value={newAppointment.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Test Results">Test Results</option>
                  <option value="First Visit">First Visit</option>
                  <option value="Prescription Renewal">Prescription Renewal</option>
                </select>
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowNewAppointmentForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">Create Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DAppointment;