import React, { useState } from "react";
import axios from "axios";
import "./Inventory.css"; 

export default function UpdateInventoryForm({ selectedItem, onClose, onUpdate }) {
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
      await axios.put(`http://localhost:8070/inventory/update/${selectedItem._id}`, formData);
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
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Update Inventory</h2>
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
            <label htmlFor="ItemBuyPrice">Item Buy Price</label>
            <input type="number" name="ItemBuyPrice" value={formData.ItemBuyPrice} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="ItemSellPrice">Item Sell Price</label>
            <input type="number" name="ItemSellPrice" value={formData.ItemSellPrice} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="SupplierID">Supplier ID</label>
            <input type="text" name="SupplierID" value={formData.SupplierID} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="SupplierName">Supplier Name</label>
            <input type="text" name="SupplierName" value={formData.SupplierName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="ManufactureDate">Manufacture Date</label>
            <input type="date" name="ManufactureDate" value={formData.ManufactureDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="ExpireDate">Expire Date</label>
            <input type="date" name="ExpireDate" value={formData.ExpireDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="Quantity">Quantity</label>
            <input type="number" name="Quantity" value={formData.Quantity} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}