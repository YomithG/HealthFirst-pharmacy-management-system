import React, { useState } from "react";
import axios from "axios";
import './Employee.css';

export default function AddCustomer() {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("Male");
  const [nic, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [dob, setDOB] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [retypeUsername, setRetypeUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");

  const sendData = (e) => {
    e.preventDefault();
    console.log(gender);

    if (
      !fullName ||
      !gender ||
      !nic ||
      !address ||
      !city ||
      !district ||
      !dob ||
      !phoneNo ||
      !email ||
      !username ||
      !retypeUsername ||
      !password ||
      !retypePassword
    ) {
      setError("All fields are required");
      return;
    }

    if (password !== retypePassword) {
      setError("Passwords do not match");
      return;
    }

    if (username !== retypeUsername) {
      setError("Usernames do not match");
      return;
    }

    const newCustomer = {
      "FullName": fullName,
      "Gender": gender,
      "NIC": nic,
      "Address": address,
      "City": city,
      "District": district,
      "DOB": dob,
      "PhoneNo": phoneNo,
      "Email": email,
      "username": username,
      "password": password,
    };

    console.log(newCustomer)


    axios.post("http://localhost:8070/customer_account/add", newCustomer)
      .then(() => {
        alert("Customer Added Successfully");
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
        setRetypeUsername("");
        setPassword("");
        setRetypePassword("");
      })
      .catch((err) => {
        console.error("Failed to add customer: ", err); // Log error to console
        setError("Failed to add customer: " + err.message);
      });
  };





  return (
    <div className="container-fluid" style={{ minHeight: '100vh' }}>
  <div className="row justify-content-center align-items-center h-100">
    <div className="col-lg-6 col-md-8 col-sm-10">
      <form onSubmit={sendData}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" className="form-control" id="fullName" aria-describedby="fullNameHelp" onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="gender">Gender</label>
            <select className="form-control" id="gender" onChange={(e) => setGender(e.target.value)} required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="nic">NIC</label>
            <input type="text" className="form-control" id="nic" onChange={(e) => setNIC(e.target.value)} required />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" className="form-control" id="dob" onChange={(e) => setDOB(e.target.value)} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="city">City</label>
            <input type="text" className="form-control" id="city" onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="district">District</label>
            <input type="text" className="form-control" id="district" onChange={(e) => setDistrict(e.target.value)} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="phoneNo">Phone Number</label>
            <input type="tel" className="form-control" id="phoneNo" onChange={(e) => setPhoneNo(e.target.value)} required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} required />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="retypeUsername">Retype Username</label>
            <input type="text" className="form-control" id="retypeUsername" onChange={(e) => setRetypeUsername(e.target.value)} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputPassword2">Retype Password</label>
            <input type="password" className="form-control" id="exampleInputPassword2" onChange={(e) => setRetypePassword(e.target.value)} required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>





  );
}


