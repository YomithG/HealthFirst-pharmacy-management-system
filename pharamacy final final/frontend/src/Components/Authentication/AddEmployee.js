import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const [fullName, setFullName] = useState("");
  const [nic, setNIC] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [epfNo, setEpfNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const sendData = (e) => {
    e.preventDefault();

    // NIC validation
    const nicRegex = /^(?:\d{9}[xXvV]|[0-9]{12})$/;
    if (!nicRegex.test(nic.toUpperCase())) {
      setError("Please enter a valid NIC (9 digits followed by 'x' or 'v', or 12 digits)");
      return;
    }

    // Phone number validation
    const phoneRegex = /^07\d{8}$/; // Regex for phone number starting with "07" and 10 digits
    if (!phoneRegex.test(phoneNo)) {
      setError("Please enter a valid phone number starting with '07' and containing 10 digits");
      return;
    }

    // Other field validations
    if (!fullName || !employeeID || !email || !address || !epfNo || !designation) {
      setError("All fields are required");
      return;
    }

    const newEmployee = {
      "FullName": fullName,
      "NIC": nic,
      "EmployeeID": employeeID,
      "PhoneNo": phoneNo,
      "Email": email,
      "Address": address,
      "EPFNo": epfNo,
      "Designation": designation
    };

    axios.post("http://localhost:8070/employee_accounts/add_employee", newEmployee)
      .then(() => {
        alert("Employee Added Successfully");
        setError("");
        setFullName("");
        setNIC("");
        setEmployeeID("");
        setPhoneNo("");
        setEmail("");
        setAddress("");
        setEpfNo("");
        setDesignation("");

        navigate('/admin-dashboard')
      })
      .catch((err) => {
        console.error("Failed to add employee: ", err);
        setError("Failed to add employee: " + err.message);
      });
  };

  return (
    <div className="container-fluid" style={{ minHeight: '100vh', marginTop: '100px' }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <form onSubmit={sendData}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" className="form-control" id="fullName" onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="nic">NIC</label>
              <input type="text" className="form-control" id="nic" onChange={(e) => setNIC(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="employeeID">Employee ID</label>
              <input type="text" className="form-control" id="employeeID" onChange={(e) => setEmployeeID(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNo">Phone Number</label>
              <input type="tel" className="form-control" id="phoneNo" onChange={(e) => setPhoneNo(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="epfNo">EPF Number</label>
              <input type="text" className="form-control" id="epfNo" onChange={(e) => setEpfNo(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="designation">Designation</label>
              <input type="text" className="form-control" id="designation" onChange={(e) => setDesignation(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}


