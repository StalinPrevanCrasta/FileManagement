import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-links">
          {/* Navigation links if needed */}
        </div>
      </nav>

      {/* Main Content */}
      <div className="content" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        padding: '20px'
      }}>
        <h1 className="heading" style={{
          fontSize: '2.5rem',
          marginBottom: '2rem',
          color: '#333'
        }}>
          DOCUSPHERE
        </h1>
        <div className="button-container" style={{
          display: 'flex',
          gap: '1rem'
        }}>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/login')}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1.1rem'
            }}
          >
            Login
          </button>
          <button 
            className="btn btn-outline-primary"
            onClick={() => navigate('/register')}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1.1rem'
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
