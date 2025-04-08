import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Sleep Tracker!</h1>
      <p>Please log in to continue.</p>
      {/* Direct users to Django's Allauth login page */}
      <a href="http://localhost:8000/accounts/login/">Login with your Account</a>
    </div>
  );
};

export default Home;
