import React, { useState } from 'react';
import '../styles/medicalrecord.css';

const MedicalRecords = () => {
  // State for different categories of medical records
  const [activeTab, setActiveTab] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample medical data
  const medicalData = {
    recent: [
      { id: 1, date: 'February 28, 2025', type: 'Lab Results', doctor: 'Dr. Sarah Johnson', description: 'Blood Work - Lipid Panel', status: 'Reviewed', urgent: false },
      { id: 2, date: 'February 22, 2025', type: 'Prescription', doctor: 'Dr. Sarah Johnson', description: 'Lisinopril 10mg', status: 'Active', urgent: false },
      { id: 3, date: 'February 15, 2025', type: 'Diagnosis', doctor: 'Dr. Sarah Johnson', description: 'Hypertension - Stage 1', status: 'Active', urgent: true },
    ],
    labResults: [
      { id: 1, date: 'February 28, 2025', type: 'Blood Work', doctor: 'Dr. Sarah Johnson', description: 'Lipid Panel', status: 'Reviewed', results: 'Total Cholesterol: 210mg/dL, HDL: 45mg/dL, LDL: 130mg/dL, Triglycerides: 180mg/dL' },
      { id: 4, date: 'January 28, 2025', type: 'Blood Work', doctor: 'Dr. Sarah Johnson', description: 'CBC', status: 'Reviewed', results: 'WBC: 7.5, RBC: 4.8, Hemoglobin: 14.2g/dL, Platelets: 250' },
      { id: 5, date: 'December 12, 2024', type: 'Urinalysis', doctor: 'Dr. Robert Chen', description: 'Routine Urinalysis', status: 'Reviewed', results: 'No abnormalities detected' },
    ],
    medications: [
      { id: 2, date: 'February 22, 2025', name: 'Lisinopril', dosage: '10mg', instructions: 'Take once daily', prescriber: 'Dr. Sarah Johnson', refills: 3, endDate: 'August 22, 2025' },
      { id: 6, date: 'January 15, 2025', name: 'Atorvastatin', dosage: '20mg', instructions: 'Take once daily at bedtime', prescriber: 'Dr. Sarah Johnson', refills: 2, endDate: 'July 15, 2025' },
      { id: 7, date: 'December 05, 2024', name: 'Metformin', dosage: '500mg', instructions: 'Take twice daily with meals', prescriber: 'Dr. Robert Chen', refills: 0, endDate: 'June 05, 2025' },
    ],
    diagnoses: [
      { id: 3, date: 'February 15, 2025', name: 'Hypertension - Stage 1', doctor: 'Dr. Sarah Johnson', status: 'Active', notes: 'Monitor BP regularly, follow up in 1 month' },
      { id: 8, date: 'December 05, 2024', name: 'Type 2 Diabetes', doctor: 'Dr. Robert Chen', status: 'Active', notes: 'A1C: 6.8%, Follow DASH diet, increase physical activity' },
      { id: 9, date: 'October 10, 2024', name: 'Seasonal Allergies', doctor: 'Dr. Emma Wilson', status: 'Intermittent', notes: 'Use antihistamines as needed during high pollen seasons' },
    ],
    visits: [
      { id: 10, date: 'February 15, 2025', type: 'Cardiology', doctor: 'Dr. Sarah Johnson', reason: 'Hypertension Follow-up', summary: 'BP readings still elevated, medication adjusted, follow up in 1 month' },
      { id: 11, date: 'December 05, 2024', type: 'Primary Care', doctor: 'Dr. Robert Chen', reason: 'Annual Physical', summary: 'Discovered elevated blood glucose, diagnosed Type 2 Diabetes, started on medication' },
      { id: 12, date: 'October 10, 2024', type: 'Allergy & Immunology', doctor: 'Dr. Emma Wilson', reason: 'Persistent Sneezing', summary: 'Diagnosed with seasonal allergies, prescribed antihistamines' },
    ],
  };

  // Filter data based on search query
  const filteredData = searchQuery ? 
    Object.keys(medicalData).reduce((result, category) => {
      result[category] = medicalData[category].filter(item => 
        JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
      );
      return result;
    }, {}) : 
    medicalData;

  const renderRecentRecords = () => {
    return (
      <div className="med-records-list">
        {filteredData.recent.map(record => (
          <div key={record.id} className={`med-record-card ${record.urgent ? 'med-urgent' : ''}`}>
            <div className="med-record-header">
              <h3>{record.type}</h3>
              <span className={`med-status ${record.status.toLowerCase().replace(' ', '-')}`}>{record.status}</span>
            </div>
            <p className="med-record-date">{record.date}</p>
            <p className="med-record-doctor">{record.doctor}</p>
            <p className="med-record-description">{record.description}</p>
            <div className="med-record-actions">
              <button className="med-btn-view">View Details</button>
              <button className="med-btn-download">Download</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderLabResults = () => {
    return (
      <div className="med-records-list">
        {filteredData.labResults.map(lab => (
          <div key={lab.id} className="med-record-card">
            <div className="med-record-header">
              <h3>{lab.type}</h3>
              <span className={`med-status ${lab.status.toLowerCase().replace(' ', '-')}`}>{lab.status}</span>
            </div>
            <p className="med-record-date">{lab.date}</p>
            <p className="med-record-doctor">{lab.doctor}</p>
            <p className="med-record-description">{lab.description}</p>
            <div className="med-record-results">
              <h4>Results:</h4>
              <p>{lab.results}</p>
            </div>
            <div className="med-record-actions">
              <button className="med-btn-view">View Report</button>
              <button className="med-btn-download">Download</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMedications = () => {
    return (
      <div className="med-records-list">
        {filteredData.medications.map(med => (
          <div key={med.id} className="med-record-card">
            <div className="med-record-header">
              <h3>{med.name}</h3>
              <span className="med-dosage">{med.dosage}</span>
            </div>
            <p className="med-record-date">Prescribed: {med.date}</p>
            <p className="med-record-doctor">By: {med.prescriber}</p>
            <p className="med-record-instructions">{med.instructions}</p>
            <div className="med-record-details">
              <p><span>Refills Remaining:</span> {med.refills}</p>
              <p><span>Ends:</span> {med.endDate}</p>
            </div>
            <div className="med-record-actions">
              <button className="med-btn-refill">Request Refill</button>
              <button className="med-btn-reminder">Set Reminder</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderDiagnoses = () => {
    return (
      <div className="med-records-list">
        {filteredData.diagnoses.map(diagnosis => (
          <div key={diagnosis.id} className="med-record-card">
            <div className="med-record-header">
              <h3>{diagnosis.name}</h3>
              <span className={`med-status ${diagnosis.status.toLowerCase().replace(' ', '-')}`}>{diagnosis.status}</span>
            </div>
            <p className="med-record-date">Diagnosed: {diagnosis.date}</p>
            <p className="med-record-doctor">By: {diagnosis.doctor}</p>
            <div className="med-record-notes">
              <h4>Notes:</h4>
              <p>{diagnosis.notes}</p>
            </div>
            <div className="med-record-actions">
              <button className="med-btn-info">Learn More</button>
              <button className="med-btn-track">Track Symptoms</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderVisits = () => {
    return (
      <div className="med-records-list">
        {filteredData.visits.map(visit => (
          <div key={visit.id} className="med-record-card">
            <div className="med-record-header">
              <h3>{visit.type} Visit</h3>
              <span className="med-visit-date">{visit.date}</span>
            </div>
            <p className="med-record-doctor">{visit.doctor}</p>
            <p className="med-record-reason">Reason: {visit.reason}</p>
            <div className="med-record-summary">
              <h4>Summary:</h4>
              <p>{visit.summary}</p>
            </div>
            <div className="med-record-actions">
              <button className="med-btn-view">View Full Report</button>
              <button className="med-btn-follow">Schedule Follow-up</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'recent':
        return renderRecentRecords();
      case 'lab-results':
        return renderLabResults();
      case 'medications':
        return renderMedications();
      case 'diagnoses':
        return renderDiagnoses();
      case 'visits':
        return renderVisits();
      default:
        return renderRecentRecords();
    }
  };

  return (
    <div className="med-records-container">
      <div className="med-records-header">
        <h1>Medical Records</h1>
        <div className="med-search-container">
          <input 
            type="text" 
            placeholder="Search your records..." 
            className="med-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="med-search-btn">
            <i className="search-icon">🔍</i>
          </button>
        </div>
      </div>

      <div className="med-tabs">
        <button 
          className={`med-tab ${activeTab === 'recent' ? 'med-active' : ''}`}
          onClick={() => setActiveTab('recent')}
        >
          Recent
        </button>
        <button 
          className={`med-tab ${activeTab === 'lab-results' ? 'med-active' : ''}`}
          onClick={() => setActiveTab('lab-results')}
        >
          Lab Results
        </button>
        <button 
          className={`med-tab ${activeTab === 'medications' ? 'med-active' : ''}`}
          onClick={() => setActiveTab('medications')}
        >
          Medications
        </button>
        <button 
          className={`med-tab ${activeTab === 'diagnoses' ? 'med-active' : ''}`}
          onClick={() => setActiveTab('diagnoses')}
        >
          Diagnoses
        </button>
        <button 
          className={`med-tab ${activeTab === 'visits' ? 'med-active' : ''}`}
          onClick={() => setActiveTab('visits')}
        >
          Visits
        </button>
      </div>

      <div className="med-records-summary">
        <div className="med-summary-card">
          <h3>3</h3>
          <p>Active Medications</p>
        </div>
        <div className="med-summary-card">
          <h3>2</h3>
          <p>Recent Lab Results</p>
        </div>
        <div className="med-summary-card">
          <h3>3</h3>
          <p>Active Conditions</p>
        </div>
        <div className="med-summary-card med-alert">
          <h3>1</h3>
          <p>Upcoming Appointment</p>
        </div>
      </div>

      <div className="med-content">
        {renderContent()}
      </div>

      <div className="med-actions-footer">
        <button className="med-btn-primary">Download All Records</button>
        <button className="med-btn-secondary">Share with Provider</button>
        <button className="med-btn-secondary">Print Records</button>
      </div>
    </div>
  );
};

export default MedicalRecords;