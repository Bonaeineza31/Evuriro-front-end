import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaHeadset, FaFileInvoiceDollar, 
         FaNotesMedical, FaShieldAlt, FaBook, FaVideo, 
         FaMobile, FaClipboardList, FaPaperPlane, FaTimes } from 'react-icons/fa';
import '../styles/helpcenter.css';

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('appointment');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const categories = [
    { id: 'appointment', name: 'Appointments', icon: <FaCalendarAlt /> },
    { id: 'technical', name: 'Technical Support', icon: <FaHeadset /> },
    { id: 'billing', name: 'Billing & Insurance', icon: <FaFileInvoiceDollar /> },
    { id: 'medical', name: 'Medical Questions', icon: <FaNotesMedical /> },
    { id: 'privacy', name: 'Privacy & Security', icon: <FaShieldAlt /> }
  ];

  const faqs = {
    appointment: [
      {
        question: "How do I prepare for my teleconsultation?",
        answer: "Be ready 5 minutes before your scheduled time. Ensure you have a stable internet connection in a quiet, well-lit area. Test your camera and microphone, prepare a list of your current medications, and have your questions ready for the doctor."
      },
      {
        question: "How do I reschedule my appointment?",
        answer: "You can reschedule your appointment by going to the 'Appointments' section, selecting your appointment, and clicking on the 'Reschedule' button. Please note that reschedules should be done at least 24 hours in advance."
      },
      {
        question: "What should I do if my doctor is late?",
        answer: "Please remain in the virtual waiting room. If your doctor is more than 15 minutes late, you'll receive a notification with options to either continue waiting or reschedule your appointment."
      }
    ],
    technical: [
      {
        question: "My video or audio isn't working. What should I do?",
        answer: "First, check if your camera and microphone are properly connected and permitted in your browser settings. Try refreshing the page. If issues persist, you can click on 'Test your camera and microphone' in the appointment preparation section."
      },
      {
        question: "How do I use the chat feature during consultation?",
        answer: "During your consultation, click on the 'Open Chat' button in the top right corner. This allows you to send text messages to your doctor if you're experiencing audio issues or need to share specific information."
      },
      {
        question: "Can I use Evruriro on my mobile device?",
        answer: "Yes, Evruriro is fully compatible with smartphones and tablets. You can download our app from the App Store or Google Play, or use a mobile browser to access our platform."
      }
    ],
    billing: [
      {
        question: "How do I update my insurance information?",
        answer: "Go to your Profile settings, select 'Insurance Information', and click 'Update'. You can add new insurance details or modify existing ones. Make sure to save your changes."
      },
      {
        question: "Will my insurance cover teleconsultation?",
        answer: "Most insurance providers now cover teleconsultation services. You can verify your coverage by checking with your insurance provider or clicking on 'Verify Insurance Coverage' in your appointment details."
      },
      {
        question: "How do I get a receipt for my consultation?",
        answer: "After your consultation, a receipt will be automatically generated and sent to your email. You can also find all your receipts in the 'Billing' section of your account."
      }
    ],
    medical: [
      {
        question: "How do I access my medical records?",
        answer: "You can access your medical records by clicking on 'Medical Records' in the left sidebar. There you'll find your consultation history, prescriptions, test results, and other medical documents."
      },
      {
        question: "Can I share my test results with my doctor?",
        answer: "Yes, you can upload and share your test results before or during your consultation. Go to 'Medical Records', click 'Upload Documents', and select the files you want to share."
      },
      {
        question: "How do I get a prescription after my consultation?",
        answer: "If your doctor prescribes medication during your consultation, the prescription will be sent to your preferred pharmacy and will also be available in your 'Medical Records' section for download."
      }
    ],
    privacy: [
      {
        question: "Is my teleconsultation private and secure?",
        answer: "Yes, all teleconsultations are conducted through a secure, encrypted connection that complies with healthcare privacy regulations. Your medical information and consultation details are kept confidential."
      },
      {
        question: "Who can access my medical information?",
        answer: "Only you and your healthcare providers have access to your medical information. You can control access permissions in the 'Privacy Settings' section of your account."
      },
      {
        question: "Can I request a copy of my personal data?",
        answer: "Yes, you can request a copy of your personal data by going to 'Settings' > 'Privacy & Security' > 'Data Request'. Processing typically takes 3-5 business days."
      }
    ]
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value
    });
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // such as sending the data to a server
    alert('Your message has been sent. Our support team will get back to you shortly.');
    setContactFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setShowContactForm(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement any additional search functionality here
    console.log('Searching for:', searchQuery);
  };

  const filteredFaqs = searchQuery ? 
    Object.values(faqs).flat().filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ) : 
    faqs[activeCategory];

  return (
    <div className="help-center-container">
      <div className="help-center-header">
        <h1>Help Center</h1>
        <p>Find answers to your questions and get support for your teleconsultation</p>
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search for help..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="help-search-input"
          />
          <button type="submit" className="help-search-button">
            <FaSearch className="search-icon" /> Search
          </button>
        </form>
      </div>

      <div className="help-center-content">
        <div className="help-categories">
          <h3>Categories</h3>
          <ul>
            {categories.map(category => (
              <li 
                key={category.id}
                className={activeCategory === category.id ? 'active' : ''}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSearchQuery('');
                }}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </li>
            ))}
          </ul>
          
          <div className="contact-support">
            <h3>Need more help?</h3>
            <button 
              className="contact-button"
              onClick={() => setShowContactForm(true)}
            >
              <FaHeadset className="button-icon" /> Contact Support
            </button>
            <p className="support-hours">Available 24/7</p>
          </div>
        </div>

        <div className="faq-section">
          <h2>
            {searchQuery 
              ? 'Search Results' 
              : <>
                  <span className="category-icon-header">
                    {categories.find(c => c.id === activeCategory).icon}
                  </span>
                  {categories.find(c => c.id === activeCategory).name}
                </>
            }
          </h2>
          
          <div className="faq-list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div className="faq-item" key={index}>
                  <details>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                </div>
              ))
            ) : (
              <p className="no-results">No results found. Try different keywords or browse our categories.</p>
            )}
          </div>
        </div>
      </div>

      <div className="quick-links">
        <h3>Quick Links</h3>
        <div className="links-container">
          <a href="#" className="quick-link">
            <FaBook className="link-icon" />
            User Guide
          </a>
          <a href="#" className="quick-link">
            <FaVideo className="link-icon" />
            Video Tutorials
          </a>
          <a href="#" className="quick-link">
            <FaMobile className="link-icon" />
            Device Setup
          </a>
          <a href="#" className="quick-link">
            <FaClipboardList className="link-icon" />
            Appointment Checklist
          </a>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="contact-form-modal">
          <div className="contact-form-container">
            <div className="contact-form-header">
              <h3><FaHeadset /> Contact Support</h3>
              <button 
                className="close-button"
                onClick={() => setShowContactForm(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleContactFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactFormData.name}
                  onChange={handleContactFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactFormData.email}
                  onChange={handleContactFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactFormData.subject}
                  onChange={handleContactFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactFormData.message}
                  onChange={handleContactFormChange}
                  required
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                <FaPaperPlane className="button-icon" /> Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;