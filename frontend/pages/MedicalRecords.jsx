import React, { useState, useEffect } from 'react';
import '../styles/medicalrecord.css';

// Translation data
const translations = {
  en: {
    title: "Medical Records",
    searchPlaceholder: "Search your records...",
    tabs: {
      recent: "Recent",
      labResults: "Lab Results",
      medications: "Medications",
      diagnoses: "Diagnoses",
      visits: "Visits"
    },
    buttons: {
      viewDetails: "View Details",
      download: "Download",
      viewReport: "View Report",
      requestRefill: "Request Refill",
      setReminder: "Set Reminder",
      learnMore: "Learn More",
      trackSymptoms: "Track Symptoms",
      viewFullReport: "View Full Report",
      scheduleFollowUp: "Schedule Follow-up",
      downloadAll: "Download All Records",
      shareProvider: "Share with Provider",
      print: "Print Records"
    },
    summary: {
      activeMedications: "Active Medications",
      recentLabResults: "Recent Lab Results",
      activeConditions: "Active Conditions",
      upcomingAppointment: "Upcoming Appointment"
    },
    details: {
      results: "Results:",
      refillsRemaining: "Refills Remaining:",
      ends: "Ends:",
      notes: "Notes:",
      diagnosedBy: "By:",
      prescribed: "Prescribed:",
      reason: "Reason:",
      summary: "Summary:"
    }
  },
  rw: {
    title: "Inyandiko z'Ubuvuzi",
    searchPlaceholder: "Shakisha inyandiko zawe...",
    tabs: {
      recent: "Vuba aha",
      labResults: "Ibyavuye mu ipimwa",
      medications: "Imiti",
      diagnoses: "Indwara",
      visits: "Gusura"
    },
    buttons: {
      viewDetails: "Reba Ibisobanuro",
      download: "Kuramo",
      viewReport: "Reba Raporo",
      requestRefill: "Saba Kongera",
      setReminder: "Shyiraho Urwibutso",
      learnMore: "Menya Byinshi",
      trackSymptoms: "Kurikirana Ibimenyetso",
      viewFullReport: "Reba Raporo Yuzuye",
      scheduleFollowUp: "Tegura Gukurikirana",
      downloadAll: "Kuramo Inyandiko Zose",
      shareProvider: "Gusangiza Umuganga",
      print: "Gucapa Inyandiko"
    },
    summary: {
      activeMedications: "Imiti Ikoreshwa",
      recentLabResults: "Ibipimo Vuba",
      activeConditions: "Indwara Ziriho",
      upcomingAppointment: "Gahunda Itegerejwe"
    },
    details: {
      results: "Ibisubizo:",
      refillsRemaining: "Kongera Bisigaye:",
      ends: "Birangira:",
      notes: "Inyandiko:",
      diagnosedBy: "Byakozwe na:",
      prescribed: "Byanditswe:",
      reason: "Impamvu:",
      summary: "Incamake:"
    }
  }
};

