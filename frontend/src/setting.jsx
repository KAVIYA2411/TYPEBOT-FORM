import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import lockImage from './assets/lock.png';
import pImage from './assets/Profile.png';
import logImage from './assets/Logout.png';

const Settings = () => {
  const { userName } = useParams();  
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://backent-type.onrender.com`);
        setEmail(response.data.email); 
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
      }
    };

    fetchUserData();
  }, [userName]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put('https://backent-type.onrender.com', {
        name,
        email,
        oldPassword,
        newPassword,
      });
      if (response.data.success) {
        alert('User updated successfully');
      } else {
        alert('Failed to update user: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error.response?.data || error.message);
      alert('Failed to update user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    navigate('/');
  };

  return (
    <div className="settings-container">
      <h2 className='h22'>Settings</h2>
      <div className="form-group">
        <div className="input-wrapper">
          <img src={pImage} alt="pImage" className="input-image" />
          <input
            type="text"
            value={name} 
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <img src={lockImage} alt="lImage" className="input-image" />
          <input 
            placeholder='Update Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <img src={lockImage} alt="lImage" className="input-image" />
          <input 
            placeholder='Old Password'
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <img src={lockImage} alt="lImage" className="input-image" />
          <input
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </div>
      <button className="u1" onClick={handleUpdate}>Update</button>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <img src={logImage} className="log" alt="logImage"/> Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
