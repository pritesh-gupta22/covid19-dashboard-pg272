import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-center gap-6 border-b border-gray-200">
      <Link to="/" className="text-gray-800 hover:text-blue-600 font-medium">Home</Link>
      <Link to="/global" className="text-gray-800 hover:text-blue-600 font-medium">Global Overview</Link>
      <Link to="/countries" className="text-gray-800 hover:text-blue-600 font-medium">Countries</Link>
      <Link to="/charts" className="text-gray-800 hover:text-blue-600 font-medium">Charts</Link>
      <Link to="/about" className="text-gray-800 hover:text-blue-600 font-medium">About</Link>
    </nav>
  );
};

export default Navbar;
