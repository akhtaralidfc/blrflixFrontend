import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterComponent.css';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://blrflixbackend.onrender.com/api/users/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('userToken', JSON.stringify(response.data.token));
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

return (
    <form onSubmit={handleSubmit} className="register-container">
      <h2>Register</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};
export default RegisterComponent;
