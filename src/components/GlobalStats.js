import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GlobalStats = () => {
  const [global, setGlobal] = useState(null);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/all')
      .then(res => setGlobal(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!global) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🌍 Global COVID-19 Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        <StatCard label="Total Cases" value={global.cases} color="text-blue-600" />
        <StatCard label="Total Deaths" value={global.deaths} color="text-red-600" />
        <StatCard label="Recovered" value={global.recovered} color="text-green-600" />
        <StatCard label="Active Cases" value={global.active} color="text-yellow-600" />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className="bg-white shadow-md rounded-lg p-5 text-center">
    <p className="text-lg font-semibold text-gray-700">{label}</p>
    <p className={`text-2xl font-bold mt-2 ${color}`}>{value.toLocaleString()}</p>
  </div>
);

export default GlobalStats;
