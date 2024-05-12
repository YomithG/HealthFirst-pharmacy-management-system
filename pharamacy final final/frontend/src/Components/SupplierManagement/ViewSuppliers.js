import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateForm from "./UpdateForm"; // Import the UpdateForm component
import "./SupplierManagement.css";
import "./ViewSuppliers.css";
import { useNavigate } from "react-router-dom";

export default function ViewSuppliers() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null); // State to hold the selected form for update
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8070/form/")
      .then(response => {
        setForms(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching forms:", error);
      });
  }, []); // empty dependency array to ensure useEffect only runs once when component mounts

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8070/form/delete/${id}`)
      .then(response => {
        console.log("Form deleted successfully:", response.data);
        // After deleting, fetch updated forms
        axios.get("http://localhost:8070/form/")
          .then(response => {
            setForms(response.data);
          })
          .catch(error => {
            console.error("Error fetching forms:", error);
          });
      })
      .catch(error => {
        console.error("Error deleting form:", error);
      });
  };

  const handleUpdate = (form) => {
    setSelectedForm(form); // Set the selected form for update
  };

  return (
    <div className="">
      <h2>Orders</h2>
      <div>
        <button className="btn btn-primary" onClick={()=>navigate('/add-supplier')}>ADD SUPPLIER</button>
      </div>
      {selectedForm ? (
        <UpdateForm selectedForm={selectedForm} />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Email</th>
              <th>Medicine</th>
              <th>Quantity</th>
              <th>Notes</th>
              <th>Actions</th> {/* Added a column for actions */}
            </tr>
          </thead>
          <tbody>
            {forms.map(form => (
              <tr key={form._id}>
                <td>{form.Supplier}</td>
                <td>{form.Email}</td>
                <td>{form.Medicine}</td>
                <td>
                  <ul>
                    {form.Quantity && form.Quantity.map((item)=>(
                      <li>
                        <div>
                          {item.medicine}
                        </div>
                        <div>
                          {item.quantity}
                        </div>
                      </li>
                      
                    ))}
                  </ul>
                </td>
                {/* <td>{form.Quantity}</td> */}
                <td>{form.Notes}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-primary" onClick={() => handleUpdate(form)}>Update</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(form._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
