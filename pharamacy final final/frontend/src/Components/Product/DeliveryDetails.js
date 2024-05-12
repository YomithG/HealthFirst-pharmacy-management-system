import React, { useState } from "react";

const DeliveryDetails = ({ detail, isEditable, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetail, setEditedDetail] = useState({ ...detail });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8070/api/delivery_details/${detail._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedDetail)
            });
            if (!response.ok) {
                throw new Error('Failed to update item');
            }
            const updatedDetail = await response.json();
            onUpdate(updatedDetail);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating detail: ', error);
        }
    };

    const handleCancel = () => {
        setEditedDetail({ ...detail });
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedDetail((prevDetail) => ({
            ...prevDetail,
            [name]: value,
        }));
    };

    const handleDelete = () => {
        onDelete(detail._id);
    };

    return (
        <>
            <div className="delivery-detail">
                <h3>{isEditable ? "Delivery Detail" : "Order Detail"}</h3>
                {isEditable && isEditing ? (
                    <form>
                        <label>Name:</label>
                        <input type="text" name="name" value={editedDetail.name} onChange={handleChange} />
                        <label>Address:</label>
                        <input type="text" name="address" value={editedDetail.address} onChange={handleChange} />
                        <label>City:</label>
                        <input type="text" name="city" value={editedDetail.city} onChange={handleChange} />
                        <label>Contact Number:</label>
                        <input type="text" name="contactNo" value={editedDetail.contactNo} onChange={handleChange} />
                        <button className="btn btn-success" onClick={handleSave}>Save</button>
                                    <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                    </form>
                ) : (
                    <>
                        <p><strong>Name:</strong> {detail.name}</p>
                        <p><strong>Address:</strong> {detail.address}</p>
                        <p><strong>City:</strong> {detail.city}</p>
                        <p><strong>Contact Number:</strong> {detail.contactNo}</p>
                        {isEditable && <button className="btn btn-primary" onClick={handleEdit}>Edit</button>}
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </>
                )}
            </div>
        </>
    );
};

export default DeliveryDetails;
