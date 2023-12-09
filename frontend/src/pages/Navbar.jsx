import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg py-2 px-2">
      <div className="container-fluid p-1">
        <a className="navbar-brand" href="#">NU Jobs</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item px-2">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="#">Jobs</a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="#">About Us</a>
            </li>
            <li>
              <div className="btn-group">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Resources
                </button>
                <ul className="dropdown-menu">
                  <li
                    className="text-center"
                    style="padding: 10px; text-align: justify"
                  >
                    Resume generation
                  </li>
                  <li
                    className="text-center"
                    style="padding: 10px; text-align: justify"
                  >
                    CV generation
                  </li>
                  <li
                    className="text-center"
                    style="padding: 10px; text-align: justify"
                  >
                    Interview preparation
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <a
              href="/pages/login.html"
              className="btn btn-dark mx-3"
              type="submit"
              id="login-page-button"
              onclick="loadLoginPage()"
              >Log in</a
            >
            <a
              href="/pages/login.html"
              className="btn btn-outline-dark"
              type="submit"
              id="signup-page-button"
              onclick="loadLoginPage()"
              >Sign up</a
            >
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;