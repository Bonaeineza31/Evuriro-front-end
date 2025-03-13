import React, { useState } from 'react';
import '../styles/uploadrecords.css';

const UploadRecords = () => {
  const [files, setFiles] = useState([]);
  const [recordType, setRecordType] = useState('');
  const [date, setDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Record type options
  const recordTypes = [
    'Lab Results',
    'Imaging/X-Ray',
    'Prescription',
    'Discharge Summary',
    'Visit Summary',
    'Vaccination Record',
    'Medical History',
    'Insurance Document',
    'Other'
  ];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      alert('Please select at least one file to upload');
      return;
    }

    setUploading(true);

    // This is where you would connect to your backend
    // For now, we'll simulate the upload process
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Normally, you would create a FormData object and send it to your backend
      /*
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      formData.append('recordType', recordType);
      formData.append('date', date);
      formData.append('doctor', doctor);
      formData.append('description', description);
      
      // Example API call
      const response = await fetch('YOUR_BACKEND_API_URL/upload-records', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      */
      
      setUploadSuccess(true);
      
      // Reset form after successful upload
      setTimeout(() => {
        setFiles([]);
        setRecordType('');
        setDate('');
        setDoctor('');
        setDescription('');
        setUploading(false);
        setUploadSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Upload failed. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="upload-records-container">
      <div className="upload-header">
        <h1>Upload Medical Records</h1>
        <p>Upload and organize your medical documents for easy access</p>
      </div>

      {uploadSuccess ? (
        <div className="upload-success">
          <div className="success-icon">✓</div>
          <h2>Upload Successful!</h2>
          <p>Your medical records have been uploaded successfully.</p>
        </div>
      ) : (
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Upload Files</h2>
            <div className="file-upload-area">
              <div className="file-upload-box">
                <input 
                  type="file" 
                  id="file-upload" 
                  multiple 
                  onChange={handleFileChange}
                  className="file-input"
                />
                <label htmlFor="file-upload" className="file-label">
                  <div className="upload-icon">+</div>
                  <div>
                    <p className="drag-text">Drag files here or click to upload</p>
                    <p className="file-types">Supports PDF, JPG, PNG (Max 10MB per file)</p>
                  </div>
                </label>
              </div>
            </div>

            {files.length > 0 && (
              <div className="file-list">
                <h3>Selected Files ({files.length})</h3>
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>
                      <div className="file-info">
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <button 
                        type="button" 
                        className="remove-file" 
                        onClick={() => removeFile(index)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="form-section">
            <h2>Record Details</h2>
            <div className="form-group">
              <label htmlFor="record-type">Record Type</label>
              <select 
                id="record-type" 
                value={recordType} 
                onChange={(e) => setRecordType(e.target.value)}
                required
              >
                <option value="">Select Record Type</option>
                {recordTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="record-date">Date of Record</label>
              <input 
                type="date" 
                id="record-date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="doctor-name">Doctor/Provider</label>
              <input 
                type="text" 
                id="doctor-name" 
                placeholder="Enter doctor or provider name" 
                value={doctor} 
                onChange={(e) => setDoctor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description (Optional)</label>
              <textarea 
                id="description" 
                placeholder="Add notes or description about this record" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-button">Cancel</button>
            <button 
              type="submit" 
              className="upload-button"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Records'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadRecords;