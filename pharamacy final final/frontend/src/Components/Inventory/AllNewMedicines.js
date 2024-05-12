import React, { useState, useEffect } from 'react';
import axios from "axios";
import UpdateNewMedicineForm from "./UpdateNewMedicineForm";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Inventory.css"; 
import '../../App.css'; // Import your custom CSS file for styling
import { useNavigate } from 'react-router-dom';

export default function AllNewMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editableRowIndex, setEditableRowIndex] = useState(-1); // Index of the editable row
  const navigate = useNavigate();
  useEffect(() => {
    fetchMedicine();
  }, []);

  const fetchMedicine = async () => {
    try {
      const response = await axios.get("http://localhost:8070/medicine/");
      setMedicines(
        response.data.filter((item) =>
          item.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClick = (index) => {
    setEditableRowIndex(index);
  };

  const handleSaveRow = async (updatedData, index) => {
    try {
      const id = updatedData._id;
      await axios.put(`http://localhost:8070/medicine/update/${id}`, updatedData);
      alert("Record updated successfully");
      fetchMedicine();
      setEditableRowIndex(-1); // Reset editable row index
    } catch (error) {
      console.error(error);
      alert("Error updating record");
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/medicine/delete/${id}`);
      alert("Record deleted successfully");
      fetchMedicine();
    } catch (error) {
      console.error(error);
      alert("Error deleting record");
    }
  };

  const handleSearch = () => {
    fetchMedicine();
  };

  const handleGenerateReport = () => {
    const input = document.getElementById("medicine-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("medicine_report.pdf");
    });
  };

  return (
    <div className="">
      <h1 className="title">All New Medicines</h1>
      <div>
        <button className='btn btn-primary' onClick={()=>navigate('/add-medicine')}>Add Medicine</button>
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
      </div>
      <table id="medicine-table" className="custom-table">
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Batch Name</th>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Item Size</th>
            <th>Supplier ID</th>
            <th>Supplier Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((item, index) => (
            <tr key={item._id} className={editableRowIndex === index ? "editable-row" : ""}>
              <td>{editableRowIndex === index ? <input type="text" value={item.BatchID} onChange={(e) => setMedicines(prevMedicine => prevMedicine.map((prevItem, i) => i === index ? { ...prevItem, BatchID: e.target.value } : prevItem))} /> : item.BatchID}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.BatchName} onChange={(e) => setMedicines(prevMedicine => prevMedicine.map((prevItem, i) => i === index ? { ...prevItem, BatchName: e.target.value } : prevItem))} /> : item.BatchName}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.ItemID} onChange={(e) => setMedicines(prevMedicine => prevMedicine.map((prevItem, i) => i === index ? { ...prevItem, ItemID: e.target.value } : prevItem))} /> : item.ItemID}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.ItemName} onChange={(e) => setMedicines(prevMedicine => prevMedicine.map((prevItem, i) => i === index ? { ...prevItem, ItemName: e.target.value } : prevItem))} /> : item.ItemName}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.ItemCategory} onChange={(e) => setMedicines(prevMedicine => prevMedicine.map((prevItem, i) => i === index ? { ...prevItem, ItemCategory: e.target.value } : prevItem))} /> : item.ItemCategory}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.ItemSize} onChange={(e) => setMedicines(prevMedicine => prevMedicine.map((prevItem, i) => i === index ? { ...prevItem, ItemSize: e.target.value } : prevItem))} /> : item.ItemSize}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.SupplierID} onChange={(e) => setMedicines(prevMedicine => prevMedicine.map((prevItem, i) => i === index ? { ...prevItem, SupplierID: e.target.value } : prevItem))} /> : item.SupplierID}</td>
              <td>{editableRowIndex === index ? <input type="text" value={item.SupplierName} onChange={(e) => setMedicines(prevMedicine => prevMedicine.map((prevItem, i) => i === index ? { ...prevItem, SupplierName: e.target.value } : prevItem))} /> : item.SupplierName}</td>
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
      {showUpdateForm && (
        <UpdateNewMedicineForm
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