import React, { useState, useEffect, useCallback } from "react";

import { NavLink } from "react-router-dom";

import Logo from "../../assets/img/logo.png";

import classes from "./Navigation.css";
import iziToast from "izitoast";

const Navigation = () => {
  return (
    <header id="header" className="fixed-top header-transparent">
      <div className="container">
        <div className="logo float-left">
          <NavLink to="/" exact>
            <img src={Logo} alt="" className="img-fluid" />
          </NavLink>
        </div>
        <nav className="nav-menu float-right d-none d-lg-block">
          <ul>
            <li>
              <NavLink to="/" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about/" exact>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/services/" exact>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/team/" exact>
                Team
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog/" exact>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact/" exact>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup/" exact className={classes.SignUp}>
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
