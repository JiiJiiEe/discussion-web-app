import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import ThreadList from './components/threadList';
import ThreadPage from './components/threadPage';
import Login from './auth/login';
import Register from './auth/register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="content">
        <Header />
        <Routes>
          <Route path="/" exact element={< ThreadList />} />
          <Route path="/thread/:id" element={< ThreadPage />} />
          <Route path="/login" element={< Login />} />
          <Route path="/register" element={< Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;