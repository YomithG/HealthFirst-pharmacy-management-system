import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateInventoryForm from "./UpdateInventoryForm";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Inventory.css";

export default function AllInventoryMedicines() {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [editableRowIndex, setEditableRowIndex] = useState(-1); // Index of the editable row
  const navigate = useNavigate();
  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    calculateTotalValue();
  }, [inventory]);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:8070/inventory/");
      setInventory(
        response.data.filter((item) =>
          item.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalValue = () => {
    let totalValue = 0;
    inventory.forEach((item) => {
      totalValue += item.Quantity * item.ItemSellPrice;
    });
    setTotalValue(totalValue);
  };

  const handleUpdateClick = (index) => {
    setEditableRowIndex(index);
  };
  

  const handleSaveRow = async (updatedData, index) => {
    try {
      const id = updatedData._id;
      await axios.put(`http://localhost:8070/inventory/update/${id}`, updatedData);
      alert("Record updated successfully");
      fetchInventory();
      setEditableRowIndex(-1); // Reset editable row index
    } catch (error) {
      console.error(error);
      alert("Error updating record");
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/inventory/delete/${id}`);
      alert("Record deleted successfully");
      fetchInventory();
    } catch (error) {
      console.error(error);
      alert("Error deleting record");
    }
  };

  const handleSearch = () => {
    fetchInventory();
  };

  const handleGenerateReport = () => {
    const input = document.getElementById("inventory-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("inventory_report.pdf");
    });
  };

  return (
    <div className="">
      <h1 className="title">All Inventory Medicines</h1>
      <div>
        <button className="btn btn-primary" onClick={()=>navigate('/add-inventory-medicine')}>ADD INVENTORY</button>
      </div>
      <div className="search-bar">
  <input
    type="text"
    className="search-input"
    placeholder="Search by item name"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button className="btn search-btn" onClick={handleSearch}>
    Search
  </button>
  <button className="btn report-btn" onClick={handleGenerateReport}>
    Generate Report
  </button>
  

<Link to="/DemergedList" className="btn report-btn">
Damaged List
</Link>

<Link to="/SoldOutList" className="btn report-btn">
Sold-Out List
</Link>
  <Link to="/ExpiredList" className="btn report-btn">
  
  Expired List
</Link>
</div>
      <table id="inventory-table" className="custom-table">
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Batch Name</th>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Size</th>
            <th>Item Buy Price</th>
            <th>Item Sell Price</th>
            <th>Supplier ID</th>
            <th>Supplier Name</th>
            <th>Manufacture Date</th>
            <th>Expire Date</th>
            <th>Quantity</th>
            <th>Total Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={item._id} className={editableRowIndex === index ? "editable-row" : ""}>
              <td>{editableRowIndex === index ? <input type="text" value={item.BatchID} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, BatchID: e.target.value } : prevItem))} /> : item.BatchID}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.BatchName} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, BatchName: e.target.value } : prevItem))} /> : item.BatchName}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.ItemID} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, ItemID: e.target.value } : prevItem))} /> : item.ItemID}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.ItemName} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, ItemName: e.target.value } : prevItem))} /> : item.ItemName}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.ItemCategory} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, ItemCategory: e.target.value } : prevItem))} /> : item.ItemCategory}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.ItemSize} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, ItemSize: e.target.value } : prevItem))} /> : item.ItemSize}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.ItemBuyPrice} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, ItemBuyPrice: e.target.value } : prevItem))} /> : item.ItemBuyPrice}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.ItemSellPrice} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, ItemSellPrice: e.target.value } : prevItem))} /> : item.ItemSellPrice}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.SupplierID} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, SupplierID: e.target.value } : prevItem))} /> : item.SupplierID}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.SupplierName} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, SupplierName: e.target.value } : prevItem))} /> : item.SupplierName}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.ManufactureDate} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, ManufactureDate: e.target.value } : prevItem))} /> : item.ManufactureDate}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.ExpireDate} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, ExpireDate: e.target.value } : prevItem))} /> : item.ExpireDate}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.Quantity} onChange={(e) => setInventory(prevInventory => prevInventory.map((prevItem, i) => i === index ? { ...prevItem, Quantity: e.target.value } : prevItem))} /> : item.Quantity}</td>
              <td>{(item.Quantity * item.ItemSellPrice).toFixed(2)}</td>
              <td>
                {editableRowIndex === index ? (
                  <>
                    <button className="btn save-btn" onClick={() => handleSaveRow(item, index)}>Save</button>
                    <button className="btn cancel-btn" onClick={() => setEditableRowIndex(-1)}>Cancel</button>
                  </>
                ) : (
                  <button className="btn update-btn" onClick={() => handleUpdateClick(index)}>Update</button>
                )}
                <button className="btn delete-btn" onClick={() => handleDeleteClick(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>Total value of medicines in inventory: {totalValue.toFixed(2)}</p>
      </div>
      {showUpdateForm && (
        <UpdateInventoryForm
          selectedItem={selectedItem}
          onClose={() => {
            setSelectedItem(null);
            setShowUpdateForm(false);
          }}
          onUpdate={handleSaveRow}
        />
      )}
    </div>
  );
}
