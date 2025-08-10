import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">🦠 COVID Tracker</h1>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/global">Global</Link></li>
          <li><Link to="/countries">Countries</Link></li>
          <li><Link to="/trend">Trend</Link></li>
          <li><Link to="/charts">Top 10</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;