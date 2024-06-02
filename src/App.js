import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ListPage from './pages/ListPage';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './pages/ErrorPage';


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token =localStorage.getItem('userToken') || null
    if (token) {
      setUser(token);
    }
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem('userToken') || null
    setUser(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginComponent onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/" element={<ProtectedRoute element={HomePage} />} />
        <Route path="/lists/search/:listId" element={<ProtectedRoute element={ListPage} />} />
        <Route path="*" element={<ErrorPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;

