import React, { useState, useEffect } from "react";
import axios from "axios";

const ExpiredList = () => {
  const [expiredItems, setExpiredItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [report, setReport] = useState(null); // Initialize report state

  useEffect(() => {
    fetchExpiredItems();
  }, []);

  const fetchExpiredItems = async () => {
    try {
      const response = await axios.get("http://localhost:8070/inventory/expiredList");
      setExpiredItems(response.data);
    } catch (error) {
      console.error("Error fetching expired items:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/inventory/expiredList/${id}`);
      alert("Record deleted successfully");
      await fetchExpiredItems(); // Wait for the fetch operation to complete
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Error deleting record. Please check the console for more details.");
    }
  };

  const handleGenerateReport = async () => {
    // Implement your report generation logic here
    // For example, you could generate a CSV file
    const reportData = expiredItems.map((item) => ({
      BatchID: item.BatchID,
      BatchName: item.BatchName,
      ItemID: item.ItemID,
      ItemName: item.ItemName,
      ItemCategory: item.ItemCategory,
      ItemSize: item.ItemSize,
      ItemBuyPrice: item.ItemBuyPrice,
      SupplierID: item.SupplierID,
      SupplierName: item.SupplierName,
      ExpireDate: item.ExpireDate,
      Quantity: item.Quantity,
    }));

    const csvContent = "data:text/csv;charset=utf-8," + reportData.map((item) => {
      return `${item.BatchID},${item.BatchName},${item.ItemID},${item.ItemName},${item.ItemCategory},${item.ItemSize},${item.ItemBuyPrice},${item.SupplierID},${item.SupplierName},${item.ExpireDate},${item.Quantity}`;
    }).join("\n");

    const link = document.createElement("a");
    link.href = csvContent;
    link.download = "ExpiredItemsReport.csv";
    link.click();

    setReport(null); // Reset report state
  };

  return (
    <div>
      <h2 style={{ margin: "20px 0 0 0" }}>Expired Items List</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <div style={{ padding: "20px" }}>
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
              <th>Supplier ID</th>
              <th>Supplier Name</th>
              <th>Expire Date</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expiredItems &&
              expiredItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.BatchID}</td>
                  <td>{item.BatchName}</td>
                  <td>{item.ItemID}</td>
                  <td>{item.ItemName}</td>
                  <td>{item.ItemCategory}</td>
                  <td>{item.ItemSize}</td>
                  <td>{item.ItemBuyPrice}</td>
                  <td>{item.SupplierID}</td>
                  <td>{item.SupplierName}</td>
                  <td>{item.ExpireDate}</td>
                  <td>{item.Quantity}</td>
                  <td>
                    <button className="btn delete-btn" onClick={() => handleDeleteItem(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button className="btn generate-report-btn" onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default ExpiredList;