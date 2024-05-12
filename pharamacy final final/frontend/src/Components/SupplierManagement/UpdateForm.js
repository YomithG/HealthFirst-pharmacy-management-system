import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SupplierManagement.css";
import "./UpdateForm.css";

export default function UpdateForm({ selectedForm }) {
  const [form, setForm] = useState({});
  const [suppliers, setSuppliers] = useState([]); // State to hold suppliers fetched from inventory

  const [updatedForm, setUpdatedForm] = useState({
    Supplier: "",
    Email: "",
    Medicine: [],
    Quantity: [], // Change Quantity to an array
    Notes: ""
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8070/form/get/${selectedForm._id}`)
      .then(response => {
        setForm(response.data.form);
        setUpdatedForm({
          ...response.data.form,
          Medicine: Array.isArray(response.data.form.Medicine) ? response.data.form.Medicine : [response.data.form.Medicine],
          Quantity: Array.isArray(response.data.form.Quantity) ? response.data.form.Quantity : [response.data.form.Quantity]
        });
      })
      .catch(error => {
        console.error("Error fetching form data:", error);
      });
  }, [selectedForm]);

  useEffect(() => {
    fetchSuppliers(); // Fetch suppliers when the component mounts
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:8070/inventory/suppliers");
      setSuppliers(response.data); // Assuming response.data is an array of suppliers
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedForm({ ...updatedForm, [name]: value });
  };

  const handleMedicineChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setUpdatedForm({ ...updatedForm, Medicine: selectedOptions });
  };
  
  const handleQuantityChange = (index, value) => {
    // Create a copy of the updatedForm state
    const updatedFormData = { ...updatedForm };
    // Update the quantity value at the specified index in the Quantity array
    updatedFormData.Quantity[index] = value;
    // Update the state with the modified form data
    setUpdatedForm(updatedFormData);
      
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updatedForm.Supplier || !updatedForm.Email || updatedForm.Medicine.length === 0 || updatedForm.Quantity.length === 0 || !updatedForm.Notes) {
      setError("Please fill in all required fields.");
      return;
    }

    axios.put(`http://localhost:8070/form/update/${selectedForm._id}`, updatedForm)
      .then(response => {
        console.log("Form updated successfully:", response.data);
        setSuccessMessage("Form updated successfully.");
        setError("");
      })
      .catch(error => {
        console.error("Error updating form:", error);
        setError("Error updating form. Please try again.");
        setSuccessMessage("");
      });
  };

  return (
    <div className="">
      <h2>Update Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Supplier">Supplier</label>
          <select className="form-control" id="supplier" name="Supplier" value={updatedForm.Supplier} onChange={handleChange}>
            <option value="">Select Supplier</option>
            {suppliers.map((supplier, index) => (
              <option key={index}>{supplier}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input type="text" className="form-control" id="Email" name="Email" value={updatedForm.Email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="Medicine">Medicine</label>
          <select multiple className="form-control" id="Medicine" name="Medicine" value={updatedForm.Medicine} onChange={handleMedicineChange} >
            <option>Penadol</option>
            <option>Cetrezine</option>
            <option>Vitamin C</option>
            <option>Amoxicillin</option>
            <option>Piriton</option>
          </select>
        </div>

        {/* Table for Medicines and Quantity */}
        <div className="form-group">
          <label htmlFor="orderItemsTable">Order Items:</label>
          <table id="orderItemsTable">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {updatedForm.Medicine.map((medicine, index) => (
                <tr key={index}>
                  <td>{medicine}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="QTY"
                      value={updatedForm.Quantity[index] || ""}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-group">
          <label htmlFor="Notes">Notes</label>
          <textarea className="form-control" id="Notes" name="Notes" rows="4" value={updatedForm.Notes} onChange={handleChange} />
        </div>
        
        <button type="submit" className="btn btn-primary">Update</button>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
      </form>
    </div>
  );
}
