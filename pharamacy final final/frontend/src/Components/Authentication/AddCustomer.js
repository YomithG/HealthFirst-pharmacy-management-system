import React, { useState } from "react";
import axios from "axios";

const AddCustomer = () => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [dob, setDOB] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const sendData = (e) => {
    e.preventDefault();

    // Phone number validation
    const phoneRegex = /^07\d{8}$/; // Regex for phone number starting with "07" and 10 digits
    if (!phoneRegex.test(phoneNo)) {
      setError("Please enter a valid phone number starting with '07' and containing 10 digits");
      return;
    }

    // NIC validation
    const nicRegex = /^(?:\d{9}[xXvV]|[0-9]{12})$/;
    if (!nicRegex.test(nic.toUpperCase())) {
      setError("Please enter a valid NIC (9 digits followed by 'x' or 'v', or 12 digits)");
      return;
    }

    // Other field validations
    if (!fullName || !gender || !address || !city || !district || !dob || !email || !username || !password) {
      setError("All fields are required");
      return;
    }

    const customerData = {
      FullName: fullName,
      Gender: gender,
      NIC: nic,
      Address: address,
      City: city,
      District: district,
      DOB: dob,
      PhoneNo: phoneNo,
      Email: email,
      Username: username,
      Password: password,
    };

    console.log("Sending customer data:", customerData);

    axios.post("http://localhost:8070/customer_account/add", customerData)
      .then(() => {
        setError("");
        setFullName("");
        setGender("");
        setNIC("");
        setAddress("");
        setCity("");
        setDistrict("");
        setDOB("");
        setPhoneNo("");
        setEmail("");
        setUsername("");
        setPassword("");
        alert("Customer Added Successfully");
      })
      .catch(err => {
        console.error("Failed to add customer: ", err);
        setError("Failed to add customer: " + err.message);
      });
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh", marginTop: "100px" }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <form onSubmit={sendData}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" className="form-control" id="fullName" onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="gender">Gender</label>
                <select className="form-control" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="nic">NIC</label>
                <input type="text" className="form-control" id="nic" value={nic} onChange={(e) => setNIC(e.target.value)} required />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" className="form-control" id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="district">District</label>
                <input type="text" className="form-control" id="district" value={district} onChange={(e) => setDistrict(e.target.value)} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="phoneNo">Phone Number</label>
                <input type="tel" className="form-control" id="phoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
