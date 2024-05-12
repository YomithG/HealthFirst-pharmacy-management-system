// Leave.js

import React, { useState, useEffect } from 'react';
import LeavingDetails from '../components/LeavingDetails';
import axios from 'axios';

const Leave = () => {
  const [leaveData, setLeaveData] = useState([]);

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get('/api/leave');
      console.log(response.data); // Log the received data
      setLeaveData(response.data);
    } catch (error) {
      console.error('Error fetching leave data:', error);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  return (
    <div>
      <LeavingDetails leaveData={leaveData} />
    </div>
  );
};

export default Leave;
