import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../auth/auth';

const Header = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
    //console.log(user)
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">Home</Link>
        {!user && <Link className="navbar-item" to="/login">Login</Link>}
        {!user && <Link className="navbar-item" to="/register">Register</Link>}
        {user && <button className="navbar-item" onClick={handleLogout}>Logout</button>}
        </div>
        <div className='navbar-menu'>
        {user && <div className='navbar-end'>
          <div className="navbar-item"><strong>Logged: {user.username}</strong></div>
          </div>
          }
          </div>
    </nav>
  );
};

export default Header;