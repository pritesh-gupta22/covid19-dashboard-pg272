import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ChartPage = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
      .then(res => {
        const data = res.data;
        setChartData({
          labels: Object.keys(data.cases),
          datasets: [
            {
              label: 'Cases',
              data: Object.values(data.cases),
              borderColor: 'blue',
              fill: false,
            },
            {
              label: 'Deaths',
              data: Object.values(data.deaths),
              borderColor: 'red',
              fill: false,
            },
          ],
        });
      })
      .catch(err => console.error(err));
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div>
      <h2>Last 30 Days Global Trend</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ChartPage;