import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import containerImage from './assets/Container.png'; 
import logoImage from './assets/SVG.png';
const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className='nu'>
        <ul>
            <img className="logo" src={logoImage} alt="logo" /><p className="logotext">FormBot</p>
            <button className="signin" onClick={() => navigate('/login')}>Sign in</button>
            <button className="signup" onClick={() => navigate('/register')}>Create a FormBot</button>
        </ul>
      </nav>
      <div className="home-container">
        <img src={containerImage} alt="Home Container" />
        
      </div>
      <footer>
        <div className="footer-section">
            <img className="logo" src={logoImage} alt="logo" />
            <p className="logotext">FormBot</p>
            <p>Made with ❤️ by
            @cuvette</p></div>
        <div className="footer-section">
          <h4>Product</h4>
          <ul>
            <li><a href="#status">Status</a></li>
            <li><a href="#documentation">Documentation</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li><a href="#discord">Discord</a></li>
            <li><a href="#github">GitHub Repository</a></li>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#linkedin">LinkedIn</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>
        
      </footer>
    </div>
  );
};

export default Home;
