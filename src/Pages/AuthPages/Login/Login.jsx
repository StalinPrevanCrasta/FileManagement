import React from 'react';
import LoginForm from '../../../Components/AuthComponents/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
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
      color: '#ffffff',
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
      color: '#ffffff', // White color for the "Login" link text
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login here</h1>
      <div style={styles.row}>
        <div style={styles.col}>
          <LoginForm />
          <div className="text-center mt-3">
            Not a member?&nbsp;
            <Link 
              to="/register" 
              style={styles.link}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;  