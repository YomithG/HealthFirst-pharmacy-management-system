import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './SalaryManagement.css';
import AttendanceDetails from '../../Components/SalaryManagement/AttendanceDetails';

const Attendance = ({ inTime }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  // Function to fetch attendance data from the server
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/attendance'); // Adjust API endpoint as per your backend setup
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  // Fetch attendance data when the component mounts
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div>
      <AttendanceDetails attendanceData={attendanceData} inTime={inTime} />
    </div>
  );
};

export default Attendance;