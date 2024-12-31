import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-links">
          {/* No buttons here */}
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        <h1 className="heading">DOCUSPHERE</h1>
        <div className="button-container">
          <button className="main-button" onClick={() => navigate('/login')}>Login</button>
          <button className="main-button" onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
