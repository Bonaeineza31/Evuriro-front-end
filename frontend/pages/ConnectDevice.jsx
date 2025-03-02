import React, { useState, useEffect } from 'react';
import '../styles/connectdevice.css';
import { 
  FaHeartbeat, 
  FaThermometerHalf, 
  FaLungs, 
  FaTint, 
  FaPlus, 
  FaWifi, 
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const ConnectDevice = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [vitalSigns, setVitalSigns] = useState({
    temperature: null,
    heartRate: null,
    oxygenLevel: null,
    bloodPressure: null
  });
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    // Simulate vital signs updates when device is connected
    if (connectedDevice) {
      const interval = setInterval(() => {
        setVitalSigns({
          temperature: (Math.random() * (37.8 - 36.5) + 36.5).toFixed(1),
          heartRate: Math.floor(Math.random() * (95 - 65) + 65),
          oxygenLevel: Math.floor(Math.random() * (100 - 95) + 95),
          bloodPressure: `${Math.floor(Math.random() * (140 - 110) + 110)}/${Math.floor(Math.random() * (90 - 70) + 70)}`
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [connectedDevice]);

  const handleScanForDevices = () => {
    setIsScanning(true);
    setConnectionError(null);
    
    // Simulate finding devices
    setTimeout(() => {
      setAvailableDevices([
        { id: 'EVR-WT100-1234', name: 'Evruriro Wearable Tracker', batteryLevel: 78 },
        { id: 'EVR-BP200-5678', name: 'Evruriro BP Monitor', batteryLevel: 92 },
        { id: 'EVR-OX300-9012', name: 'Evruriro Pulse Oximeter', batteryLevel: 65 }
      ]);
      setIsScanning(false);
    }, 3000);
  };

  const handleConnectDevice = (device) => {
    setIsScanning(false);
    setConnectionError(null);
    
    // Simulate connection process
    const connectingDevice = { ...device, status: 'connecting' };
    setConnectedDevice(connectingDevice);
    
    setTimeout(() => {
      // 10% chance of connection failure for realism
      if (Math.random() > 0.9) {
        setConnectionError(`Failed to connect to ${device.name}. Please try again.`);
        setConnectedDevice(null);
      } else {
        setConnectedDevice({ ...device, status: 'connected' });
      }
    }, 2000);
  };

  const handleDisconnectDevice = () => {
    setConnectedDevice(null);
    setVitalSigns({
      temperature: null,
      heartRate: null,
      oxygenLevel: null,
      bloodPressure: null
    });
  };

  const handleSaveVitalSigns = () => {
    // Simulate saving vital signs to patient record
    alert('Vital signs saved to patient record successfully!');
  };

  return (
    <div className="evr-connect-device-container">
      <div className="evr-connect-device-header">
        <h1 className="evr-connect-device-title">Connect Device</h1>
        <p className="evr-connect-device-description">
          Connect a wearable device to monitor patient vitals in real-time
        </p>
      </div>

      {connectionError && (
        <div className="evr-connect-device-error">
          <FaExclamationTriangle /> {connectionError}
        </div>
      )}

      {!connectedDevice ? (
        <div className="evr-connect-device-scan-section">
          <div className="evr-connect-device-instruction">
            <div className="evr-connect-device-instruction-icon">
              <FaWifi />
            </div>
            <div className="evr-connect-device-instruction-text">
              <h3>Connect a Wearable Device</h3>
              <p>Turn on your Evruriro device and keep it within range</p>
            </div>
          </div>
          
          <button 
            className="evr-connect-device-scan-button"
            onClick={handleScanForDevices}
            disabled={isScanning}
          >
            {isScanning ? 'Scanning...' : 'Scan for Devices'}
          </button>
          
          {isScanning && (
            <div className="evr-connect-device-loading">
              <div className="evr-connect-device-spinner"></div>
              <p>Searching for nearby devices...</p>
            </div>
          )}
          
          {availableDevices.length > 0 && !isScanning && (
            <div className="evr-connect-device-list">
              <h3>Available Devices</h3>
              {availableDevices.map(device => (
                <div 
                  key={device.id} 
                  className="evr-connect-device-item"
                  onClick={() => handleConnectDevice(device)}
                >
                  <div className="evr-connect-device-item-info">
                    <div className="evr-connect-device-item-name">{device.name}</div>
                    <div className="evr-connect-device-item-id">{device.id}</div>
                  </div>
                  <div className="evr-connect-device-item-battery">
                    {device.batteryLevel}%
                  </div>
                  <button className="evr-connect-device-item-button">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="evr-connect-device-monitor-section">
          <div className="evr-connect-device-connected-info">
            <div className="evr-connect-device-connected-status">
              <FaCheckCircle />
              <span>Connected to {connectedDevice.name}</span>
            </div>
            <button 
              className="evr-connect-device-disconnect-button"
              onClick={handleDisconnectDevice}
            >
              Disconnect
            </button>
          </div>
          
          <div className="evr-connect-device-vitals-grid">
            <div className="evr-connect-device-vital-card">
              <div className="evr-connect-device-vital-icon evr-temp-icon">
                <FaThermometerHalf />
              </div>
              <div className="evr-connect-device-vital-info">
                <div className="evr-connect-device-vital-label">Temperature</div>
                <div className="evr-connect-device-vital-value">
                  {vitalSigns.temperature ? `${vitalSigns.temperature}°C` : '--'}
                </div>
              </div>
            </div>
            
            <div className="evr-connect-device-vital-card">
              <div className="evr-connect-device-vital-icon evr-heart-icon">
                <FaHeartbeat />
              </div>
              <div className="evr-connect-device-vital-info">
                <div className="evr-connect-device-vital-label">Heart Rate</div>
                <div className="evr-connect-device-vital-value">
                  {vitalSigns.heartRate ? `${vitalSigns.heartRate} BPM` : '--'}
                </div>
              </div>
            </div>
            
            <div className="evr-connect-device-vital-card">
              <div className="evr-connect-device-vital-icon evr-oxygen-icon">
                <FaLungs />
              </div>
              <div className="evr-connect-device-vital-info">
                <div className="evr-connect-device-vital-label">Oxygen Level</div>
                <div className="evr-connect-device-vital-value">
                  {vitalSigns.oxygenLevel ? `${vitalSigns.oxygenLevel}%` : '--'}
                </div>
              </div>
            </div>
            
            <div className="evr-connect-device-vital-card">
              <div className="evr-connect-device-vital-icon evr-bp-icon">
                <FaTint />
              </div>
              <div className="evr-connect-device-vital-info">
                <div className="evr-connect-device-vital-label">Blood Pressure</div>
                <div className="evr-connect-device-vital-value">
                  {vitalSigns.bloodPressure || '--'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="evr-connect-device-actions">
            <button 
              className="evr-connect-device-save-button"
              onClick={handleSaveVitalSigns}
            >
              <FaPlus /> Save to Patient Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectDevice;