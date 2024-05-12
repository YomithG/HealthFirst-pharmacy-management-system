import React, { useState } from 'react';

import axios from 'axios'; // Assuming you're using axios for HTTP requests
import './SalaryManagement.css';
import AttendanceForm from '../../Components/SalaryManagement/AttendanceForm';

const AttendanceEmp = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null); // State variable to track submission status

  // Function to submit new attendance record to the server
  const submitAttendance = async (attendanceRecord) => {
    try {
      await axios.post('http://localhost:8070/api/attendance', attendanceRecord); // Adjust API endpoint as per your backend setup
      // Set submission status to success
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error submitting attendance:', error);
      // Set submission status to error if submission fails
      setSubmissionStatus('error');
    }
  };

  return (
    <div>
      <AttendanceForm onSubmit={submitAttendance} submissionStatus={submissionStatus} />
    </div>
  );
};

export default AttendanceEmp;
