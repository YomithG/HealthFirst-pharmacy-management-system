import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SupplierManagement.css";
import "./UpdateForm.css";

export default function UpdateForm({ selectedForm }) {
  const [form, setForm] = useState({});
  const [updatedForm, setUpdatedForm] = useState({
    Supplier: "",
    Email: "",
    Medicine: [],
    Quantities: {}, // Change Quantities to an object
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
          Quantities: response.data.form.Quantity.reduce((acc, curr) => {
            acc[curr.medicine] = curr.quantity;
            return acc;
          }, {})
        });
      })
      .catch(error => {
        console.error("Error fetching form data:", error);
      });
  }, [selectedForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedForm({ ...updatedForm, [name]: value });
  };

  const handleMedicineChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setUpdatedForm({ ...updatedForm, Medicine: selectedOptions, Quantities: {} });
  };

  const handleQuantityChange = (e, medicine) => {
    const { value } = e.target;
    setUpdatedForm(prevState => ({
      ...prevState,
      Quantities: {
        ...prevState.Quantities,
        [medicine]: parseInt(value) // Ensure the quantity is parsed as an integer
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updatedForm.Supplier || !updatedForm.Email || updatedForm.Medicine.length === 0 || !updatedForm.Notes) {
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
            <option>Supplier 1</option>
            <option>Supplier 2</option>
            <option>Supplier 3</option>
            <option>Supplier 4</option>
            <option>Supplier 5</option>
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
              {updatedForm.Quantity.map((medicine, index) => (
                <tr key={index}>
                  <td>{medicine.medicine}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="QTY"
                      value={medicine.quantity}
                      onChange={(e) => handleQuantityChange(e, medicine)}
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
