import React, { useEffect, useState } from "react";
import axios from "axios";

const SoldOutList = () => {
  const [soldOutItems, setSoldOutItems] = useState([]);

  useEffect(() => {
    fetchSoldOutItems();
  }, []);

  const fetchSoldOutItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8070/inventory/soldOutList"
      );
      setSoldOutItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 style={{ margin: "20px 0 0 0" }}>Sold Out List</h2>
      <div style={{ padding: "20px" }}>
        <table id="inventory-table" className="custom-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Count in Stock</th>
            </tr>
          </thead>
          <tbody>
            {soldOutItems &&
              soldOutItems.map(
                (item) =>
                  // check if the Product is available
                  item?.Product && (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={item?.Product?.image}
                          alt={item?.Product?.title}
                          width="100"
                        />
                      </td>
                      <td>{item?.Product?.title}</td>
                      <td>{item?.Product?.description}</td>
                      <td>{item?.Product?.category}</td>
                      <td>{item?.Product?.price}</td>
                      <td>{item?.Product?.countInStock}</td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoldOutList;
