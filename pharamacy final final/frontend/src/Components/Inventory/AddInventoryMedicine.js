import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";

export default function AddInventoryMedicine() {
  const [BatchID, setBatchID] = useState("");
  const [BatchName, setBatchName] = useState("");
  const [ItemID, setItemID] = useState("");
  const [ItemName, setItemName] = useState("");
  const [ItemCategory, setItemCategory] = useState("");
  const [ItemSize, setItemSize] = useState("");
  const [ItemBuyPrice, setItemBuyPrice] = useState("");
  const [ItemSellPrice, setItemSellPrice] = useState("");
  const [SupplierID, setSupplierID] = useState("");
  const [SupplierName, setSupplierName] = useState("");
  const [ManufactureDate, setManufactureDate] = useState("");
  const [ExpireDate, setExpireDate] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});

  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8070/inventory/add/inventorymedicine",
        {
          BatchID,
          BatchName,
          ItemID,
          ItemName,
          ItemCategory,
          ItemSize,
          ItemBuyPrice,
          ItemSellPrice,
          SupplierID,
          SupplierName,
          ManufactureDate,
          ExpireDate,
          Quantity,
          Product: product,
        }
      );
      if (response.status === 200) {
        alert("Successfully Added");
        clearForm();
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while adding inventory. Please try again.");
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

    if (!ItemBuyPrice || ItemBuyPrice <= 0) {
      newErrors.ItemBuyPrice = "Item Buy Price must be a positive number";
      isValid = false;
    }

    if (!ItemSellPrice || ItemSellPrice <= 0) {
      newErrors.ItemSellPrice = "Item Sell Price must be a positive number";
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

    if (!ManufactureDate.trim()) {
      newErrors.ManufactureDate = "Manufacture Date is required";
      isValid = false;
    }

    if (!ExpireDate.trim()) {
      newErrors.ExpireDate = "Expire Date is required";
      isValid = false;
    }

    if (!Quantity || Quantity <= 0) {
      newErrors.Quantity = "Quantity must be a positive number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const clearForm = () => {
    setBatchID("");
    setBatchName("");
    setItemID("");
    setItemName("");
    setItemCategory("");
    setItemSize("");
    setItemBuyPrice("");
    setItemSellPrice("");
    setSupplierID("");
    setSupplierName("");
    setManufactureDate("");
    setExpireDate("");
    setQuantity("");
    setErrors({});
  };

  // get all products from http://localhost:8070/api/product
  useEffect(() => {
    axios
      .get("http://localhost:8070/api/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        {/* product selection dropdown */}
        <div className="mb-3">
          <label htmlFor="product" className="form-label">
            Select Product
          </label>
          {/* dropdown - value is set to product id */}
          <select
            type="text"
            className="form-control"
            id="product"
            placeholder="Select Product"
            value={ItemID}
            onChange={(e) => setProduct(e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.title}
              </option>
            ))}
          </select>
        </div>

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
            type="text"
            className="form-control"
            id="ItemCategory"
            placeholder="Enter Item Category"
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
            <option value="Pharmacy-only medicines">
              Pharmacy-only medicines
            </option>
            <option value="Prescription-only medicines (POM)">
              Prescription-only medicines (POM)
            </option>
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
            <option value="Proton pump inhibitors(Gastrointestial)">
              Proton pump inhibitors(Gastrointestial)
            </option>
            <option value="Antihypertensive drugs">
              Antihypertensive drugs
            </option>
            <option value="Coagulation-related drugs">
              Coagulation-related drugs
            </option>
            <option value="HMG-CoA reductase inhibitors (statins)">
              HMG-CoA reductase inhibitors (statins)
            </option>
            <option value="Essential medicines">Essential medicines</option>
          </select>
          {errors.ItemCategory && (
            <div className="error">{errors.ItemCategory}</div>
          )}
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
          <label htmlFor="ItemBuyPrice" className="form-label">
            Item Buy Price
          </label>
          <input
            type="number"
            className="form-control"
            id="ItemBuyPrice"
            placeholder="Enter Item Buy Price"
            value={ItemBuyPrice}
            onChange={(e) => setItemBuyPrice(e.target.value)}
            min="0"
          />
          {errors.ItemBuyPrice && (
            <div className="error">{errors.ItemBuyPrice}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="ItemSellPrice" className="form-label">
            Item Sell Price
          </label>
          <input
            type="number"
            className="form-control"
            id="ItemSellPrice"
            placeholder="Enter Item Sell Price"
            value={ItemSellPrice}
            onChange={(e) => setItemSellPrice(e.target.value)}
            min="0"
          />
          {errors.ItemSellPrice && (
            <div className="error">{errors.ItemSellPrice}</div>
          )}
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
          {errors.SupplierID && (
            <div className="error">{errors.SupplierID}</div>
          )}
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
          {errors.SupplierName && (
            <div className="error">{errors.SupplierName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="ManufactureDate" className="form-label">
            Manufacture Date
          </label>
          <input
            type="date"
            className="form-control"
            id="ManufactureDate"
            placeholder="Enter Manufacture Date"
            value={ManufactureDate}
            onChange={(e) => setManufactureDate(e.target.value)}
          />
          {errors.ManufactureDate && (
            <div className="error">{errors.ManufactureDate}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="ExpireDate" className="form-label">
            Expire Date
          </label>
          <input
            type="date"
            className="form-control"
            id="ExpireDate"
            placeholder="Enter Expire Date"
            value={ExpireDate}
            onChange={(e) => setExpireDate(e.target.value)}
          />
          {errors.ExpireDate && (
            <div className="error">{errors.ExpireDate}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="Quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="Quantity"
            placeholder="Enter Quantity"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="0"
          />
          {errors.Quantity && <div className="error">{errors.Quantity}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
