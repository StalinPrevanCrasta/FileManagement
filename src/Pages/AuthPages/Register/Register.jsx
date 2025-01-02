import React from 'react';
import RegisterForm from '../../../Components/AuthComponents/RegisterForm';

import { Link } from "react-router-dom";

import { Link } from 'react-router-dom';
import './Register.css'; // Import the CSS file here


const Register = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#121212',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#BB86FC',
      marginBottom: '2rem',
      textShadow: '0 0 10px #BB86FC, 0 0 20px #BB86FC, 0 0 30px #BB86FC',
    },
    row: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    col: {
      backgroundColor: '#1F1B24',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      width: '100%',
      maxWidth: '500px',
    },
    link: {
      color: '#03DAC6',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    linkHover: {
      color: '#BB86FC',
    },
  };

  return (

    <div style={styles.container}>
      <h1 style={styles.title}>Register here</h1>
      <div style={styles.row}>
        <div style={styles.col}>
          <RegisterForm />
          <div className="text-center mt-3">
            Already a member?&nbsp;
            <Link 
              to="/login" 
              style={styles.link}
              onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
              onMouseOut={(e) => (e.target.style.color = styles.link.color)}
            >
              Login
            </Link>

    <div className="container-fluid">
      <h1 className="register-heading text-center">Register here</h1>

      <div className="d-flex justify-content-center">
        <div className="wrapper">
          {/* Register Form Section */}
          <div className="register-section">
            <div className="register-card">
              <div className="mb-5">
                <h3 className="h4 font-weight-bold text-theme">Register</h3>
              </div>
              <h6 className="h5 mb-0">Create a new account!</h6>
              <p className="text-muted mt-2 mb-5">
                Fill in your details to register.
              </p>

              <RegisterForm />

              <div className="mt-3 text-center">
                Already a member?&nbsp;
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="image-section">
            <img
              src="/Visuals/hero.jpg"
              alt="Register Illustration"
              className="register-image"
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
