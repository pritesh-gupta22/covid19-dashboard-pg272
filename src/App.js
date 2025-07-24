import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import GlobalStats from './components/GlobalStats';
import CountryList from './components/CountryList';
import About from './components/About';
import CountryDetail from './components/CountryDetail';
import ChartPage from './components/ChartPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/global" element={<GlobalStats />} />
            <Route path="/countries" element={<CountryList />} />
            <Route path="/charts" element={<ChartPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/country/:name" element={<CountryDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
