import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginComponent = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://blrflixbackend.onrender.com/api/users/login', {
        email,
        password,
      });
      localStorage.setItem('userToken', JSON.stringify(response.data.token));
      onLogin(); // Call the onLogin function to update the user state
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email or mobile number:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
        {error && <p>{error}</p>}
      </form>
      <div>
        {/* <button className="secondary-btn">Use a sign-in code</button> */}
        {/* <p>Forgot password?</p> */}
        
        <p>New one? <Link to="/register" className='signup'>Register Now!</Link></p>
      </div>
    </div>
  );
};

export default LoginComponent;
