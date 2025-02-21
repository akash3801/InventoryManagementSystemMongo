import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // Import the custom CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("authToken") !== null;
  const userRole = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate("/"); // Redirect to home
    window.dispatchEvent(new Event("storage")); // Trigger storage event to update state in HomePage
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-body-tertiary gradient-custom">
      <div className="container-fluid">
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0 logo-container" to="/">
            <img
              src="/inventory-management.png"
              alt="Inventory Management"
              height="30"
              className="logo-img"
            />
            <h4 className="logo-text">Inventory Management System</h4>
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : userRole === "Admin" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/additem">
                    Add Inventory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/inventory">
                    Show Inventory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reports">
                    Reports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    id="logOutButton"
                    className="nav-link"
                    to="/"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/showinventory">
                    Update Inventory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/downloadReports">
                    Download Reports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
