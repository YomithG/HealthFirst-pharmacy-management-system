import React, { useState } from "react";
import axios from "axios";
import "./Inventory.css";

export default function AddNewMedicine() {
  const [BatchID, setBatchID] = useState("");
  const [BatchName, setBatchName] = useState("");
  const [ItemID, setItemID] = useState("");
  const [ItemName, setItemName] = useState("");
  const [ItemCategory, setItemCategory] = useState("");
  const [ItemSize, setItemSize] = useState("");
  const [SupplierID, setSupplierID] = useState("");
  const [SupplierName, setSupplierName] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8070/medicine/add/newmedicine",
        {
          BatchID,
          BatchName,
          ItemID,
          ItemName,
          ItemCategory,
          ItemSize,
          SupplierID,
          SupplierName
        }
      );

      if (response.status === 200) {
        alert("New Medicine Added Successfully");

        setBatchID("");
        setBatchName("");
        setItemID("");
        setItemName("");
        setItemCategory("");
        setItemSize("");
        setSupplierID("");
        setSupplierName("");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while adding new medicine. Please try again.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!BatchID.trim()) {
      newErrors.BatchID = "Batch ID is required";
      isValid = false;
    }

    if (!BatchName.trim()) {
      newErrors.BatchName = "Batch Name is required";
      isValid = false;
    }

    if (!ItemID.trim()) {
      newErrors.ItemID = "Item ID is required";
      isValid = false;
    }

    if (!ItemName.trim()) {
      newErrors.ItemName = "Item Name is required";
      isValid = false;
    }

    if (!ItemCategory) {
      newErrors.ItemCategory = "Item Category is required";
      isValid = false;
    }

    if (!ItemSize || ItemSize <= 0) {
      newErrors.ItemSize = "Item Size must be a positive number";
      isValid = false;
    }

    if (!SupplierID.trim()) {
      newErrors.SupplierID = "Supplier ID is required";
      isValid = false;
    }

    if (!SupplierName.trim()) {
      newErrors.SupplierName = "Supplier Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="BatchID" className="form-label">
            Batch ID
          </label>
          <input
            type="text"
            className="form-control"
            id="BatchID"
            placeholder="Enter Batch ID"
            value={BatchID}
            onChange={(e) => setBatchID(e.target.value)}
          />
          {errors.BatchID && <div className="error">{errors.BatchID}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="BatchName" className="form-label">
            Batch Name
          </label>
          <input
            type="text"
            className="form-control"
            id="BatchName"
            placeholder="Enter Batch Name"
            value={BatchName}
            onChange={(e) => setBatchName(e.target.value)}
          />
          {errors.BatchName && <div className="error">{errors.BatchName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="ItemID" className="form-label">
            Item ID
          </label>
          <input
            type="text"
            className="form-control"
            id="ItemID"
            placeholder="Enter Item ID"
            value={ItemID}
            onChange={(e) => setItemID(e.target.value)}
          />
          {errors.ItemID && <div className="error">{errors.ItemID}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="ItemName" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ItemName"
            placeholder="Enter Item Name"
            value={ItemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          {errors.ItemName && <div className="error">{errors.ItemName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="ItemCategory" className="form-label">
            Item Category
          </label>
          <select
            className="form-control"
            id="ItemCategory"
            value={ItemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
          >
            <option value="Tablets">Tablets</option>
            <option value="Pills">Pills</option>
            <option value="Syrups">Syrups</option>
            <option value="Creams">Creams</option>
            <option value="Balms">Balms</option>
            <option value="Bandages">Bandages</option>
            <option value="GSL medicines">GSL medicines</option>
            <option value="Pharmacy-only medicines">Pharmacy-only medicines</option>
            <option value="Prescription-only medicines (POM)">Prescription-only medicines (POM)</option>
            <option value="Controlled drugs">Controlled drugs</option>
            <option value="Antihistamine">Antihistamine</option>
            <option value="Antipyretics">Antipyretics</option>
            <option value="Analgesics">Analgesics</option>
            <option value="Antimalarial drugs">Antimalarial drugs</option>
            <option value="Antibiotics">Antibiotics</option>
            <option value="Antiseptics">Antiseptics</option>
            <option value="Antidiabetic">Antidiabetic</option>
            <option value="Antiseptics">Antiseptics</option>
            <option value="Antipsychotic">Antipsychotic</option>
            <option value="Hormone replacements">Hormone replacements</option>
            <option value="Oral contraceptives">Oral contraceptives</option>
            <option value="Stimulants">Stimulants</option>
            <option value="Tranquilizers">Tranquilizers</option>
            <option value="Laxatives">Laxatives</option>
            <option value="Antacids">Antacids</option>
            <option value="Proton pump inhibitors(Gastrointestial)">Proton pump inhibitors(Gastrointestial)</option>
            <option value="Antihypertensive drugs">Antihypertensive drugs</option>
            <option value="Coagulation-related drugs">Coagulation-related drugs</option>
            <option value="HMG-CoA reductase inhibitors (statins)">HMG-CoA reductase inhibitors (statins)</option>
            <option value="Essential medicines">Essential medicines</option>

          </select>
          {errors.ItemCategory && <div className="error">{errors.ItemCategory}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="ItemSize" className="form-label">
            Item Size
          </label>
          <input
            type="text"
            className="form-control"
            id="ItemSize"
            placeholder="Enter Item Size"
            value={ItemSize}
            onChange={(e) => setItemSize(e.target.value)}
            min="0"
          />
          {errors.ItemSize && <div className="error">{errors.ItemSize}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="SupplierID" className="form-label">
            Supplier ID
          </label>
          <input
            type="text"
            className="form-control"
            id="SupplierID"
            placeholder="Enter Supplier ID"
            value={SupplierID}
            onChange={(e) => setSupplierID(e.target.value)}
          />
          {errors.SupplierID && <div className="error">{errors.SupplierID}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="SupplierName" className="form-label">
            Supplier Name
          </label>
          <input
            type="text"
            className="form-control"
            id="SupplierName"
            placeholder="Enter Supplier Name"
            value={SupplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
          {errors.SupplierName && <div className="error">{errors.SupplierName}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
