import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../GlobalStats.css'; // add this CSS file

const GlobalStats = () => {
  const [global, setGlobal] = useState(null);

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/all')
      .then((res) => {
        setGlobal(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!global) return <p className="global-loading">Loading...</p>;

  return (
    <div className="global-container">
      <h2 className="global-heading">🌐 Global COVID-19 Overview</h2>
      <div className="stats-grid">
        <div className="stat-card cases">
          <h3>Total Cases</h3>
          <p>{global.cases.toLocaleString()}</p>
        </div>
        <div className="stat-card deaths">
          <h3>Total Deaths</h3>
          <p>{global.deaths.toLocaleString()}</p>
        </div>
        <div className="stat-card recovered">
          <h3>Total Recovered</h3>
          <p>{global.recovered.toLocaleString()}</p>
        </div>
        <div className="stat-card active">
          <h3>Active Cases</h3>
          <p>{global.active.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalStats;
