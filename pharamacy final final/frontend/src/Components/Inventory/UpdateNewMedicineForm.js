import React, { useState } from "react";
import axios from "axios";
import "./Inventory.css"; 

export default function UpdateNewMedicineForm({ selectedItem, onClose, onUpdate }) {
  const [formData, setFormData] = useState(selectedItem ? { ...selectedItem } : null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/medicine/update/${selectedItem._id}`, formData);
      alert("Record updated successfully");
      onUpdate(formData);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error updating record");
    }
  };
  if (!formData) {
    return <div>No item selected for update.</div>;
  }

  return (
    <div className="">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
          </span>
        <h2>Update newMedicine</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="BatchID">Batch ID</label>
            <input type="text" name="BatchID" value={formData.BatchID} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="BatchName">Batch Name</label>
            <input type="text" name="BatchName" value={formData.BatchName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="ItemID">Item ID</label>
            <input type="text" name="ItemID" value={formData.ItemID} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="ItemName">Item Name</label>
            <input type="text" name="ItemName" value={formData.ItemName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="ItemCategory">Item Category</label>
            <input type="text" name="ItemCategory" value={formData.ItemCategory} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="ItemSize">Item Size</label>
            <input type="text" name="ItemSize" value={formData.ItemSize} onChange={handleChange} />
          </div>
    
          <div className="form-group">
            <label htmlFor="SupplierID">Supplier ID</label>
            <input type="text" name="SupplierID" value={formData.SupplierID} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="SupplierName">Supplier Name</label>
            <input type="text" name="SupplierName" value={formData.SupplierName} onChange={handleChange} />
          </div>
          
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
}
