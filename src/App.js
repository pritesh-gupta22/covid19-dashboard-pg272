import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GlobalStats from './components/GlobalStats';
import CountryList from './components/CountryList';
import About from './components/About';
import CountryDetail from './components/CountryDetail';
import ChartPage from './components/ChartPage';

const App = () => {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Home</Link> | <Link to="/chart">Chart</Link> | <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<><GlobalStats /><CountryList /></>} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/country/:name" element={<CountryDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
