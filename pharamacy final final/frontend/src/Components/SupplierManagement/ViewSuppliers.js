import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import "./SupplierManagement.css";
import "./ViewSuppliers.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function ViewSuppliers() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8070/form/")
      .then((response) => {
        setForms(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching forms:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/form/delete/${id}`)
      .then((response) => {
        console.log("Form deleted successfully:", response.data);
        // After deleting, fetch updated forms
        axios
          .get("http://localhost:8070/form/")
          .then((response) => {
            setForms(response.data);
          })
          .catch((error) => {
            console.error("Error fetching forms:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting form:", error);
      });
  };

  const handleUpdate = (form) => {
    setSelectedForm(form);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const generatePDF = (form) => {
    const doc = new jsPDF();
    // Customize the PDF content based on the form data
    doc.text(20, 20, `Supplier: ${form.Supplier}`);
    doc.text(20, 30, `Email: ${form.Email}`);
    doc.text(20, 40, `Medicine: ${form.Medicine}`);  
    doc.text(20, 50, `Medicine Quantities: ${form.Quantity}`);
    doc.text(20, 60, `Notes: ${form.Notes}`);
    doc.save(`${form.Supplier}_report.pdf`);
  };

  // Filter forms based on search query
  const filteredForms = forms.filter((form) =>
    form.Supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="">
      <h2>Orders</h2>
      <div>
        <input
          type="text"
          placeholder="Search Supplier"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className="btn btn-primary" onClick={() => navigate("/add-supplier")}>
          ADD SUPPLIER
        </button>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredForms.map((form) => (
              <tr key={form._id}>
                <td>{form.Supplier}</td>
                <td>{form.Email}</td>
                <td>{form.Medicine}</td>
                <td>
                  <ul>
                    {form.Quantity &&
                      form.Quantity.map((item) => (
                        <li>
                          <div>{item.medicine}</div>
                          <div>{item.quantity}</div>
                        </li>
                      ))}
                  </ul>
                </td>
                <td>{form.Notes}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-primary" onClick={() => handleUpdate(form)}>
                      Update
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(form._id)}>
                      Delete
                    </button>
                    <button className="btn btn-success" onClick={() => generatePDF(form)}>
                      Generate PDF
                    </button>
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
