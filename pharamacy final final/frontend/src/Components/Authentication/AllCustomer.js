import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function AllCustomer() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    function getCustomers() {
      axios.get("http://localhost:8070/customer_account/")
        .then((res) => {
          console.log(res.data);
          setCustomers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getCustomers();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpdate = (customerId) => {
    setEditId(customerId); // Enable editing for this customer
  };

  const handleSave = async (customer) => {
    try {
      await axios.put(`http://localhost:8070/customer_account/update/${customer._id}`, customer);
      setEditId(null); // Disable editing after saving
      // Optionally, update the state to reflect any changes
    } catch (err) {
      alert(err.message); // Handle error
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8070/customer_account/delete/${customerId}`);
      setCustomers(customers.filter(customer => customer._id !== customerId));
    } catch (err) {
      alert(err.message); // Handle error
    }
  };

  const exportToExcel = () => {
    const fileName = "customers.xlsx";
    const worksheet = XLSX.utils.json_to_sheet(customers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, fileName);
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer =>
    customer.FullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container" style={{ marginTop: '80px' }}>
      <div className="row">
        <div className="col-md-6">
          <h1 className="mt-5">All Customers</h1>
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
          <p>Total Customers: {filteredCustomers.length}</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped" style={{ marginTop: '5px', marginBottom: '5px', borderRadius: '10px' }}>
          <thead className="thead-dark">
            <tr>
              <th>Full Name</th>
              <th>Gender</th>
              <th>NIC</th>
              <th>Address</th>
              <th>City</th>
              <th>District</th>
              <th>Date of Birth</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer._id} style={{ borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderRadius: '10px' }}>
                <td>{editId === customer._id ? <input type="text" value={customer.FullName} onChange={(e) => setCustomers(customers.map(c => c._id === customer._id ? { ...c, FullName: e.target.value } : c))} /> : customer.FullName}</td>
                <td>{editId === customer._id ? <input type="text" value={customer.Gender} onChange={(e) => setCustomers(customers.map(c => c._id === customer._id ? { ...c, Gender: e.target.value } : c))} /> : customer.Gender}</td>
                <td>{editId === customer._id ? <input type="text" value={customer.NIC} onChange={(e) => setCustomers(customers.map(c => c._id === customer._id ? { ...c, NIC: e.target.value } : c))} /> : customer.NIC}</td>
                <td>{editId === customer._id ? <input type="text" value={customer.Address} onChange={(e) => setCustomers(customers.map(c => c._id === customer._id ? { ...c, Address: e.target.value } : c))} /> : customer.Address}</td>
                <td>{editId === customer._id ? <input type="text" value={customer.City} onChange={(e) => setCustomers(customers.map(c => c._id === customer._id ? { ...c, City: e.target.value } : c))} /> : customer.City}</td>
                <td>{editId === customer._id ? <input type="text" value={customer.District} onChange={(e) => setCustomers(customers.map(c => c._id === customer._id ? { ...c, District: e.target.value } : c))} /> : customer.District}</td>
                <td>{editId === customer._id ? <input type="date" value={customer.DOB} onChange={(e) => setCustomers(customers.map(c => c._id === customer._id ? { ...c, DOB: e.target.value } : c))} /> : customer.DOB}</td>
                <td>{editId === customer._id ? <input type="text" value={customer.PhoneNo} onChange={(e) => setCustomers(customers.map(c => c._id === customer._id ? { ...c, PhoneNo: e.target.value } : c))} /> : customer.PhoneNo}</td>
                <td>{editId === customer._id ? <input type="email" value={customer.Email} onChange={(e) => setCustomers(customers.map(c => c._id === customer._id ? { ...c, Email: e.target.value } : c))} /> : customer.Email}</td>
                <td>{customer.Username}</td>
                <td>{customer.Password ? "********" : "No Password"}</td>
                <td>
                  {editId === customer._id ? (
                    <>
                      <button className="btn btn-success mr-2" onClick={() => handleSave(customer)}>Save</button>
                      <button className="btn btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary mr-2" onClick={() => handleUpdate(customer._id)}>Update</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(customer._id)}>Delete</button>
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

export default AllCustomer;
