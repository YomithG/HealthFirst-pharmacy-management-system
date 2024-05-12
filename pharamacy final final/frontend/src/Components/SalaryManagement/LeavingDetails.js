import React from 'react';
import './Salary.css'
const LeavingDetails = ({ leaveData }) => {
  // Function to format the date string to display only the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Get only the date portion
  };

  // Group attendance records by name
  const groupedLeave = {};
  leaveData.forEach((record) => {
    if (!groupedLeave[record.name]) {
      groupedLeave[record.name] = [];
    }
    groupedLeave[record.name].push(record);
  });

  return (
    <div>
      {Object.keys(groupedLeave).map((name, index) => (
        <div key={index} className="table-container">
          <h2>Leave Details for {name}</h2>
          <table className="leave-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Out Time</th>
              </tr>
            </thead>
            <tbody>
              {groupedLeave[name].map((record, index) => (
                <tr key={index}>
                  <td>{record._id}</td> {/* Display the ID */}
                  <td>{record.name}</td> {/* Display the name */}
                  <td>{formatDate(record.date)}</td> {/* Format the date */}
                  <td>{record.outTime}</td> {/* Display the outTime */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default LeavingDetails;
