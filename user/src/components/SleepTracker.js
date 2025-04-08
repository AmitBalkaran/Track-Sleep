import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SleepTracker = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({ date: '', hours: '' });

  axios.defaults.withCredentials = true;

  // Fetch sleep records on component mount.
  useEffect(() => {
    axios.get('http://localhost:8000/api/sleep-records/', { withCredentials: true })
      .then(response => {
        // For consistency, sort records by date (if needed)
        const sortedRecords = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setRecords(sortedRecords);
      })
      .catch(error => {
        console.error('Error fetching sleep records:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input: Ensure date and hours are provided
    if (!formData.date || !formData.hours) return;

    axios.post('http://localhost:8000/api/sleep-records/', formData, { withCredentials: true })
      .then(response => {
        const newRecord = response.data;
        // Optionally, re-sort if needed
        const updatedRecords = [...records, newRecord].sort((a, b) => new Date(a.date) - new Date(b.date));
        setRecords(updatedRecords);
        setFormData({ date: '', hours: '' });
      })
      .catch(error => {
        console.error('Error adding sleep record:', error);
      });
  };

  // Prepare the chart data. Make sure the x-axis uses the date and y-axis shows hours.
  const chartData = {
    labels: records.map(record => record.date),
    datasets: [
      {
        label: 'Hours Slept',
        data: records.map(record => record.hours),
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Sleep Tracker</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            required
            placeholder="Hours slept"
            step="0.1"
          />
        </div>
        <button type="submit">Add Record</button>
      </form>
      <div style={{ width: '80%', margin: '2rem auto' }}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default SleepTracker;