const MedicalRecords = () => {
  // State for different categories of medical records
  const [activeTab, setActiveTab] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState({});
  
  // Get translations based on selected language
  const t = translations[language];
  
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

  // Handle search
  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
    // Search functionality is already implemented with the filteredData
  };

  // Handle view details/report
  const handleViewDetails = (item) => {
    setModalContent(item);
    setIsModalOpen(true);
  };

  // Handle download
  const handleDownload = (id) => {
    setDownloadStatus(prev => ({ ...prev, [id]: 'downloading' }));
    
    // Simulate download
    setTimeout(() => {
      setDownloadStatus(prev => ({ ...prev, [id]: 'completed' }));
      
      // Reset after 2 seconds
      setTimeout(() => {
        setDownloadStatus(prev => ({ ...prev, [id]: null }));
      }, 2000);
    }, 1500);
  };

  // Handle download all
  const handleDownloadAll = () => {
    alert(language === 'en' ? 
      'Downloading all medical records as PDF...' : 
      'Kumanura inyandiko zose z ubuvuzi nka PDF...');
  };

  // Handle share with provider
  const handleShareWithProvider = () => {
    alert(language === 'en' ? 
      'Please select a healthcare provider to share your records with.' : 
      'Hitamo umuganga wo gusangiza inyandiko zawe.');
  };

  // Handle print records
  const handlePrintRecords = () => {
    window.print();
  };

  // Handle request refill
  const handleRequestRefill = (medication) => {
    alert(language === 'en' ? 
      `Requesting refill for ${medication.name} ${medication.dosage}` : 
      `Gusaba kongera ${medication.name} ${medication.dosage}`);
  };

  // Handle set reminder
  const handleSetReminder = (medication) => {
    alert(language === 'en' ? 
      `Setting reminder for ${medication.name} ${medication.dosage}` : 
      `Gushyiraho urwibutso rwa ${medication.name} ${medication.dosage}`);
  };

  // Handle learn more
  const handleLearnMore = (diagnosis) => {
    window.open(`https://example.com/conditions/${diagnosis.name.toLowerCase().replace(/ /g, '-')}`, '_blank');
  };

  // Handle track symptoms
  const handleTrackSymptoms = (diagnosis) => {
    alert(language === 'en' ? 
      `Opening symptom tracker for ${diagnosis.name}` : 
      `Gufungura igikoresho cyo gukurikirana ibimenyetso bya ${diagnosis.name}`);
  };

  // Handle schedule follow-up
  const handleScheduleFollowUp = (visit) => {
    alert(language === 'en' ? 
      `Scheduling follow-up appointment with ${visit.doctor}` : 
      `Gutegura gahunda yo gukurikirana na ${visit.doctor}`);
  };

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
              <button 
                className="med-btn-view"
                onClick={() => handleViewDetails(record)}
              >
                {t.buttons.viewDetails}
              </button>
              <button 
                className={`med-btn-download ${downloadStatus[record.id] ? 'med-btn-' + downloadStatus[record.id] : ''}`}
                onClick={() => handleDownload(record.id)}
                disabled={downloadStatus[record.id] === 'downloading'}
              >
                {downloadStatus[record.id] === 'downloading' ? '...' : 
                 downloadStatus[record.id] === 'completed' ? '✓' : t.buttons.download}
              </button>
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
              <h4>{t.details.results}</h4>
              <p>{lab.results}</p>
            </div>
            <div className="med-record-actions">
              <button 
                className="med-btn-view"
                onClick={() => handleViewDetails(lab)}
              >
                {t.buttons.viewReport}
              </button>
              <button 
                className={`med-btn-download ${downloadStatus[lab.id] ? 'med-btn-' + downloadStatus[lab.id] : ''}`}
                onClick={() => handleDownload(lab.id)}
                disabled={downloadStatus[lab.id] === 'downloading'}
              >
                {downloadStatus[lab.id] === 'downloading' ? '...' : 
                 downloadStatus[lab.id] === 'completed' ? '✓' : t.buttons.download}
              </button>
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
            <p className="med-record-date">{t.details.prescribed} {med.date}</p>
            <p className="med-record-doctor">{t.details.diagnosedBy} {med.prescriber}</p>
            <p className="med-record-instructions">{med.instructions}</p>
            <div className="med-record-details">
              <p><span>{t.details.refillsRemaining}</span> {med.refills}</p>
              <p><span>{t.details.ends}</span> {med.endDate}</p>
            </div>
            <div className="med-record-actions">
              <button 
                className="med-btn-refill"
                onClick={() => handleRequestRefill(med)}
              >
                {t.buttons.requestRefill}
              </button>
              <button 
                className="med-btn-reminder"
                onClick={() => handleSetReminder(med)}
              >
                {t.buttons.setReminder}
              </button>
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
            <p className="med-record-doctor">{t.details.diagnosedBy} {diagnosis.doctor}</p>
            <div className="med-record-notes">
              <h4>{t.details.notes}</h4>
              <p>{diagnosis.notes}</p>
            </div>
            <div className="med-record-actions">
              <button 
                className="med-btn-info"
                onClick={() => handleLearnMore(diagnosis)}
              >
                {t.buttons.learnMore}
              </button>
              <button 
                className="med-btn-track"
                onClick={() => handleTrackSymptoms(diagnosis)}
              >
                {t.buttons.trackSymptoms}
              </button>
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
            <p className="med-record-reason">{t.details.reason} {visit.reason}</p>
            <div className="med-record-summary">
              <h4>{t.details.summary}</h4>
              <p>{visit.summary}</p>
            </div>
            <div className="med-record-actions">
              <button 
                className="med-btn-view"
                onClick={() => handleViewDetails(visit)}
              >
                {t.buttons.viewFullReport}
              </button>
              <button 
                className="med-btn-follow"
                onClick={() => handleScheduleFollowUp(visit)}
              >
                {t.buttons.scheduleFollowUp}
              </button>
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

  const renderModal = () => {
    if (!isModalOpen || !modalContent) return null;

    return (
      <div className="med-modal-overlay" onClick={() => setIsModalOpen(false)}>
        <div className="med-modal-content" onClick={e => e.stopPropagation()}>
          <div className="med-modal-header">
            <h2>{modalContent.type || modalContent.name}</h2>
            <button className="med-modal-close" onClick={() => setIsModalOpen(false)}>×</button>
          </div>
          <div className="med-modal-body">
            {Object.entries(modalContent).map(([key, value]) => {
              if (key === 'id' || key === 'type' || key === 'name') return null;
              return (
                <div key={key} className="med-modal-item">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> {value}
                </div>
              );
            })}
          </div>
          <div className="med-modal-footer">
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="med-records-container">
      <div className="med-records-header">
        <h1>{t.title}</h1>
        <div className="med-language-selector">
          <button 
            className={`med-language-btn ${language === 'en' ? 'med-active' : ''}`} 
            onClick={() => setLanguage('en')}
          >
            English
          </button>
          <button 
            className={`med-language-btn ${language === 'rw' ? 'med-active' : ''}`} 
            onClick={() => setLanguage('rw')}
          >
            Kinyarwanda
          </button>
        </div>
        <div className="med-search-container">
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="med-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="med-search-btn" onClick={handleSearch}>
            <i className="search-icon">🔍</i>
          </button>
        </div>
      </div>

      <div className="med-tabs">
        <button 
          className={`med-tab ${activeTab === 'recent' ? 'med-active' : ''}`}
          onClick={() => setActiveTab('recent')}
        >
          {t.tabs.recent}
        </button>
        <button 
          className={`med-tab ${activeTab === 'lab-results' ? 'med-active' : ''}`}
          onClick={() => setActiveTab('lab-results')}
        >
          {t.tabs.labResults}
        </button>
        <button 
          className={`med-tab ${activeTab === 'medications' ? 'med-active' : ''}`}
          onClick={() => setActiveTab('medications')}
        >
          {t.tabs.medications}
        </button>
        <button 
          className={`med-tab ${activeTab === 'diagnoses' ? 'med-active' : ''}`}
          onClick={() => setActiveTab('diagnoses')}
        >
          {t.tabs.diagnoses}
        </button>
        <button 
          className={`med-tab ${activeTab === 'visits' ? 'med-active' : ''}`}
          onClick={() => setActiveTab('visits')}
        >
          {t.tabs.visits}
        </button>
      </div>

      <div className="med-records-summary">
        <div className="med-summary-card">
          <h3>{filteredData.medications.length}</h3>
          <p>{t.summary.activeMedications}</p>
        </div>
        <div className="med-summary-card">
          <h3>{filteredData.labResults.length}</h3>
          <p>{t.summary.recentLabResults}</p>
        </div>
        <div className="med-summary-card">
          <h3>{filteredData.diagnoses.length}</h3>
          <p>{t.summary.activeConditions}</p>
        </div>
        <div className="med-summary-card med-alert">
          <h3>1</h3>
          <p>{t.summary.upcomingAppointment}</p>
        </div>
      </div>

      <div className="med-content">
        {renderContent()}
      </div>

      <div className="med-actions-footer">
        <button 
          className="med-btn-primary"
          onClick={handleDownloadAll}
        >
          {t.buttons.downloadAll}
        </button>
        <button 
          className="med-btn-secondary"
          onClick={handleShareWithProvider}
        >
          {t.buttons.shareProvider}
        </button>
        <button 
          className="med-btn-secondary"
          onClick={handlePrintRecords}
        >
          {t.buttons.print}
        </button>
      </div>

      {renderModal()}
    </div>
  );
};

export default MedicalRecords;