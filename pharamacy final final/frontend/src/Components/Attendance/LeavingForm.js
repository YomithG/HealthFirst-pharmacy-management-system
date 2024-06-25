// LeavingForm.js

import React, { useState } from 'react';

const LeavingForm = ({ onSubmit, submissionStatus }) => { // Receive submissionStatus as prop
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Format month and day to have leading zero if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleTimeString();
    await onSubmit({ name, date, outTime: currentTime });
    setName('');
    setDate('');
  };  

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date();
    const selectedDateTime = new Date(selectedDate);

    if (selectedDateTime.getTime() !== today.getTime()) {
      setErrorMessage('Please select today\'s date.');
    } else {
      setErrorMessage('');
      setDate(selectedDate);
    }
  };

  return (
    <div>
      <h2><center>Record Leaves</center></h2>
      <br/><center>
      Submit when you are going home. If you need to leave the pharmacy early; should get the permission from the Owner.
      </center>
      <br/>
      <br/>
      <form onSubmit={handleSubmit} className="leave-form">
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
            onChange={handleDateChange}
            required
          />
          {errorMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}
        </div>
        <button type="submit">Submit</button>
        {submissionStatus === 'success' && <p>Leave submitted successfully!</p>}
      {submissionStatus === 'error' && <p>Error submitting leave. Please try again.</p>}
      </form>
    </div>
  );
};

export default LeavingForm;
