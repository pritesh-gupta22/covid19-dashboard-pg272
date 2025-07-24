import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries?sort=cases')
      .then(res => {
        const top10 = res.data.slice(0, 10);
        setChartData({
          labels: top10.map((c) => c.country),
          datasets: [
            {
              label: 'Cases',
              data: top10.map((c) => c.cases),
              backgroundColor: 'rgba(59,130,246,0.6)', // Tailwind blue-500
            },
          ]
        });
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">📈 Top 10 Countries by Cases</h2>
      <div className="bg-white p-4 shadow-md rounded-lg">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Charts;