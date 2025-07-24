import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GlobalStats = () => {
  const [global, setGlobal] = useState(null);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/all')
      .then(res => {
        setGlobal(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  if (!global) return <p>Loading...</p>;

  return (
    <div>
      <h2>Global COVID-19 Overview</h2>
      <p>Total Cases: {global.cases}</p>
      <p>Total Deaths: {global.deaths}</p>
      <p>Total Recovered: {global.recovered}</p>
      <p>Active Cases: {global.active}</p>
    </div>
  );
};

export default GlobalStats;