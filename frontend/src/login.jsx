import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import gImage from './assets/Google Icon.png';
import d1 from './assets/Ellipse 1.png';
import d2 from './assets/Ellipse 2.png';
import d3 from './assets/Group 2.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password });

    try {
      const response = await axios.post('https://backent-type.onrender.com', { email, password });
      console.log('Login successful:', response.data);

      setEmail('');
      setPassword('');
      setErrorMessage('');
      console.log('State cleared:', { email: '', password: '' });

      setTimeout(() => {
        navigate(`/workspace/${response.data.user.firstName}`);
      }, 100);  

    } catch (error) {
      console.error('Error occurred during login:');
      if (error.response) {
        console.error('Login failed:', error.response.data);
        setErrorMessage('Incorrect email or password.');
      } else if (error.request) {
        console.error('No response received:', error.request);
        setErrorMessage('No response received from server.');
      } else {
        console.error('Error during request setup:', error.message);
        setErrorMessage('An error occurred during login.');
      }
    }
  };

  return (
    <div className='l1'>
      <img className="d1" src={d1} alt="d1" />
      <img className="d2" src={d2} alt="d2" />
      <img className="d3" src={d3} alt="d3" />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <label>E-mail</label><br />
          <input
            className='mail'
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <label>Password</label><br />
          <input
            className='password'
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br /><br />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button className='lo-bn' type="submit">Login</button><br /><div>or</div>
          <button className='g-bn' type="button"><img src={gImage} alt="Google Icon" />&nbsp;&nbsp;Sign in with Google</button>
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
