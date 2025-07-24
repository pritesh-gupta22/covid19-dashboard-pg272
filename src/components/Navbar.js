import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link> | <Link to="/global">Global Overview</Link> | <Link to="/countries">Countries</Link> | <Link to="/charts">Charts</Link> | <Link to="/about">About</Link>
    </nav>
  );
};

export default Navbar;