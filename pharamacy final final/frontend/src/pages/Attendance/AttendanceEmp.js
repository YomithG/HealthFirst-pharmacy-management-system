import React, { useState } from 'react';
import AttendanceForm from '../components/AttendanceForm';
import axios from 'axios'; 

const AttendanceEmp = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null); // State variable to track submission status
  
  // Function to submit new attendance record to the server
  const submitAttendance = async (attendanceRecord) => {
    try {
      await axios.post('/api/attendance', attendanceRecord); // Adjust API endpoint as per your backend setup
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
