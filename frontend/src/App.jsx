import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Register from './register';
import Login from './login';
import Workspace from './workspace';
import Settings from './setting';
import EditForm from './EditForm'
import Chatbot from './Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workspace/:userName" element={<Workspace />} />
        <Route path="/settings/:userName" element={<Settings/>} />
        <Route path="/editform/:formId" element={<EditForm />} />
        <Route path="/chatbot/:formId" element={<Chatbot />} />
        
      </Routes>
    </Router>
  );
}

export default App;
