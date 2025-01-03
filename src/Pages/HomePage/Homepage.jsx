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
      <div
        className="content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          padding: '20px',
        }}
      >
        <h1
          className="heading"
          style={{
            fontSize: '4rem', // Increased font size
            marginBottom: '2rem',
            color: '#333',
            fontWeight: 'bold', // Added boldness to the text
            animation: 'fadeIn 2s ease-in-out, scaleUp 1.5s ease-in-out, glowEffect 1.5s ease-in-out infinite', // Added glowing animation
          }}
        >
          DOCUSPHERE
        </h1>
        <div
          className="button-container"
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center', // Center the buttons
          }}
        >
          <button
            className="btn btn-primary"
            onClick={() => navigate('/login')}
            style={{
              padding: '1rem 3rem', // Adjusted padding to create oval shape
              fontSize: '1.2rem', // Slightly larger font size
              backgroundColor: 'black', // Black background color
              color: 'white', // White text color
              borderRadius: '50px', // Oval shape (increased borderRadius)
              border: '2px solid white', // Added visible border around button
              cursor: 'pointer', // Cursor change on hover
              transition: 'all 0.3s ease', // Smooth transition for hover effect
              animation: 'fadeIn 2s ease-in-out', // Fade-in effect for buttons
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', // Soft shadow effect
            }}
          >
            Login
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate('/register')}
            style={{
              padding: '1rem 3rem', // Adjusted padding to create oval shape
              fontSize: '1.2rem', // Slightly larger font size
              backgroundColor: 'black', // Black background color
              color: 'white', // White text color
              borderRadius: '50px', // Oval shape (increased borderRadius)
              border: '2px solid white', // Added visible border around button
              cursor: 'pointer', // Cursor change on hover
              transition: 'all 0.3s ease', // Smooth transition for hover effect
              animation: 'fadeIn 2s ease-in-out', // Fade-in effect for buttons
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', // Soft shadow effect
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
