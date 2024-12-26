import React from "react";
import { Link } from "react-router-dom";

const NavigationComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand ms-5" to="/">
        File Management System
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto me-5">
          {/* Login Button */}
          <li className="nav-item mx-2">
            <Link className="btn btn-primary btn-sm" to="/login">
              Login
            </Link>
          </li>
          {/* Register Button */}
          <li className="nav-item">
            <Link className="btn btn-success btn-sm" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationComponent;
