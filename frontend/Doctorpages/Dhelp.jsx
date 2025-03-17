import React, { useState } from 'react';
import { 
  FaQuestionCircle, 
  FaSearch, 
  FaBookMedical, 
  FaVideo, 
  FaRegKeyboard, 
  FaRegLifeRing, 
  FaPhoneAlt, 
  FaBug, 
  FaChevronDown, 
  FaChevronRight 
} from 'react-icons/fa';
import './DHelp.css';

const DHelp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState({});
  
  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqs = [
    {
      id: 'patient-records',
      question: 'How do I access complete patient medical records?',
      answer: 'Click on a patient from the Patients list, then select "View Full Records" button in the upper right corner of the patient profile. You can also search for a specific patient using the search bar.'
    },
    {
      id: 'telehealth',
      question: 'How to set up a teleconsultation session?',
      answer: 'Navigate to the Teleconsultation tab, select "New Session", choose the patient from your list, set the date and time, and send the invitation. The system will automatically notify the patient with joining instructions.'
    },
    {
      id: 'appointments',
      question: 'How do I reschedule an appointment?',
      answer: 'Go to the Appointments section, find the appointment you wish to reschedule, click the Edit icon, select a new date and time, and confirm the changes. The system will send an updated notification to the patient.'
    },
    {
      id: 'add-record',
      question: 'How do I add a new medical record for a patient?',
      answer: 'Open the patient profile, navigate to Medical History tab, and click the "+ Add Record" button in the upper right corner. Fill in the diagnosis and other relevant information and save.'
    },
    {
      id: 'medications',
      question: 'How to prescribe medications?',
      answer: 'From the patient profile, go to the Medications tab and click "Add Medication". Enter the medication details including dosage, frequency, duration, and special instructions. Submit to generate a prescription that can be printed or sent electronically.'
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of navigating the system and accessing key features'
    },
    {
      title: 'Teleconsultation Tutorial',
      description: 'Step-by-step guide for virtual patient appointments'
    },
    {
      title: 'Lab Results Integration',
      description: 'How to interpret and manage integrated lab results'
    },
    {
      title: 'Patient Record Management',
      description: 'Best practices for maintaining accurate medical records'
    }
  ];

  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqs;

  return (
    <div className="help-center-container">
      <div className="help-header">
        <FaQuestionCircle className="help-icon" />
        <h1>Doctor Help Center</h1>
      </div>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Search for help topics..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="help-content">
        <div className="help-section">
          <h2><FaBookMedical /> Quick Help Topics</h2>
          <div className="faq-container">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map(faq => (
                <div key={faq.id} className="faq-item">
                  <div 
                    className="faq-question" 
                    onClick={() => toggleItem(faq.id)}
                  >
                    {expandedItems[faq.id] ? <FaChevronDown /> : <FaChevronRight />}
                    {faq.question}
                  </div>
                  {expandedItems[faq.id] && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="no-results">No matching help topics found. Try different keywords or contact support.</p>
            )}
          </div>
        </div>

        <div className="help-section">
          <h2><FaVideo /> Video Tutorials</h2>
          <div className="tutorials-container">
            {tutorials.map((tutorial, index) => (
              <div key={index} className="tutorial-item">
                <div className="tutorial-title">{tutorial.title}</div>
                <div className="tutorial-description">{tutorial.description}</div>
                <button className="tutorial-button">Watch Tutorial</button>
              </div>
            ))}
          </div>
        </div>

        <div className="help-section">
          <h2><FaRegKeyboard /> Common Shortcuts</h2>
          <div className="shortcuts-container">
            <div className="shortcut-item">
              <span className="shortcut-key">Alt + N</span>
              <span className="shortcut-description">Add new patient record</span>
            </div>
            <div className="shortcut-item">
              <span className="shortcut-key">Alt + S</span>
              <span className="shortcut-description">Schedule appointment</span>
            </div>
            <div className="shortcut-item">
              <span className="shortcut-key">Alt + T</span>
              <span className="shortcut-description">Start teleconsultation</span>
            </div>
            <div className="shortcut-item">
              <span className="shortcut-key">Alt + P</span>
              <span className="shortcut-description">Print current view</span>
            </div>
            <div className="shortcut-item">
              <span className="shortcut-key">Alt + H</span>
              <span className="shortcut-description">Return to dashboard</span>
            </div>
          </div>
        </div>

        <div className="help-section support-section">
          <h2><FaRegLifeRing /> Need Additional Help?</h2>
          <div className="support-options">
            <button className="support-button">
              <FaPhoneAlt /> Contact Support Team
            </button>
            <button className="support-button">
              <FaBug /> Report an Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DHelp;