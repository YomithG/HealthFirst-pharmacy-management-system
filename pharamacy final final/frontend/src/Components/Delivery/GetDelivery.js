import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Delivery.css"; 
// import "./GetDelivery.css"; 
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

export default function GetDelivery() {
    const [deliveries, setDeliveries] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const navigate = useNavigate();
    useEffect(() => {
        fetchDeliveries();
    }, []); // Empty dependency array to ensure this effect runs only once after the component mounts

    const fetchDeliveries = () => {
        axios.get("http://localhost:8070/delivery/") 
            .then(response => {
                setDeliveries(response.data);
            })
            .catch(error => {
                console.error('Error fetching deliveries:', error);
            });
    };

    const handleUpdateStatus = (id) => {
        const deliveryToUpdate = deliveries.find(delivery => delivery._id === id);
        setSelectedDelivery(deliveryToUpdate);
        setNewStatus(deliveryToUpdate.status); // Set initial value of newStatus to current status
    };

    const handleSaveStatus = () => {
        if (newStatus !== selectedDelivery.status) {
            axios.put(`http://localhost:8070/delivery/update/${selectedDelivery._id}`, { status: newStatus })
                .then(response => {
                    console.log(response.data);
                    fetchDeliveries(); // Refresh the list of deliveries after updating
                })
                .catch(error => {
                    console.error('Error updating delivery:', error);
                });
        }
        setSelectedDelivery(null); // Reset selectedDelivery after updating
    };

    const handleCancelUpdate = () => {
        setSelectedDelivery(null); // Reset selectedDelivery without saving changes
    };

    const handleDeleteDelivery = (id) => {
        axios.delete(`http://localhost:8070/delivery/delete/${id}`)
            .then(response => {
                console.log(response.data);
                fetchDeliveries(); // Refresh the list of deliveries after deleting
            })
            .catch(error => {
                console.error('Error deleting delivery:', error);
            });
    };

    // Filter deliveries based on search query
    const filteredDeliveries = deliveries.filter(delivery =>
        delivery.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Delivery Report", 10, 10);
        doc.autoTable({ html: '.delivery-table' });
        doc.save('delivery_report.pdf');
    };

    return (
        <div className="delivery-table-container">
            <h1><center>Delivery Records</center></h1>
            <button className="download-button" onClick={generatePDF}>Download Report</button>
            <div className="">
                <div>
                    <button className="btn btn-primary" onClick={()=>navigate('/add-delivery')}>
                        ADD DELIVERY
                    </button>
                </div>
                <h4>Search: </h4>
                <div className="search-bar">
                    <input
                    type="text"
                    placeholder="Search by status"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    
                />
                
  </div>
</div>

            <table className="delivery-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th>Town</th>
                        <th>Amount</th>
                        <th>Fee</th>
                        <th>Total</th>
                        <th>Rider</th>
                        <th>Status</th>
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {filteredDeliveries.map(delivery => (
                        <tr key={delivery._id}>
                            <td>{delivery.name}</td>
                            <td>{delivery.contactNumber}</td>
                            <td>{delivery.address}</td>
                            <td>{delivery.city}</td>
                            <td>{delivery.amount}</td>
                            <td>{delivery.fee}</td>
                            <td>{delivery.total}</td>
                            <td>{delivery.rider}</td>
                            <td>
                                {selectedDelivery && selectedDelivery._id === delivery._id ? (
                                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                        <option value="pending">Pending</option>
                                        <option value="progress">Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                ) : (
                                    delivery.status
                                )}
                            </td>
                            <td>
                                {selectedDelivery && selectedDelivery._id === delivery._id ? (
                                    <>
                                        <button className="save-button" onClick={handleSaveStatus}>Save</button>
                                        <button className="cancel-button" onClick={handleCancelUpdate}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="update-button btn-primary w-100" style={{height:'40px'}} onClick={() => handleUpdateStatus(delivery._id)}>Update</button>
                                        <button className="delete-button  w-100"  style={{height:'40px'}} onClick={() => handleDeleteDelivery(delivery._id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
