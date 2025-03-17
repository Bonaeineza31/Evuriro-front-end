import React, { useState, useEffect } from 'react';
import './DmedicalRecords.css';
import { FaSearch, FaFilter, FaPlus, FaFileDownload, FaFilePdf, FaFileExcel, FaTrash, FaEdit, FaEye, FaHistory, FaCalendarAlt, FaChartLine, FaStethoscope, FaList, FaUserMd, FaHeartbeat, FaLungs, FaFileMedical } from 'react-icons/fa';

const DmedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [sortField, setSortField] = useState('diagnosisDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [activeTab, setActiveTab] = useState('details');
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const [newRecord, setNewRecord] = useState({
    patientId: '',
    patientName: '',
    diagnosisDate: '',
    diagnosis: '',
    symptoms: '',
    treatment: '',
    medications: '',
    labResults: '',
    notes: '',
    followUpDate: '',
    status: 'active',
    category: 'general',
    vitalSigns: {
      bloodPressure: '',
      heartRate: '',
      respiratoryRate: '',
      temperature: '',
      oxygenSaturation: ''
    },
    medicalHistory: [],
    allergies: '',
    doctorNotes: '',
    priority: 'normal',
    attachments: []
  });

  // Simulated data categories
  const categories = [
    { id: 'all', name: 'All Records', icon: <FaList /> },
    { id: 'general', name: 'General', icon: <FaStethoscope /> },
    { id: 'cardiology', name: 'Cardiology', icon: <FaHeartbeat /> },
    { id: 'pulmonology', name: 'Pulmonology', icon: <FaLungs /> },
    { id: 'followup', name: 'Follow-ups', icon: <FaCalendarAlt /> }
  ];

  // Simulated data for demonstration
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        patientId: 'P-1024',
        patientName: 'John Doe',
        diagnosisDate: '2025-03-10',
        diagnosis: 'Hypertension',
        symptoms: 'Headache, dizziness, shortness of breath',
        treatment: 'Prescribed antihypertensive medication',
        medications: 'Lisinopril 10mg daily',
        labResults: 'BP: 150/95, Cholesterol: 220mg/dL',
        notes: 'Patient advised on dietary changes and regular exercise',
        followUpDate: '2025-04-10',
        status: 'active',
        category: 'cardiology',
        vitalSigns: {
          bloodPressure: '150/95',
          heartRate: '86',
          respiratoryRate: '18',
          temperature: '98.6',
          oxygenSaturation: '98%'
        },
        medicalHistory: [
          { date: '2024-10-15', condition: 'Annual checkup', notes: 'BP slightly elevated' },
          { date: '2023-05-20', condition: 'Influenza', notes: 'Recovered completely' }
        ],
        allergies: 'None reported',
        doctorNotes: 'Patient seems to be responding well to medication. Will need to monitor BP closely.',
        priority: 'high',
        attachments: [
          { name: 'EKG_Results.pdf', type: 'pdf' },
          { name: 'BP_Chart.xlsx', type: 'excel' }
        ]
      },
      {
        id: 2,
        patientId: 'P-1568',
        patientName: 'Sarah Johnson',
        diagnosisDate: '2025-02-15',
        diagnosis: 'Influenza',
        symptoms: 'Fever, cough, body aches',
        treatment: 'Rest, fluids, antiviral medication',
        medications: 'Oseltamivir 75mg twice daily for 5 days',
        labResults: 'Positive for Influenza A',
        notes: 'Patient advised to rest at home and avoid contact with others',
        followUpDate: '2025-02-22',
        status: 'completed',
        category: 'general',
        vitalSigns: {
          bloodPressure: '120/80',
          heartRate: '92',
          respiratoryRate: '22',
          temperature: '101.3',
          oxygenSaturation: '97%'
        },
        medicalHistory: [
          { date: '2024-09-10', condition: 'Annual checkup', notes: 'All normal' },
          { date: '2023-12-05', condition: 'Bronchitis', notes: 'Treated with antibiotics' }
        ],
        allergies: 'Penicillin',
        doctorNotes: 'Patient has recovered well. No complications observed.',
        priority: 'normal',
        attachments: [
          { name: 'Flu_Test_Results.pdf', type: 'pdf' }
        ]
      },
      {
        id: 3,
        patientId: 'P-2187',
        patientName: 'Michael Brown',
        diagnosisDate: '2025-03-05',
        diagnosis: 'Type 2 Diabetes',
        symptoms: 'Increased thirst, frequent urination, fatigue',
        treatment: 'Dietary changes, exercise, oral medication',
        medications: 'Metformin 500mg twice daily',
        labResults: 'HbA1c: 7.5%, Fasting glucose: 140mg/dL',
        notes: 'Referred to dietitian for nutritional counseling',
        followUpDate: '2025-04-05',
        status: 'active',
        category: 'general',
        vitalSigns: {
          bloodPressure: '135/85',
          heartRate: '76',
          respiratoryRate: '16',
          temperature: '98.4',
          oxygenSaturation: '99%'
        },
        medicalHistory: [
          { date: '2024-11-20', condition: 'Annual checkup', notes: 'Elevated blood glucose' },
          { date: '2022-07-15', condition: 'Sprained ankle', notes: 'Healed completely' }
        ],
        allergies: 'None',
        doctorNotes: 'Patient is motivated to manage condition. Nutrition guidance will be important.',
        priority: 'medium',
        attachments: [
          { name: 'Glucose_Monitoring.pdf', type: 'pdf' },
          { name: 'Nutritional_Plan.docx', type: 'word' }
        ]
      },
      {
        id: 4,
        patientId: 'P-3295',
        patientName: 'Emily Wilson',
        diagnosisDate: '2025-01-20',
        diagnosis: 'Migraine',
        symptoms: 'Severe headache, nausea, light sensitivity',
        treatment: 'Prescribed migraine medication, trigger avoidance',
        medications: 'Sumatriptan 50mg as needed',
        labResults: 'MRI: Normal',
        notes: 'Patient advised to maintain headache diary',
        followUpDate: '2025-03-20',
        status: 'active',
        category: 'general',
        vitalSigns: {
          bloodPressure: '118/75',
          heartRate: '72',
          respiratoryRate: '14',
          temperature: '98.7',
          oxygenSaturation: '100%'
        },
        medicalHistory: [
          { date: '2024-08-05', condition: 'Annual checkup', notes: 'Normal findings' },
          { date: '2023-04-15', condition: 'Migraine onset', notes: 'First reported episode' }
        ],
        allergies: 'Shellfish',
        doctorNotes: 'Patient reports 3-4 episodes per month. Headache diary will help identify triggers.',
        priority: 'medium',
        attachments: [
          { name: 'MRI_Report.pdf', type: 'pdf' },
          { name: 'Headache_Diary.xlsx', type: 'excel' }
        ]
      },
      {
        id: 5,
        patientId: 'P-4102',
        patientName: 'Robert Taylor',
        diagnosisDate: '2025-02-28',
        diagnosis: 'Bronchitis',
        symptoms: 'Cough, chest discomfort, mild fever',
        treatment: 'Antibiotics, cough suppressant',
        medications: 'Azithromycin 500mg daily for 5 days',
        labResults: 'Chest X-ray: Bronchial inflammation',
        notes: 'Patient advised to avoid smoking and air pollutants',
        followUpDate: '2025-03-15',
        status: 'completed',
        category: 'pulmonology',
        vitalSigns: {
          bloodPressure: '125/80',
          heartRate: '88',
          respiratoryRate: '20',
          temperature: '99.2',
          oxygenSaturation: '96%'
        },
        medicalHistory: [
          { date: '2024-12-10', condition: 'Annual checkup', notes: 'Normal findings' },
          { date: '2023-03-22', condition: 'Pneumonia', notes: 'Resolved with treatment' }
        ],
        allergies: 'None reported',
        doctorNotes: 'Patient has history of respiratory issues. Will need follow-up pulmonary function test.',
        priority: 'normal',
        attachments: [
          { name: 'Chest_Xray.pdf', type: 'pdf' },
          { name: 'Pulmonary_Function.pdf', type: 'pdf' }
        ]
      }
    ];
    setRecords(mockData);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    setCurrentPage(1);
  };

  const handleAddRecord = () => {
    setNewRecord({
      patientId: '',
      patientName: '',
      diagnosisDate: '',
      diagnosis: '',
      symptoms: '',
      treatment: '',
      medications: '',
      labResults: '',
      notes: '',
      followUpDate: '',
      status: 'active',
      category: 'general',
      vitalSigns: {
        bloodPressure: '',
        heartRate: '',
        respiratoryRate: '',
        temperature: '',
        oxygenSaturation: ''
      },
      medicalHistory: [],
      allergies: '',
      doctorNotes: '',
      priority: 'normal',
      attachments: []
    });
    setIsAddModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('vitalSigns.')) {
      const vitalSignKey = name.split('.')[1];
      setNewRecord(prev => ({
        ...prev,
        vitalSigns: {
          ...prev.vitalSigns,
          [vitalSignKey]: value
        }
      }));
    } else {
      setNewRecord(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmitRecord = (e) => {
    e.preventDefault();
    
    const currentRecords = [...records];
    
    if (newRecord.id) {
      // Update existing record
      const index = currentRecords.findIndex(record => record.id === newRecord.id);
      currentRecords[index] = newRecord;
      setRecords(currentRecords);
      showAlert('Record updated successfully', 'success');
    } else {
      // Add new record
      const newId = currentRecords.length > 0 ? Math.max(...currentRecords.map(record => record.id)) + 1 : 1;
      setRecords([...currentRecords, { id: newId, ...newRecord }]);
      showAlert('New record added successfully', 'success');
    }
    
    setIsAddModalOpen(false);
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
    setActiveTab('details');
  };

  const handleDeleteRecord = (id) => {
    const recordToDelete = records.find(record => record.id === id);
    if (window.confirm(`Are you sure you want to delete the record for ${recordToDelete.patientName}?`)) {
      setRecords(records.filter(record => record.id !== id));
      showAlert('Record deleted successfully', 'success');
    }
  };

  const handleEditRecord = (record) => {
    setNewRecord({...record});
    setIsAddModalOpen(true);
  };

  const handleExportPDF = () => {
    showAlert('Exporting records to PDF...', 'info');
    // Implement PDF export functionality
  };

  const handleExportExcel = () => {
    showAlert('Exporting records to Excel...', 'info');
    // Implement Excel export functionality
  };

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const toggleMedicalHistory = () => {
    setShowMedicalHistory(!showMedicalHistory);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'card' : 'table');
  };

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertVisible(true);
    
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  };

  // Sort and filter records
  // Sort and filter records
  const filteredAndSortedRecords = records
    .filter(record => {
      const matchesSearch = 
        record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.patientId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterOption === 'all' || record.status === filterOption;
      const matchesCategory = selectedCategory === 'all' || record.category === selectedCategory;
      
      return matchesSearch && matchesFilter && matchesCategory;
    })
    .sort((a, b) => {
      if (sortField === 'patientName') {
        return sortDirection === 'asc' 
          ? a.patientName.localeCompare(b.patientName)
          : b.patientName.localeCompare(a.patientName);
      } else if (sortField === 'diagnosisDate') {
        return sortDirection === 'asc'
          ? new Date(a.diagnosisDate) - new Date(b.diagnosisDate)
          : new Date(b.diagnosisDate) - new Date(a.diagnosisDate);
      } else if (sortField === 'followUpDate') {
        return sortDirection === 'asc'
          ? new Date(a.followUpDate) - new Date(b.followUpDate)
          : new Date(b.followUpDate) - new Date(a.followUpDate);
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedRecords.length / pageSize);
  const paginatedRecords = filteredAndSortedRecords.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Get priority class
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'high': return 'dmr-priority-high';
      case 'medium': return 'dmr-priority-medium';
      case 'low': return 'dmr-priority-low';
      default: return 'dmr-priority-normal';
    }
  };

  // Get category icon
  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : <FaFileMedical />;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="dmr-container">
      {/* Alert/Notification */}
      {isAlertVisible && (
        <div className={`dmr-alert dmr-alert-${alertType}`}>
          <p>{alertMessage}</p>
        </div>
      )}

      <div className="dmr-header">
        <h2>Patient Medical Records</h2>
        <div className="dmr-header-actions">
          <div className="dmr-search-filter">
            <div className="dmr-search-bar">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Search by patient name, ID or diagnosis" 
                value={searchTerm} 
                onChange={handleSearch}
              />
            </div>
            <div className="dmr-filter-options">
              <FaFilter />
              <select value={filterOption} onChange={handleFilterChange}>
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="dmr-view-toggle">
              <button 
                className={`dmr-view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={toggleViewMode}
                title="Table View"
              >
                <FaList />
              </button>
              <button 
                className={`dmr-view-btn ${viewMode === 'card' ? 'active' : ''}`}
                onClick={toggleViewMode}
                title="Card View"
              >
                <FaFileMedical />
              </button>
            </div>
          </div>
          <div className="dmr-action-buttons">
            <button className="dmr-add-btn" onClick={handleAddRecord}>
              <FaPlus /> Add Record
            </button>
            <button className="dmr-export-btn" onClick={handleExportPDF}>
              <FaFilePdf /> Export PDF
            </button>
            <button className="dmr-export-btn" onClick={handleExportExcel}>
              <FaFileExcel /> Export Excel
            </button>
          </div>
        </div>
      </div>

      <div className="dmr-content">
        {/* Category Sidebar */}
        <div className="dmr-sidebar">
          <h3>Categories</h3>
          <ul className="dmr-category-list">
            {categories.map(category => (
              <li 
                key={category.id}
                className={selectedCategory === category.id ? 'dmr-category-active' : ''}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="dmr-category-icon">{category.icon}</span>
                <span className="dmr-category-name">{category.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main content area */}
        <div className="dmr-main">
          {viewMode === 'table' ? (
            <div className="dmr-table-wrapper">
              <table className="dmr-table">
                <thead>
                  <tr>
                    <th className="dmr-sortable" onClick={() => handleSortChange('patientName')}>
                      Patient
                      {sortField === 'patientName' && (
                        <span className="dmr-sort-indicator">
                          {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                        </span>
                      )}
                    </th>
                    <th className="dmr-sortable" onClick={() => handleSortChange('diagnosisDate')}>
                      Diagnosis Date
                      {sortField === 'diagnosisDate' && (
                        <span className="dmr-sort-indicator">
                          {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                        </span>
                      )}
                    </th>
                    <th>Diagnosis</th>
                    <th>Medications</th>
                    <th className="dmr-sortable" onClick={() => handleSortChange('followUpDate')}>
                      Follow-up
                      {sortField === 'followUpDate' && (
                        <span className="dmr-sort-indicator">
                          {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                        </span>
                      )}
                    </th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.length > 0 ? (
                    paginatedRecords.map(record => (
                      <tr key={record.id} className={`dmr-record-row ${record.status === 'completed' ? 'dmr-completed' : ''}`}>
                        <td className="dmr-patient-cell">
                          <div className="dmr-patient-info">
                            <span className="dmr-patient-name">{record.patientName}</span>
                            <span className="dmr-patient-id">{record.patientId}</span>
                          </div>
                        </td>
                        <td>{formatDate(record.diagnosisDate)}</td>
                        <td>
                          <div className="dmr-diagnosis-cell">
                            <span className="dmr-category-icon-small">{getCategoryIcon(record.category)}</span>
                            <span>{record.diagnosis}</span>
                          </div>
                        </td>
                        <td>{record.medications}</td>
                        <td>{formatDate(record.followUpDate)}</td>
                        <td>
                          <span className={`dmr-status-badge dmr-status-${record.status}`}>
                            {record.status === 'active' ? 'Active' : 'Completed'}
                          </span>
                        </td>
                        <td>
                          <span className={`dmr-priority-badge ${getPriorityClass(record.priority)}`}>
                            {record.priority}
                          </span>
                        </td>
                        <td className="dmr-action-cell">
                          <button className="dmr-view-btn" onClick={() => handleViewRecord(record)} title="View Details">
                            <FaEye />
                          </button>
                          <button className="dmr-edit-btn" onClick={() => handleEditRecord(record)} title="Edit Record">
                            <FaEdit />
                          </button>
                          <button className="dmr-delete-btn" onClick={() => handleDeleteRecord(record.id)} title="Delete Record">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="dmr-no-records">No medical records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="dmr-card-view">
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map(record => (
                  <div key={record.id} className={`dmr-record-card ${record.status === 'completed' ? 'dmr-completed' : ''}`}>
                    <div className="dmr-card-header">
                      <div className="dmr-card-patient">
                        <h4>{record.patientName}</h4>
                        <span className="dmr-patient-id">{record.patientId}</span>
                      </div>
                      <div className="dmr-card-badges">
                        <span className={`dmr-status-badge dmr-status-${record.status}`}>
                          {record.status === 'active' ? 'Active' : 'Completed'}
                        </span>
                        <span className={`dmr-priority-badge ${getPriorityClass(record.priority)}`}>
                          {record.priority}
                        </span>
                      </div>
                    </div>
                    <div className="dmr-card-body">
                      <div className="dmr-card-diagnosis">
                        <div className="dmr-category-icon-med">{getCategoryIcon(record.category)}</div>
                        <div>
                          <h5>Diagnosis</h5>
                          <p>{record.diagnosis}</p>
                        </div>
                      </div>
                      <div className="dmr-card-dates">
                        <div>
                          <label>Diagnosis Date:</label>
                          <p>{formatDate(record.diagnosisDate)}</p>
                        </div>
                        <div>
                          <label>Follow-up:</label>
                          <p>{formatDate(record.followUpDate)}</p>
                        </div>
                      </div>
                      <div className="dmr-card-treatment">
                        <h5>Medications</h5>
                        <p>{record.medications}</p>
                      </div>
                    </div>
                    <div className="dmr-card-footer">
                      <button className="dmr-view-btn" onClick={() => handleViewRecord(record)}>
                        <FaEye /> View Details
                      </button>
                      <button className="dmr-edit-btn" onClick={() => handleEditRecord(record)}>
                        <FaEdit /> Edit
                      </button>
                      <button className="dmr-delete-btn" onClick={() => handleDeleteRecord(record.id)}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="dmr-no-records">No medical records found</div>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="dmr-pagination">
              <button 
                className="dmr-page-btn" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                First
              </button>
              <button 
                className="dmr-page-btn" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <span className="dmr-page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                className="dmr-page-btn" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
              </button>
              <button 
                className="dmr-page-btn" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                Last
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Record Modal */}
      {isAddModalOpen && (
        <div className="dmr-modal-overlay">
          <div className="dmr-modal-content">
            <div className="dmr-modal-header">
              <h3>{newRecord.id ? 'Edit Medical Record' : 'Add New Medical Record'}</h3>
              <button className="dmr-modal-close" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmitRecord}>
              <div className="dmr-tabs">
                <button 
                  type="button" 
                  className={`dmr-tab ${activeTab === 'details' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('details')}
                >
                  Patient Details
                </button>
                <button 
                  type="button" 
                  className={`dmr-tab ${activeTab === 'diagnosis' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('diagnosis')}
                >
                  Diagnosis & Treatment
                </button>
                <button 
                  type="button" 
                  className={`dmr-tab ${activeTab === 'vitals' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('vitals')}
                >
                  Vital Signs
                </button>
                <button 
                  type="button" 
                  className={`dmr-tab ${activeTab === 'notes' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('notes')}
                >
                  Notes
                </button>
              </div>

              <div className="dmr-tab-content">
                {activeTab === 'details' && (
                  <div className="dmr-tab-pane">
                    <div className="dmr-form-row">
                      <div className="dmr-form-group">
                      <label>Patient ID <span className="dmr-required">*</span></label>
                      <input 
                        type="text" 
                        name="patientId" 
                        value={newRecord.patientId} 
                        onChange={handleInputChange}
                        required
                        className="dmr-input"
                      />
                    </div>
                    <div className="dmr-form-group">
                      <label>Patient Name <span className="dmr-required">*</span></label>
                      <input 
                        type="text" 
                        name="patientName" 
                        value={newRecord.patientName} 
                        onChange={handleInputChange}
                        required
                        className="dmr-input"
                      />
                    </div>
                  </div>
                  <div className="dmr-form-row">
                    <div className="dmr-form-group">
                      <label>Category</label>
                      <select 
                        name="category" 
                        value={newRecord.category} 
                        onChange={handleInputChange}
                        className="dmr-select"
                      >
                        <option value="general">General</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="pulmonology">Pulmonology</option>
                        <option value="followup">Follow-up</option>
                      </select>
                    </div>
                    <div className="dmr-form-group">
                      <label>Priority</label>
                      <select 
                        name="priority" 
                        value={newRecord.priority} 
                        onChange={handleInputChange}
                        className="dmr-select"
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  <div className="dmr-form-row">
                    <div className="dmr-form-group">
                      <label>Status</label>
                      <select 
                        name="status" 
                        value={newRecord.status} 
                        onChange={handleInputChange}
                        className="dmr-select"
                      >
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="dmr-form-group">
                      <label>Allergies</label>
                      <input 
                        type="text" 
                        name="allergies" 
                        value={newRecord.allergies} 
                        onChange={handleInputChange}
                        className="dmr-input"
                        placeholder="None if not applicable"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'diagnosis' && (
                <div className="dmr-tab-pane">
                  <div className="dmr-form-row">
                    <div className="dmr-form-group">
                      <label>Diagnosis Date <span className="dmr-required">*</span></label>
                      <input 
                        type="date" 
                        name="diagnosisDate" 
                        value={newRecord.diagnosisDate} 
                        onChange={handleInputChange}
                        required
                        className="dmr-input"
                      />
                    </div>
                    <div className="dmr-form-group">
                      <label>Follow-up Date</label>
                      <input 
                        type="date" 
                        name="followUpDate" 
                        value={newRecord.followUpDate} 
                        onChange={handleInputChange}
                        className="dmr-input"
                      />
                    </div>
                  </div>
                  <div className="dmr-form-group">
                    <label>Diagnosis <span className="dmr-required">*</span></label>
                    <input 
                      type="text" 
                      name="diagnosis" 
                      value={newRecord.diagnosis} 
                      onChange={handleInputChange}
                      required
                      className="dmr-input"
                    />
                  </div>
                  <div className="dmr-form-group">
                    <label>Symptoms</label>
                    <textarea 
                      name="symptoms" 
                      value={newRecord.symptoms} 
                      onChange={handleInputChange}
                      className="dmr-textarea"
                      placeholder="Describe patient symptoms"
                    ></textarea>
                  </div>
                  <div className="dmr-form-group">
                    <label>Treatment</label>
                    <textarea 
                      name="treatment" 
                      value={newRecord.treatment} 
                      onChange={handleInputChange}
                      className="dmr-textarea"
                      placeholder="Describe treatment plan"
                    ></textarea>
                  </div>
                  <div className="dmr-form-group">
                    <label>Medications</label>
                    <textarea 
                      name="medications" 
                      value={newRecord.medications} 
                      onChange={handleInputChange}
                      className="dmr-textarea"
                      placeholder="List all prescribed medications with dosage"
                    ></textarea>
                  </div>
                  <div className="dmr-form-group">
                    <label>Lab Results</label>
                    <textarea 
                      name="labResults" 
                      value={newRecord.labResults} 
                      onChange={handleInputChange}
                      className="dmr-textarea"
                      placeholder="Enter relevant lab results"
                    ></textarea>
                  </div>
                </div>
              )}

              {activeTab === 'vitals' && (
                <div className="dmr-tab-pane">
                  <div className="dmr-form-row">
                    <div className="dmr-form-group">
                      <label>Blood Pressure</label>
                      <input 
                        type="text" 
                        name="vitalSigns.bloodPressure" 
                        value={newRecord.vitalSigns.bloodPressure} 
                        onChange={handleInputChange}
                        className="dmr-input"
                        placeholder="e.g. 120/80"
                      />
                    </div>
                    <div className="dmr-form-group">
                      <label>Heart Rate</label>
                      <input 
                        type="text" 
                        name="vitalSigns.heartRate" 
                        value={newRecord.vitalSigns.heartRate} 
                        onChange={handleInputChange}
                        className="dmr-input"
                        placeholder="e.g. 72 bpm"
                      />
                    </div>
                  </div>
                  <div className="dmr-form-row">
                    <div className="dmr-form-group">
                      <label>Respiratory Rate</label>
                      <input 
                        type="text" 
                        name="vitalSigns.respiratoryRate" 
                        value={newRecord.vitalSigns.respiratoryRate} 
                        onChange={handleInputChange}
                        className="dmr-input"
                        placeholder="e.g. 16 breaths/min"
                      />
                    </div>
                    <div className="dmr-form-group">
                      <label>Temperature</label>
                      <input 
                        type="text" 
                        name="vitalSigns.temperature" 
                        value={newRecord.vitalSigns.temperature} 
                        onChange={handleInputChange}
                        className="dmr-input"
                        placeholder="e.g. 98.6 °F"
                      />
                    </div>
                  </div>
                  <div className="dmr-form-group">
                    <label>Oxygen Saturation</label>
                    <input 
                      type="text" 
                      name="vitalSigns.oxygenSaturation" 
                      value={newRecord.vitalSigns.oxygenSaturation} 
                      onChange={handleInputChange}
                      className="dmr-input"
                      placeholder="e.g. 98%"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="dmr-tab-pane">
                  <div className="dmr-form-group">
                    <label>Patient Notes</label>
                    <textarea 
                      name="notes" 
                      value={newRecord.notes} 
                      onChange={handleInputChange}
                      className="dmr-textarea"
                      rows="4"
                      placeholder="General notes for patient"
                    ></textarea>
                  </div>
                  <div className="dmr-form-group">
                    <label>Doctor's Private Notes</label>
                    <textarea 
                      name="doctorNotes" 
                      value={newRecord.doctorNotes} 
                      onChange={handleInputChange}
                      className="dmr-textarea"
                      rows="4"
                      placeholder="Clinical observations and notes (not shared with patient)"
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            <div className="dmr-modal-actions">
              <button type="button" className="dmr-cancel-btn" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button type="submit" className="dmr-submit-btn">
                {newRecord.id ? 'Update Record' : 'Save Record'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* View Record Modal */}
    {isViewModalOpen && selectedRecord && (
      <div className="dmr-modal-overlay">
        <div className="dmr-modal-content dmr-view-record-modal">
          <div className="dmr-modal-header">
            <h3>Medical Record Details</h3>
            <button className="dmr-modal-close" onClick={() => setIsViewModalOpen(false)}>×</button>
          </div>
          
          <div className="dmr-record-header">
            <div className="dmr-patient-info">
              <h4>{selectedRecord.patientName}</h4>
              <p>Patient ID: {selectedRecord.patientId}</p>
              <div className="dmr-record-badges">
                <span className={`dmr-status-badge dmr-status-${selectedRecord.status}`}>
                  {selectedRecord.status === 'active' ? 'Active' : 'Completed'}
                </span>
                <span className={`dmr-priority-badge ${getPriorityClass(selectedRecord.priority)}`}>
                  {selectedRecord.priority}
                </span>
                <span className="dmr-category-badge">
                  {getCategoryIcon(selectedRecord.category)} {selectedRecord.category}
                </span>
              </div>
            </div>
          </div>

          <div className="dmr-record-tabs">
            <button 
              className={`dmr-record-tab ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              <FaFileMedical /> Details
            </button>
            <button 
              className={`dmr-record-tab ${activeTab === 'vitals' ? 'active' : ''}`}
              onClick={() => setActiveTab('vitals')}
            >
              <FaHeartbeat /> Vital Signs
            </button>
            <button 
              className={`dmr-record-tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <FaHistory /> Medical History
            </button>
            <button 
              className={`dmr-record-tab ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              <FaUserMd /> Doctor Notes
            </button>
          </div>

          <div className="dmr-record-content">
            {activeTab === 'details' && (
              <div className="dmr-detail-section">
                <div className="dmr-detail-row">
                  <div className="dmr-detail-group">
                    <label>Diagnosis Date:</label>
                    <p>{formatDate(selectedRecord.diagnosisDate)}</p>
                  </div>
                  <div className="dmr-detail-group">
                    <label>Follow-up Date:</label>
                    <p>{formatDate(selectedRecord.followUpDate)}</p>
                  </div>
                </div>
                
                <div className="dmr-detail-group">
                  <label>Diagnosis:</label>
                  <p>{selectedRecord.diagnosis}</p>
                </div>
                
                <div className="dmr-detail-group">
                  <label>Symptoms:</label>
                  <p>{selectedRecord.symptoms || 'None recorded'}</p>
                </div>
                
                <div className="dmr-detail-group">
                  <label>Treatment:</label>
                  <p>{selectedRecord.treatment || 'None recorded'}</p>
                </div>
                
                <div className="dmr-detail-group">
                  <label>Medications:</label>
                  <p>{selectedRecord.medications || 'None prescribed'}</p>
                </div>
                
                <div className="dmr-detail-group">
                  <label>Lab Results:</label>
                  <p>{selectedRecord.labResults || 'No results available'}</p>
                </div>
                
                <div className="dmr-detail-group">
                  <label>Allergies:</label>
                  <p>{selectedRecord.allergies || 'None reported'}</p>
                </div>

                {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                  <div className="dmr-attachments">
                    <label>Attachments:</label>
                    <div className="dmr-attachment-list">
                      {selectedRecord.attachments.map((file, index) => (
                        <div key={index} className="dmr-attachment-item">
                          {file.type === 'pdf' && <FaFilePdf />}
                          {file.type === 'excel' && <FaFileExcel />}
                          {file.type === 'word' && <FaFileDownload />}
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'vitals' && (
              <div className="dmr-vitals-section">
                <div className="dmr-vitals-grid">
                  <div className="dmr-vital-card">
                    <h5>Blood Pressure</h5>
                    <div className="dmr-vital-value">{selectedRecord.vitalSigns.bloodPressure || 'N/A'}</div>
                  </div>
                  <div className="dmr-vital-card">
                    <h5>Heart Rate</h5>
                    <div className="dmr-vital-value">{selectedRecord.vitalSigns.heartRate || 'N/A'}</div>
                  </div>
                  <div className="dmr-vital-card">
                    <h5>Respiratory Rate</h5>
                    <div className="dmr-vital-value">{selectedRecord.vitalSigns.respiratoryRate || 'N/A'}</div>
                    </div>
                  <div className="dmr-vital-card">
                    <h5>Temperature</h5>
                    <div className="dmr-vital-value">{selectedRecord.vitalSigns.temperature || 'N/A'}</div>
                  </div>
                  <div className="dmr-vital-card">
                    <h5>Oxygen Saturation</h5>
                    <div className="dmr-vital-value">{selectedRecord.vitalSigns.oxygenSaturation || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="dmr-vital-trends">
                  <h4>Vital Signs Trends</h4>
                  <div className="dmr-trend-placeholder">
                    <FaChartLine size={20} />
                    <p>Trend data will be displayed here when multiple readings are available</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="dmr-history-section">
                <h4>Patient Medical History</h4>
                {selectedRecord.medicalHistory && selectedRecord.medicalHistory.length > 0 ? (
                  <div className="dmr-history-timeline">
                    {selectedRecord.medicalHistory.map((entry, index) => (
                      <div key={index} className="dmr-history-entry">
                        <div className="dmr-history-date">
                          {formatDate(entry.date)}
                        </div>
                        <div className="dmr-history-content">
                          <h5>{entry.condition}</h5>
                          <p>{entry.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="dmr-no-history">No previous medical history recorded</p>
                )}

                <div className="dmr-family-history">
                  <h4>Family Medical History</h4>
                  <div className="dmr-family-history-placeholder">
                    <p>Family history information not available</p>
                    <button className="dmr-link-btn">+ Add Family History</button>
                  </div>
                </div>
                
                <div className="dmr-chronic-conditions">
                  <h4>Chronic Conditions</h4>
                  <div className="dmr-chronic-conditions-placeholder">
                    <p>No chronic conditions recorded</p>
                    <button className="dmr-link-btn">+ Add Chronic Condition</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="dmr-notes-section">
                <div className="dmr-notes-group">
                  <h4>Patient Care Notes</h4>
                  <div className="dmr-notes-content">
                    {selectedRecord.notes || 'No general notes available'}
                  </div>
                </div>

                <div className="dmr-notes-group">
                  <h4>Doctor's Notes</h4>
                  <div className="dmr-notes-content dmr-doctor-notes">
                    {selectedRecord.doctorNotes || 'No doctor notes available'}
                  </div>
                </div>
                
                <div className="dmr-add-note">
                  <h4>Add New Note</h4>
                  <textarea 
                     className="dmr-textarea"
                    placeholder="Enter new note for this patient record"
                  ></textarea>
                  <div className="dmr-note-actions">
                    <label>
                      <input type="checkbox" /> Mark as private (doctor's eyes only)
                    </label>
                    <button className="dmr-submit-btn">Save Note</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="dmr-modal-actions">
            <button className="dmr-edit-btn" onClick={() => {
              setIsViewModalOpen(false);
              handleEditRecord(selectedRecord);
            }}>
              <FaEdit /> Edit Record
            </button>
            <button className="dmr-close-btn" onClick={() => setIsViewModalOpen(false)}>Close</button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default DmedicalRecords;