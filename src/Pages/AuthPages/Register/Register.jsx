import React from 'react';
import RegisterForm from '../../../Components/AuthComponents/RegisterForm';
import { Link } from 'react-router-dom';
import './Register.css'; // Import the CSS file here

const Register = () => {
  return (
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
