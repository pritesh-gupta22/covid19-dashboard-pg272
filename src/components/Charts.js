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
  const [chartData, setChartData] = useState<any>({});

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
              backgroundColor: 'rgba(75,192,192,0.6)',
            },
          ]
        });
      });
  }, []);

  return (
    <div>
      <h2>Top 10 Countries by Cases</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Charts;