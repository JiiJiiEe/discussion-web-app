import { jwtDecode } from 'jwt-decode';

// Store JWT tokens
export const setTokens = (tokens) => {
  localStorage.setItem('access_token', tokens.access);
  localStorage.setItem('refresh_token', tokens.refresh);
};

// Get tokens
export const getAccessToken = () => localStorage.getItem('access_token');

// Get user
export const getCurrentUser = () => {
  const token = getAccessToken();
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Invalid token");
      return null;
    }
  }
  //return {user_id: "unknown"};
  return null;
};

// Log out
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
