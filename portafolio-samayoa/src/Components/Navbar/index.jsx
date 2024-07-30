// src/components/Navbar.jsx
import React from "react";
import "./Navbar.css";
import logo from "/letter-s-logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src={logo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/">Principal</a>
        </li>
        <li>
          <a href="/blog">Blog</a>
        </li>
        <li>
          <a href="/contact">Contacto</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
