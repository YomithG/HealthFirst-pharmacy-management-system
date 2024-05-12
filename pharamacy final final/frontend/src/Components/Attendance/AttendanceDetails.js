import React from 'react';

const AttendanceDetails = ({ attendanceData }) => {
  // Function to format the date string to display only the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Get only the date portion
  };

  // Group attendance records by name and count 'present' statuses
  const groupedAttendance = {};
  attendanceData.forEach((record) => {
    if (!groupedAttendance[record.name]) {
      groupedAttendance[record.name] = { records: [], presentCount: 0 };
    }
    groupedAttendance[record.name].records.push(record);
    if (record.status === 'present') {
      groupedAttendance[record.name].presentCount++;
    }
  });

  return (
    <div>
      {Object.keys(groupedAttendance).map((name, index) => (
        <div key={index} className="table-container">
          <h2>Attendance Details for {name}</h2>
          <div>Presents: {groupedAttendance[name].presentCount}</div>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>In Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {groupedAttendance[name].records.map((record, index) => (
                <tr key={index}>
                  <td>{record._id}</td> {/* Display the ID */}
                  <td>{record.name}</td> {/* Display the name */}
                  <td>{formatDate(record.date)}</td> {/* Format the date */}
                  <td>{record.inTime}</td> {/* Display the inTime */}
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AttendanceDetails;
