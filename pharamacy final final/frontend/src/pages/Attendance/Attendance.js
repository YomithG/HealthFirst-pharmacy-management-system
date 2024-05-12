import React, { useState, useEffect } from 'react';
import AttendanceDetails from '../components/AttendanceDetails'; // Adjust the import path as per your project structure
import axios from 'axios'; // Import Axios for making HTTP requests

const Attendance = ({ inTime }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  // Function to fetch attendance data from the server
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('/api/attendance'); // Adjust API endpoint as per your backend setup
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