import React, { useEffect, useState } from "react";
import Toast from "../../utils/Toast";
import './DelievryPage.css';
import jsPDF from 'jspdf';
import DeliveryDetails from "../../Components/Product/DeliveryDetails";

const DeliveryPage = () => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch('http://localhost:8070/api/delivery_details');
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const json = await response.json();
                setDetails(json);
            } catch (error) {
                console.error('Error fetching details: ', error);
            }
        }
        fetchDetails();
    }, []);

    const handleUpdate = async (detailToUpdate) => {
        try {
            const response = await fetch(`http://localhost:8070/api/delivery_details/${detailToUpdate._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(detailToUpdate)
            });
            if (!response.ok) {
                throw new Error('Failed to update item');
            }
            const updatedDetail = await response.json();
            setDetails(prevDetails => {
                const updatedDetails = prevDetails.map(detail => {
                    if (detail._id === updatedDetail._id) {
                        return updatedDetail;
                    }
                    return detail;
                });
               
                return updatedDetails;
            });
            // Show success message
            Toast({ type: "success", message: "Updated successfully" });
        } catch (error) {
            // Show error message
            Toast({ type: "error", message: "Error in updating!" });
            console.error('Error updating detail: ', error);
        }
    };
    
    const handleDelete = async (detailId) => {
        try {
            if (window.confirm("Are you sure you want to delete this detail?")) {
                const response = await fetch(`http://localhost:8070/api/delivery_details/${detailId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Failed to delete item');
                }
                setDetails(prevDetails => prevDetails.filter(detail => detail._id !== detailId));
                // Show success message
                Toast({ type: "success", message: "Detail deleted successfully" });
            }
        } catch (error) {
            // Show success message
            console.error('Error deleting detail: ', error);
            Toast({ type: "error", message: "Failed to delete detail" });
        }
    };

    const generatePDF = (detail) => {
        const doc = new jsPDF();
        const margin = 15;
        const lineHeight = 10;
        let yOffset = margin;
    
        // Calculate height of content
        const contentHeight = (detail.orderItems.length * 2 + 6) * lineHeight;
    
        // Draw frame
        doc.rect(margin, margin, doc.internal.pageSize.width - 2 * margin, contentHeight + 6 * lineHeight, 'S');
    
        // Title
        doc.setFont('times', 'bold');
        doc.setFontSize(20);
        doc.text('Health-First', margin, yOffset);
        yOffset += lineHeight * 2;
    
        // Subtitle
        doc.setFontSize(16);
        doc.text('Invoice', margin, yOffset);
        yOffset += lineHeight * 2;
    
        // Address
        doc.setFontSize(12);
        doc.text('Central Pharmacy, Pokunuwita', margin, yOffset);
        yOffset += lineHeight;
        doc.text('Telephone: 011-2568890', margin, yOffset);
        yOffset += lineHeight;
        doc.text('Email: healthfirstpharmacy@gmail.com', margin, yOffset);
        yOffset += lineHeight * 2;
    
        // Order Details
        doc.setFont('times', 'bold');
        doc.setFontSize(16);
        doc.text('Order Details', margin, yOffset);
        yOffset += lineHeight * 2;
    
        doc.setFont('times', 'normal');
        doc.setFontSize(14);
        detail.orderItems.forEach((item) => {
            doc.text(`Product: ${item.title}`, margin, yOffset);
            yOffset += lineHeight;
            doc.text(`  Quantity: ${item.quantity}`, margin, yOffset);
            doc.text(`  Price: Rs. ${item.price.toFixed(2)}`, margin + 80, yOffset);
            yOffset += lineHeight;
        });
    
        // Total Price
        //.reduce -> iterate over each item in orderItems array & cal a total value
        const totalPrice = detail.orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        doc.setFont('times', 'bold');
        doc.text(`Total Price: Rs. ${totalPrice.toFixed(2)}`, margin, yOffset);
        yOffset += lineHeight * 2;
    
        // Date
        const date = new Date().toLocaleDateString();
        doc.text(`Date: ${date}`, margin, yOffset);
    
        // Footer
        doc.setFontSize(10);
        doc.text('Thank you for your purchase!', margin, doc.internal.pageSize.height - margin);
    
        // Save the PDF
        doc.save('order_details.pdf');
    };
       
   return (
        <div className="main">
            <h1 className="page-title">Delivery and Order Details</h1>
            <div className="details-container">
                {details && details.map(detail => (
                    <div key={detail._id} className="detail-card">
                        <DeliveryDetails
                            detail={detail}
                            isEditable={true} // Delivery details are editable
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                        <div className="order-details">
                            <h3>Order Detail</h3>
                            <p><strong>Order ID:</strong> {detail._id}</p>
                            <div>
                                {detail.orderItems.map((item, index) => (
                                    <div key={index}>
                                        <p><strong>Product:</strong> {item.title}</p>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        <p><strong>Price:</strong> {item.price}</p>
                                    </div>
                                ))}
                            </div>
                            <p><strong>Status:</strong> {detail.status}</p>
                            <p><strong>Total Price:</strong> Rs. {detail.orderItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</p>
                            <button className="pdf-button" onClick={() => generatePDF(detail)}>Download PDF</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DeliveryPage;
