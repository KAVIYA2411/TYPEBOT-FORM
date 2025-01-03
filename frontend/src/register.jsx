import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import gImage from './assets/Google Icon.png';
import d1 from './assets/Ellipse 1.png';
import d2 from './assets/Ellipse 2.png';
import d3 from './assets/Group 2.png';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post('https://backent-type.onrender.com', { username, email, password });
      navigate('/login');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
  <div className='r1'>
    <img className="d1" src={d1} alt="d1" />
    <img className="d2" src={d2} alt="d2" />
    <img className="d3" src={d3} alt="d3" />
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <label >Username</label><br></br>
        <input className='user'
          type="text"
          placeholder="Enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br></br><br></br>
        <label>Email</label><br></br>
        <input className='mail'
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br></br><br></br>
        <label>Password</label><br></br>
        <input
        className='password'
          type="password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br></br><br></br>
        <label>Confirm Password</label><br></br>
        <input
          className='password'
          type="password"
          placeholder="**********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /><br></br><br></br>
        <button className="signupbn" type="submit">Sign Up</button><br></br><br></br>
        <button className='g-bn'type="button" onClick={() => navigate('/login')}><img src={gImage} alt="Google Icon" />&nbsp;&nbsp;
          Sign Up with Google
        </button><br></br>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  </div>
    
  );
};

export default Register;
