import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import forumApi from '../forumApi';
import axios from 'axios';
import { setTokens } from './auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    forumApi.post('/auth/login/', {
      username,
      password,
    })
    .then((response) => {
      setTokens(response.data);
      navigate('/');  // Redirect to homepage on success
    })
    .catch((err) => {
      setError('Invalid username or password', err);
    });
  };

  return (
    <div className="section is-large">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;