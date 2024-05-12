import React, { useState } from 'react';
import './Salary.css'

const AttendanceForm = ({ onSubmit, submissionStatus }) => {
  const [name, setName] = useState(''); // State variable for storing the name
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleTimeString(); // Get current time
    await onSubmit({ name, date, inTime: currentTime, status }); // Pass name along with other form data
    // Clear form fields after submission
    setName('');
    setDate('');
    setStatus('');
  };  

  return (
    <div>
      <h2>Record Attendance</h2>
      {submissionStatus === 'success' && <p className="success-message">Attendance recorded successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Select Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AttendanceForm;
