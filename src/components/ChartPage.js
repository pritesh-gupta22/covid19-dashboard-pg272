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
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  // Convert API label (M/D/YY) → YYYY-MM-DD
  const formatLabelToISO = (label) => {
    const [month, day, year] = label.split('/');
    return `20${year.padStart(2, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
      );
      const data = res.data;

      // Normalize labels to YYYY-MM-DD format
      let labels = Object.keys(data.cases).map(formatLabelToISO);

      // Set available date range for pickers
      if (!minDate && !maxDate) {
        setMinDate(labels[0]);
        setMaxDate(labels[labels.length - 1]);
      }

      let startIndex = 0;
      let endIndex = labels.length - 1;

      if (dateRange.start && dateRange.end) {
        startIndex = labels.indexOf(dateRange.start);
        endIndex = labels.indexOf(dateRange.end);

        if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
          alert('Invalid date range selected');
          return;
        }
      }

      labels = labels.slice(startIndex, endIndex + 1);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Cases',
            data: Object.values(data.cases).slice(startIndex, endIndex + 1),
            borderColor: 'blue',
            fill: false
          },
          {
            label: 'Deaths',
            data: Object.values(data.deaths).slice(startIndex, endIndex + 1),
            borderColor: 'red',
            fill: false
          }
        ]
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div>
      <h2>
        Global Trend
        {dateRange.start && dateRange.end
          ? ` (${dateRange.start} to ${dateRange.end})`
          : ' (All Available Data)'}
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Start Date:{' '}
          <input
            type="date"
            min={minDate}
            max={maxDate}
            value={dateRange.start}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, start: e.target.value }))
            }
          />
        </label>{' '}
        <label>
          End Date:{' '}
          <input
            type="date"
            min={minDate}
            max={maxDate}
            value={dateRange.end}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, end: e.target.value }))
            }
          />
        </label>
        <button onClick={fetchData} style={{ marginLeft: '10px' }}>
          Update Chart
        </button>
      </div>

      <Line data={chartData} />
    </div>
  );
};

export default ChartPage;