import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../../Components/AuthComponents/LoginForm';
import './Login.css'; 

const Login = () => {
  return (
    <div className="container-fluid">
      <h1 className="login-heading text-center">Login here</h1>

      <div className="d-flex justify-content-center">
        <div className="wrapper">
          <div className="login-section">
            <div className="login-card">
              <div className="mb-5">
                <h3 className="h4 font-weight-bold text-theme">Login</h3>
              </div>
              <h6 className="h5 mb-0">Welcome back!</h6>
              <p className="text-muted mt-2 mb-5">
                Please enter your credentials to access the file management system.
              </p>

              {/* Use the LoginForm component here */}
              <LoginForm />

              <div className="mt-3 text-center">
                Not a member?&nbsp;
                <Link to="/register" className="text-primary">
                  Register
                </Link>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="image-section">
            <img
              src="/Visuals/hero.jpg"
              alt="Login Illustration"
              className="login-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
