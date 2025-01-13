import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import forumApi from '../forumApi';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    forumApi.post('/auth/register/', {
      username,
      password,
    })
    .then(() => {
      navigate('/login');  // Redirect to login on successful registration
    })
    .catch((err) => {
      setError('Registration failed', err);
    });
  };

  return (
    <div className="section is-large">
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input className='input'
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required 
        />
        <input className='input'
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;