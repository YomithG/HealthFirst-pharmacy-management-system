// Leave.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SalaryManagement.css';
import LeavingDetails from '../../Components/SalaryManagement/LeavingDetails';

const Leave = () => {
  const [leaveData, setLeaveData] = useState([]);

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/leave');
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
