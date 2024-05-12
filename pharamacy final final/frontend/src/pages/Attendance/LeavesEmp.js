// LeavesEmp.js

import React, { useState } from 'react';
import LeavingForm from '../components/LeavingForm';
import axios from 'axios';

const LeavesEmp = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const submitLeave = async (leaveRecord) => {
    try {
      await axios.post('/api/leave', leaveRecord);
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
