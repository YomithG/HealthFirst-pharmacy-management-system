import React, { useState } from "react";
import axios from "axios";
import "./SupplierManagement.css";
import "./AddSupplier.css";

export default function AddSupplier() {
  const [Supplier, setSupplier] = useState("");
  const [Email, setEmail] = useState("");
  const [Medicine, setMedicine] = useState([]);
  const [Quantities, setQuantities] = useState({});
  const [Notes, setNote] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function sendData(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!Supplier || !Email || Medicine.length === 0 || !Notes) {
      setError("Please fill in all required fields.");
      return;
    }

    // Check if quantities are entered for all selected medicines
    for (const med of Medicine) {
      if (!Quantities[med]) {
        setError(`Please enter quantity for ${med}.`);
        return;
      }
    }

    const newForm = {
      Supplier,
      Email,
      Medicine,
      Quantities,
      Notes
    };
    console.log(newForm)
    axios
      .post("http://localhost:8070/form/add", newForm)
      .then(() => {
        setSuccessMessage("Form Saved");
        setSupplier("");
        setEmail("");
        setMedicine([]);
        setQuantities({});
        setNote("");
        setError("");
      })
      .catch((err) => {
        setError("Error! " + err);
      });
  }

  const handleMedicineChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setMedicine(selectedOptions);
    setQuantities({}); // Clear previous quantities when medicine selection changes
  };

  const handleQuantityChange = (e, medicine) => {
    const { value } = e.target;
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [medicine]: value
    }));
  };

  return (
    <div className="">
      <h2>Request Form</h2>
      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Supplier :</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            value={Supplier}
            onChange={(e) => setSupplier(e.target.value)}
          >
            <option value="">Select Supplier</option>
            <option>Supplier 1</option>
            <option>Supplier 2</option>
            <option>Supplier 3</option>
            <option>Supplier 4</option>
            <option>Supplier 5</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Email address :</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter email address"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlSelect2">Medicines :</label>
          <select
            multiple
            className="form-control"
            id="exampleFormControlSelect2"
            value={Medicine}
            onChange={handleMedicineChange}
          >
            <option value="Pendol">Penadol</option>
            <option value="Cetrezine">Cetrezine</option>
            <option value="Vitamin C">Vitamin C</option>
            <option value="Amoxicillin">Amoxicillin</option>
            <option value="Piriton">Piriton</option>
          </select>
        </div>

        {/* Order Items Table */}
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
              {Medicine.map((medicine, index) => (
                <tr key={index}>
                  <td>{medicine}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="QTY"
                      value={Quantities[medicine] || ""}
                      onChange={(e) => handleQuantityChange(e, medicine)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Notes :</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={Notes}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
      </form>
    </div>
  );
}