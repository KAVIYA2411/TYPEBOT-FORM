import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import fImage from './assets/SVG (1).png';
import dImage from './assets/delete (1).png';
import vImage from './assets/Vector.png';


const Workspace = () => {
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode')) || false
  );
  const [showFolderPopup, setShowFolderPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({ id: null, type: null });
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [shareMode, setShareMode] = useState('Edit');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const { userName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://backent-type.onrender.com');
        const data = response.data;
        const folderItems = data.filter((item) => item.type === 'folder');
        const formItems = data.filter((item) => item.type === 'form');
        setFolders(folderItems);
        setForms(formItems);
      } catch (error) {
        console.error('Error fetching items:', error.response?.data || error.message);
      }
    };

    fetchItems();
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const createItem = async (name, type, setter, currentItems) => {
    try {
      const response = await axios.post('https://backent-type.onrender.com', { name, type });
      setter([...currentItems, response.data]);
    } catch (error) {
      console.error(`Error creating ${type}:`, error.response?.data || error.message);
    }
  };

  const deleteItem = async () => {
    const { id, type } = deleteInfo;

    try {
      await axios.delete(`https://backent-type.onrender.com`);
      if (type === 'folder') {
        setFolders(folders.filter((folder) => folder._id !== id));
      } else if (type === 'form') {
        setForms(forms.filter((form) => form._id !== id));
      }
      setShowDeletePopup(false);
    } catch (error) {
      console.error('Error deleting item:', error.response?.data || error.message);
    }
  };

  const handleDeleteClick = (id, type) => {
    setDeleteInfo({ id, type });
    setShowDeletePopup(true);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSendInvite = () => {
    alert(`Invite sent to ${inviteEmail} with ${shareMode} access.`);
    setInviteEmail('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard.');
  };

  const Popup = ({ title, onCreate, onClose }) => {
    const [name, setName] = useState('');

    const handleCreate = () => {
      if (name.trim()) {
        onCreate(name);
        setName('');
        onClose();
      } else {
        alert(`${title} name cannot be empty.`);
      }
    };

    return (
      <div className="popup">
        <div className="popup-content-c">
          <h2>Create New {title}</h2>
          <input className='fi'
            type="text"
            placeholder={`Enter ${title.toLowerCase()} name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className='dbn' onClick={handleCreate}>Done</button>
          <button className='cbn' onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };

  const ConfirmPopup = ({ message, onConfirm, onCancel }) => (
 <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
        <button className='dbn' onClick={onConfirm}>Confirm</button>
        <button className='cbn' onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );

  const createForm = async () => {
    const name = "New Form"; // Default name for the new form
    await createItem(name, 'form', setForms, forms);
  };

  return (
    <>
    <div className={`workspace-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <nav className="navbar">
        <div className="navbar-left">
          <center>
            <span className="workspace-label" onClick={handleDropdownToggle}>
              {userName}'s Workspace            
              <span className={`arrow ${isDropdownOpen ? 'rotate' : ''}`}>
                <img className="" src={vImage} alt="vector" /></span>
            </span>
          </center>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate(`/settings/${userName}`)}>Settings</button>
              <button onClick={() => navigate('/')}>Logout</button>
            </div>
          )}
        </div>
        <div className="navbar-right">
          <label className="toggle-switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
            <span className="slider"></span>
          </label>
          <button className="share" onClick={() => setShowSharePopup(true)}>Share</button>
        </div>
      </nav>
      <div className="workspace-actions">
        <button className='w1' onClick={() => setShowFolderPopup(true)}>
          <img className="f11" src={fImage} alt="f11" /> Create a Folder
        </button>
        <button className='w2' onClick={createForm}>
          <div className='plus'>+</div>Create a typebot
        </button>
      </div>
      <div className="folders-row">
        {folders.map((folder) => (
          <div key={folder._id} className="workspace-item">
            {folder.name}
            <button className="delete-button" onClick={() => handleDeleteClick(folder._id, 'folder')}>
              <img className="dd1" src={dImage} alt="dd1" />
            </button>
          </div>
        ))}
      </div>
      <div className="forms-row">
        {forms.map((form) => (
          <div key={form._id} className="workspace-item1" onClick={() => navigate(`/editform/${form._id}`)}>
            {form.name}
            <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDeleteClick(form._id, 'form'); }}>
              <img className="dd2" src={dImage} alt="dd2" />
            </button>
          </div>
        ))}
      </div>
      {showFolderPopup && (
        <center>
          <Popup
            title="Folder"
            onCreate={(name) => createItem(name, 'folder', setFolders, folders)}
            onClose={() => setShowFolderPopup(false)}
          />
        </center>
      )}
      {showDeletePopup && (
        <center>
          <ConfirmPopup
            
            message={`Are you sure you want to delete this ${deleteInfo.type}?`}
            onConfirm={deleteItem}
            onCancel={() => setShowDeletePopup(false)}
          />
        </center>
      )}
      {showSharePopup && (
        <center>
          <div className="popup">
            <div className="popup-content-s">
              <button className="close-button" onClick={() => setShowSharePopup(false)}>X</button>
              <div className="mode-selector">
                <select className="mode"
                  value={shareMode}
                  onChange={(e) => setShareMode(e.target.value)}
                >
                  <option value="Edit">Edit</option>
                  <option value="View">View</option>
                </select>
              </div>
              <div>
                <h3>Invite by Email</h3>
                <input className='fi2'
                  type="email"
                  placeholder="Enter email id"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <button className='sbn' onClick={handleSendInvite}>Send Invite</button>
                <h3>Invite by Link</h3>
                < button className='sbn' onClick={handleCopyLink}> Copy Link</button>
              </div>
            </div>
          </div>
        </center>
      )}
    </div>
    </>
  );
};

export default Workspace;