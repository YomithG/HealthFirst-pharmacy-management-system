// LeavingForm.js

import React, { useState } from 'react';
import './Salary.css'
const LeavingForm = ({ onSubmit, submissionStatus }) => { // Receive submissionStatus as prop
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleTimeString();
    await onSubmit({ name, date, outTime: currentTime });
    setName('');
    setDate('');
  };  

  return (
    <div>
      {submissionStatus === 'success' && <p>Leave submitted successfully!</p>} {/* Show submission success message */}
      {submissionStatus === 'error' && <p>Error submitting leave. Please try again.</p>} {/* Show submission error message */}
      <h2>Record Leaves</h2>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeavingForm;
