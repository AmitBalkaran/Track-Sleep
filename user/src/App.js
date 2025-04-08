import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import SleepTracker from './components/SleepTracker';
import logo from './logo.svg';
import './App.css';

// Globally enable credentials for axios requests
axios.defaults.withCredentials = true;

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch the current user details from the backend once the app mounts.
  useEffect(() => {
    axios.get('http://localhost:8000/api/current-user/')
      .then(response => {
        setCurrentUser(response.data);
      })
      .catch(error => {
        console.log('User not logged in or error fetching current user:', error);
        setCurrentUser(null);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Header with logo and app title */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Sleep Tracker App</h1>
          {/* Show the logged-in username if available */}
          {currentUser && (
            <div style={{ margin: '1rem', fontSize: '1.2rem' }}>
              Logged in as: <strong>{currentUser.username}</strong>
            </div>
          )}
        </header>

        {/* Navigation links */}
        <nav style={{ margin: '1rem' }}>
          <Link to="/">Home</Link> | <Link to="/tracker">Sleep Tracker</Link> |{' '}
          <a href="http://localhost:8000/accounts/logout/?next=http://localhost:3000" style={{ marginLeft: '1rem' }}>
            Logout
          </a>
        </nav>
        <hr />

        {/* Define application routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracker" element={<SleepTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
