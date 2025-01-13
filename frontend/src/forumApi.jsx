import axios from 'axios';
import { getAccessToken, logout } from './auth/auth';

const forumApi = axios.create({
  baseURL: 'http://localhost:8000/api',  // Change 
});

// Attach JWT token to every request
forumApi.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 errors (token expired or not authorized)
forumApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      logout(); // If token is invalid, log the user out
      window.location = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default forumApi;