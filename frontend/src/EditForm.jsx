import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import dImage from './assets/delete (1).png';
import tImage from './assets/Vector (1).png';
import t1Image from './assets/SVG (2).png';
import vImage from './assets/SVG (3).png';
import gifImage from './assets/Container (1).png';
import b1Image from './assets/SVG (4).png';
import b2Image from './assets/SVG (5).png';
import b3Image from './assets/SVG (7).png';
import b4Image from './assets/SVG (6).png';
import b5Image from './assets/SVG (8).png';
import b6Image from './assets/SVG (9).png';
import b7Image from './assets/SVG (10).png';
import sImage from './assets/Vector (2).png';


const EditForm = ({ refreshForms }) => {
  const { formId } = useParams();
  const [formName, setFormName] = useState('');
  const [bubbles, setBubbles] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(true);
  const [popupContents, setPopupContents] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [data, setData] = useState([]);
  const [views, setViews] = useState(0);
  const [starts, setStarts] = useState(0);
  const [completion, setCompletion] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`https://backent-type.onrender.com`);
        setFormName(response.data.name);
        setBubbles(response.data.bubbles || []);
      } catch (error) {
        console.error('Error fetching form:', error.response?.data || error.message);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://backent-type.onrender.com`);
        setData(response.data);
        setViews(response.stats.views);
        setStarts(response.stats.starts);
        setCompletion(response.stats.completed);
      } catch (error) {
        console.error('Error fetching response data:', error.response?.data || error.message);
      }
    };

    if (formId) {
      fetchForm();
      fetchData();
    }
  }, [formId]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.body.classList.toggle('dark-mode', newMode);
  };

  const handleSave = async () => {
    saveAllPopups();

    try {
      await axios.put(`https://backent-type.onrender.com`, {
        name: formName,
        bubbles,
      });

      alert(`Form '${formName}' has been saved successfully!`);

      setPopupContents([]);

      if (refreshForms) refreshForms();

      navigate('/');
    } catch (error) {
      console.error('Error saving form:', error.response?.data || error.message);
      alert('An error occurred while saving the form. Please try again.');
    }
  };

  const addBubble = (type, content) => {
    setBubbles([...bubbles, { type, content }]);
  };

  const handleAddBubble = (type, label) => {
    setPopupContents([...popupContents, { type, label, content: '' }]);
  };

  const handlePopupChange = (index, value) => {
    const updatedPopupContents = [...popupContents];
    updatedPopupContents[index].content = value;
    setPopupContents(updatedPopupContents);
  };

  const deletePopup = (index) => {
    const updatedPopupContents = [...popupContents];
    updatedPopupContents.splice(index, 1);
    setPopupContents(updatedPopupContents);
  };

  const saveAllPopups = () => {
    const newBubbles = [...bubbles];

    popupContents.forEach((popup) => {
      if (popup.type === 'ratings' && selectedRating !== null) {
        newBubbles.push({ type: popup.type, content: `${selectedRating} ⭐` });
      } else if (popup.type === 'email' && popup.content.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        newBubbles.push({ type: popup.type, content: popup.content });
      } else if ((popup.type === 'number' || popup.type === 'phone') && !isNaN(popup.content)) {
        newBubbles.push({ type: popup.type, content: popup.content });
      } else if (popup.content) {
        newBubbles.push({ type: popup.type, content: popup.content });
      }
    });

    setBubbles(newBubbles);
    setPopupContents([]);
    localStorage.setItem('bubbles', JSON.stringify(newBubbles));
  };

  const RatingButton = ({ value }) => (
    <button
      className={`rating-button ${selectedRating === value ? 'selected' : ''}`}
      onClick={() => setSelectedRating(value)}
    >
      {value} ⭐
    </button>
  );

  const deleteBubble = (index) => {
    const updatedBubbles = bubbles.filter((_, i) => i !== index);
    setBubbles(updatedBubbles);
    localStorage.setItem('bubbles', JSON.stringify(updatedBubbles));
  };

  const completionRate = starts ? Math.round((completion / starts) * 100) : 0;

  const chartData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completion, starts - completion],
        backgroundColor: ["#007BFF", "#D3D3D3"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className={`edit-form-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <nav className="navbar">
          <div className="navbar-left">
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Enter Form Name"
              className="form-name-input"
            />
          </div>
          <div className="navbar-center">
            <button className="nav-button" onClick={() => setShowSideMenu(true)}>Flow</button>
            <button className="nav-button" onClick={() => setShowSideMenu(false)}>Response</button>
          </div>
          <div className="navbar-right">
            <label className="toggle-switch">
              <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
              <span className="slider"></span>
            </label>
            <button className="share">Share</button>
            <button className="save" onClick={handleSave}>Save</button>
            <button className="close" onClick={() => navigate(-1)}>X</button>
          </div>
        </nav>
        <div className="edit-form-main">
          <h2>{formName}</h2>
          {showSideMenu ? (
            <div className="sidebar">
              <div className="sidebar-section">
                <h3>Bubbles</h3>
                <button onClick={() => handleAddBubble('text', 'Enter your message')}><img className='b' src={tImage} alt="dd1" />Text</button>
                <button onClick={() => handleAddBubble('image', 'Enter image URL')}><img className='b' src={t1Image} alt="dd1" />Image</button><br></br>
                <button onClick={() => handleAddBubble('video', 'Enter video URL')}><img className='b' src={vImage} alt="dd1" />Video</button>
                <button onClick={() => handleAddBubble('gif', 'Enter GIF URL')}><img className='b' src={gifImage} alt="dd1" />GIF</button>
              </div>
              <div className="sidebar-section">
                <h3>Inputs</h3>
                <button onClick={() => handleAddBubble('text', 'Enter your message')}><img className='b' src={b1Image} alt="dd1" />Text</button>
                <button onClick={() => handleAddBubble('number', 'Enter a number')}><img className='b' src={b2Image} alt="dd1" />Number</button><br></br>
                <button onClick={() => handleAddBubble('email', 'Enter your email')}><img className='b' src={b3Image} alt="dd1" />Email</button>
                <button onClick={() => handleAddBubble('phone', 'Enter your phone number')}><img className='b' src={b4Image} alt="dd1" />Phone</button><br></br>
                <button onClick={() => handleAddBubble('date', 'Select a date')}><img className='b' src={b5Image} alt="dd1" />Date</button>
                <button onClick={() => handleAddBubble('ratings', 'Select a rating')}><img className='b' src={b6Image} alt="dd1" />Rating</button><br></br>
                <button onClick={() => handleAddBubble('button', 'Enter button text')}><img className='b' src={b7Image} alt="dd1" />Button</button>
              </div>
            </div>
          ) : (
            <div className="response-section">
              <h2>Response</h2>
              <div className="stats-container">
                <div className="stat">
                  Views <span>{views}</span>
                </div>
                <div className="stat">
                  Starts <span>{starts}</span>
                </div>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Submitted At</th>
                      <th>Button 1</th>
                      <th>Email</th>
                      <th>Text</th>
                      <th>Button 2</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index}>
                        <td>{row.date}</td>
                        <td>{row.button1}</td>
                        <td>{row.email || "-"}</td>
                        <td>{row.text || "-"}</td>
                        <td>{row.button2 || "-"}</td>
                        <td>{row.rating || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="completion-chart">
                <Doughnut data={chartData} />
                <div className="chart-overlay">
                  <div className="completed-count">Completed: {completion}</div>
                  <div className="completion-rate">{completionRate}%</div>
                </div>
                <div className="rate1">
                  <div className="completion-rate1">
                    {`Completion Rate: ${completionRate}%`}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="form-workspace">
            <button className="start-button" onClick={() => navigate(`/chatbot/${formId}`)}><img className="ss" src={sImage} alt="dd1" />Start</button>
            {bubbles.map((bubble, index) => (
              <div key={index} className="bubble-container">
                {bubble.type === "text" && (
                  <div>
                    <p>{bubble.content}</p>
                    <button className="delete-button" onClick={() => deleteBubble(index)}><img className="dd1" src={dImage} alt="dd1" /></button>
                  </div>
                )}
                {bubble.type === "number" && (
                  <div>
                    <input type="number" value={bubble.content} readOnly />
                    <button className="delete-button" onClick={() => deleteBubble(index)}><img className="dd1" src={dImage} alt="dd1" /></button>
                  </div>
                )}
                {bubble.type === "email" && (
                  <div>
                    <input type="email" value={bubble.content} readOnly />
                    <button className="delete-button" onClick={() => deleteBubble(index)}><img className="dd1" src={dImage} alt="dd1" /></button>
                  </div>
                )}
                {bubble.type === "phone" && (
                  <div>
                    <input type="tel" value={bubble.content} readOnly />
                    <button className="delete-button" onClick={() => deleteBubble(index)}><img className="dd1" src={dImage} alt="dd1" /></button>
                  </div>
                )}
                {bubble.type === "date" && (
                  <div>
                    <input type="date" value={bubble.content} readOnly />
                    <button className="delete-button" onClick={() => deleteBubble(index)}><img className="dd1" src={dImage} alt="dd1" /></button>
                  </div>
                )}
                {bubble.type === "ratings" && (
                  <div>
                    <p>Rating: {bubble.content}</p>
                    <button className="delete-button" onClick={() => deleteBubble(index)}><img className="dd1" src={dImage} alt="dd1" /></button>
                  </div>
                )}
                {bubble.type === "button" && (
                  <div>
                    <button>{bubble.content}</button>
                    <button className="delete-button" onClick={() => deleteBubble(index)}><img className="dd1" src={dImage} alt="dd1" /></button>
                  </div>
                )}
                {bubble.type === "image" && (
                  <div>
                    <img src={bubble.content} alt={`Bubble ${index}`} />
                    <button className="delete-button" onClick={() => deleteBubble(index)}><img className="dd1" src={dImage} alt="dd1" /></button>
                  </div>
                )}
                {bubble.type === "video" && (
                  <div>
                    <video src={bubble.content} controls />
                    <button className="delete-button" onClick={() => deleteBubble(index)}><img className="dd1" src={dImage} alt="dd1" /></button>
                  </div>
                )}
                {bubble.type === "gif" && (
                  <div>
                    <img src={bubble.content} alt={`Bubble ${index}`} />
                    <button className="delete-button" onClick={() => deleteBubble(index)}><img className="dd1" src={dImage} alt="dd1" /></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="popup-container-b">
          <center>
            {popupContents.map((popup, index) => (
              <div key={index} className="popup">
                <div className="popup-content-b">
                  <label>{popup.label}</label>
                  {popup.type === "date" ? (
                    <input
                      type="date"
                      value={popup.content}
                      onChange={(e) => handlePopupChange(index, e.target.value)}
                    />
                  ) : popup.type === "ratings" ? (
                    <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <RatingButton key={star} value={star} />
                      ))}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={popup.content}
                      onChange={(e) => handlePopupChange(index, e.target.value)}
                      placeholder={popup.label}
                    />
                  )}
                  <button onClick={() => deletePopup(index)}><img className="dd1" src={dImage} alt="dd1" /></button>
                </div>
              </div>
            ))}
          </center>
        </div>
      </div>
    </>
  );
};

export default EditForm;