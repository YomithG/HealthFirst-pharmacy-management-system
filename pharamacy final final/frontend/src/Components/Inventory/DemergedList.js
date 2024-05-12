import React, { useState, useEffect } from "react";
import axios from "axios";

const DemergedList = () => {
  const [demergedItems, setDemergedItems] = useState([]);

  useEffect(() => {
    fetchDemergedItems();
  }, []);

  const fetchDemergedItems = async () => {
    try {
      const response = await axios.get("http://localhost:8070/inventory/demergedList");
      setDemergedItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Demerged Items List</h2>
      <ul>
        {demergedItems.map((item) => (
          <li key={item._id}>{item.ItemName}</li>
        ))}
      </ul>
    </div>
  );
};

export default DemergedList;
