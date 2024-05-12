import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

function AllEmployee() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editId, setEditId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    function getEmployees() {
      axios.get("http://localhost:8070/employee_accounts/")
        .then((res) => {
          console.log(res.data);
          setEmployees(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getEmployees();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpdate = async (employeeId) => {
    try {
      await axios.put(`http://localhost:8070/employee_accounts/update_employee/${employeeId}`, editedEmployee);
      setEditId(null); // Disable editing after saving
      // Optionally, update the state to reflect any changes
    } catch (err) {
      alert(err.message); // Handle error
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:8070/employee_accounts/delete_employee/${employeeId}`);
      setEmployees(employees.filter(employee => employee._id !== employeeId));
    } catch (err) {
      alert(err.message); // Handle error
    }
  };

  const exportToExcel = () => {
    const fileName = "employees.xlsx";
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, fileName);
  };

  const handleInputChange = (e, key) => {
    setEditedEmployee({ ...editedEmployee, [key]: e.target.value });
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter(employee =>
    employee.FullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="" style={{ marginTop: '80px' }}>
      <div className="row">
        <div className="col-md-6">
          <h1 className="mt-5">All Employees</h1>
          <div>
            <button className="btn btn-primary" onClick={()=>navigate('/add-employee')}>
              ADD EMPLOYEE
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-end mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <p>Total Employees: {filteredEmployees.length}</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Full Name</th>
              <th>NIC</th>
              <th>Employee ID</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>EPF No</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id} className="table-row">
                {/* Display fields */}
                <td>{editId === employee._id ? <input type="text" value={editedEmployee.FullName || employee.FullName} onChange={(e) => handleInputChange(e, 'FullName')} /> : employee.FullName}</td>
                <td>{editId === employee._id ? <input type="text" value={editedEmployee.NIC || employee.NIC} onChange={(e) => handleInputChange(e, 'NIC')} /> : employee.NIC}</td>
                <td>{editId === employee._id ? <input type="text" value={editedEmployee.EmployeeID || employee.EmployeeID} onChange={(e) => handleInputChange(e, 'EmployeeID')} /> : employee.EmployeeID}</td>
                <td>{editId === employee._id ? <input type="text" value={editedEmployee.PhoneNo || employee.PhoneNo} onChange={(e) => handleInputChange(e, 'PhoneNo')} /> : employee.PhoneNo}</td>
                <td>{editId === employee._id ? <input type="text" value={editedEmployee.Email || employee.Email} onChange={(e) => handleInputChange(e, 'Email')} /> : employee.Email}</td>
                <td>{editId === employee._id ? <input type="text" value={editedEmployee.Address || employee.Address} onChange={(e) => handleInputChange(e, 'Address')} /> : employee.Address}</td>
                <td>{editId === employee._id ? <input type="text" value={editedEmployee.EPFNo || employee.EPFNo} onChange={(e) => handleInputChange(e, 'EPFNo')} /> : employee.EPFNo}</td>
                <td>{editId === employee._id ? <input type="text" value={editedEmployee.Designation || employee.Designation} onChange={(e) => handleInputChange(e, 'Designation')} /> : employee.Designation}</td>
                <td>
                  {editId === employee._id ? (
                    <>
                      <button className="btn btn-success mr-2" onClick={() => handleUpdate(employee._id)}>Save</button>
                      <button className="btn btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary mr-2" onClick={() => setEditId(employee._id)}>Update</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(employee._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-success" style={{ marginTop: '40px' }} onClick={exportToExcel}>Export to Excel</button>
        </div>
      </div>
    </div>
  );
}

export default AllEmployee;
