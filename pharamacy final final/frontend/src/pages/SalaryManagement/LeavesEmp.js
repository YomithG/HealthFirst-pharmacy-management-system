// LeavesEmp.js

import React, { useState } from 'react';

import axios from 'axios';
import './SalaryManagement.css';
import LeavingForm from '../../Components/SalaryManagement/LeavingForm';

const LeavesEmp = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const submitLeave = async (leaveRecord) => {
    try {
      await axios.post('http://localhost:8070/api/leave', leaveRecord);
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error submitting leave:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div>
      <LeavingForm onSubmit={submitLeave} submissionStatus={submissionStatus} /> {/* Pass submissionStatus as prop */}
    </div>
  );
};

export default LeavesEmp;
