import React, { useState } from 'react';

const AttendanceForm = ({ onSubmit, submissionStatus }) => {
  const [name, setName] = useState(''); // State variable for storing the name
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
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
    const currentTime = new Date().toLocaleTimeString(); // Get current time
    await onSubmit({ name, date, inTime: currentTime, status }); // Pass name along with other form data
    // Clear form fields after submission
    setName('');
    setDate(getTodayDate());
    setStatus('');
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
    <form onSubmit={handleSubmit} className="attendance-form">
      <h2>Record Attendance</h2>
      <p>(Work hours are <b>7.30 a.m. to 6.00 p.m.</b> If you are not coming between these hours please state it clearly.)</p>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          required
          className="form-control"
        />
        {errorMessage && <p className="error-message" style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          required 
          className="form-control"
        >
          <option value="">Select Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
      </div>
      <button type="submit" className="btn-submit">Submit</button>
      {submissionStatus === 'success' && <p className="success-message">Attendance recorded successfully!</p>}
    </form>
  );
};

export default AttendanceForm;
