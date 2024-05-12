import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import { toast } from 'react-toastify'; // Import toast from react-toastify
//import 'react-toastify/dist/ReactToastify.css'; // Import the default styles

const AdminPanelEdit = () => {
  const [items, setItems] = useState([]);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8070/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const json = await response.json();
        setItems(json);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const editItem = (itemId) => {
    const itemToEdit = items.find(item => item._id === itemId);
    setEditedItem({ ...itemToEdit });
    setIsEditing(true);
  };
  
  const saveChanges = async () => {
    try {
      console.log("Attempting to save changes...");
      const response = await fetch(`http://localhost:8070/api/product/${editedItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedItem),
      });
      if (!response.ok) {
        throw new Error("Failed to save changes");
      }
      console.log("Changes saved successfully!");
      setItems(items.map(item => item._id === editedItem._id ? editedItem : item));
      setIsEditing(false);
      setEditedItem(null);
      // Show success message
      toast.success('Changes saved successfully');
    } catch (error) {
      console.error("Error saving changes:", error);
      // Show error message
      toast.error('Failed to save changes');
    }
  };
  
   
  const cancelEditing = () => {
    setIsEditing(false);
    setEditedItem(null);
  };

  const confirmDeleteItem = (itemId) => {
    setDeleteItemId(itemId);
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(itemId);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8070/api/product/${itemId}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setItems(items.filter(item => item._id !== itemId));
      // Show success message
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error("Error deleting item:", error);
      // Show error message
      toast.error('Failed to delete item');
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <button className="btn btn-primary" onClick={()=>navigate('/add-product')}>
          ADD PRODUCT
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{isEditing && editedItem._id === item._id ? <input value={editedItem.title || ''} onChange={(e) => setEditedItem({...editedItem, title: e.target.value})} /> : item.title}</td>
              <td>{isEditing && editedItem._id === item._id ? <input value={editedItem.description || ''} onChange={(e) => setEditedItem({...editedItem, description: e.target.value})} /> : item.description}</td>
              <td>{isEditing && editedItem._id === item._id ? <input value={editedItem.category || ''} onChange={(e) => setEditedItem({...editedItem, category: e.target.value})} /> : item.category}</td>
              <td>
                {isEditing && editedItem._id === item._id ? (
                  <>
                    <Button variant="success" onClick={saveChanges}>Save</Button>{' '}
                    <Button variant="danger" onClick={cancelEditing}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button variant="info" onClick={() => editItem(item._id)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => confirmDeleteItem(item._id)}>Delete</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPanelEdit;
