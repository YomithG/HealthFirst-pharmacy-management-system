
import React, { useState, useEffect } from "react";
import "./Delivery.css";
import axios from "axios";

export default function AddDelivery() {
    const [orderIds, setOrderIds] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState("");
    const [orders, setOrders] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [fee, setFee] = useState("");
    const [total, setTotal] = useState("");
    const [rider, setRider] = useState("Select Rider");

    useEffect(() => {
        axios.get("http://localhost:8070/delivery/orders")
            .then(response => {
                const ids = response.data.map(order => order._id); // Corrected to access _id property
                setOrderIds(ids);
                console.log(ids)
                setOrders(response.data);
            })
            .catch(error => {
                console.error("Error fetching order IDs:", error);
            });
    }, []);



    // http://localhost:8070/api/delivery_details/${orderId}
    const handleOrderChange = (e) => {
        const selectedId = e.target.value;
        setSelectedOrderId(selectedId);

        axios.get(`http://localhost:8070/api/delivery_details/${selectedId}`)
            .then(response => {
                const selectedOrder = response.data; // Corrected to access _id property
                console.log(selectedOrder);

                setName(selectedOrder.name);
                setAddress(selectedOrder.address);
                setCity(selectedOrder.city);
                setContactNumber(selectedOrder.contactNo);
                setAmount(selectedOrder.totalPrice.toString());
                const feeValue = calculateFee(selectedOrder.city.toLowerCase());
                setFee(feeValue.toString());
            })
            .catch(error => {
                console.error("Error fetching order details:", error);
            });
    };

    //validate part to select rider
    const sendData = (e) => {
        e.preventDefault();
        if(rider == "Select Rider"){
            alert("Please Select a Rider")
            return;
        }
        
        const newDelivery = {
            name,
            address,
            city,
            contactNumber: parseInt(contactNumber),
            amount,
            fee,
            total: parseFloat(total),
            rider,
            status: "pending"
        };

        axios.post("http://localhost:8070/delivery/add", newDelivery)
            .then(() => {
                alert("Delivery placed successfully");
                // Clear input fields and state
                setSelectedOrderId("");
                setName("");
                setAddress("");
                setCity("");
                setContactNumber("");
                setAmount("");
                setFee("");
                setTotal("");

                // Call PUT request
                return axios.put(`http://localhost:8070/api/delivery_details/updateStatus/${selectedOrderId}`);
            })
            .then(() => {
                alert("Status Updated Successfull");
                // Additional logic after second request
            })
            .catch((err) => {
                alert(err);
            });
    };


    const handleAmountChange = (e) => {
        const newAmount = e.target.value;
        setAmount(newAmount);
    };

    const handleFeeChange = (e) => {
        const newFee = e.target.value;
        setFee(newFee);
    };

    useEffect(() => {
        calculateTotal(amount, fee);
    }, [amount, fee]);

    const calculateTotal = (newAmount, newFee) => {
        let amountValue = parseFloat(newAmount);
        let feeValue = parseFloat(newFee);

        if (!isNaN(amountValue) && !isNaN(feeValue)) {
            let totalValue = amountValue + feeValue;
            setTotal(totalValue.toFixed(2));
        } else if (!isNaN(amountValue)) {
            setTotal(amountValue);
        } else if (!isNaN(feeValue)) {
            setTotal(feeValue);
        } else {
            setTotal("");
        }
    };

    const calculateFee = (selectedCity) => {
        let fixedFee = 0;
        switch (selectedCity) {
            case "malabe":
                fixedFee = 200;
                break;
            case "kaduwela":
                fixedFee = 150;
                break;
            case "koswatta":
                fixedFee = 250;
                break;
            default:
                fixedFee = 0;
        }
        return fixedFee;
    };

    return (
        <div className="p-4">
            <form id="deliveryForm" onSubmit={sendData}>
                <div>
                    <label htmlFor="orderId">Order ID:</label>
                    <select id="orderId" onChange={handleOrderChange}>
                        <option value="">Select an order ID</option>
                        {orderIds.map(orderId => (
                            <option key={orderId} value={orderId}>{orderId}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} readOnly />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" value={address} readOnly />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" value={city} readOnly />
                </div>
                <div>
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input type="text" id="contactNumber" value={contactNumber} readOnly />
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input type="text" id="amount" onChange={handleAmountChange} value={amount} readOnly />
                </div>
                <div>
                    <label htmlFor="fee">Fee:</label>
                    <input type="text" id="fee" onChange={handleFeeChange} value={fee} />
                </div>
                <div>
                    <label htmlFor="total">Total:</label>
                    <input type="text" id="total" readOnly value={total} />
                </div>
                <div>
                    <label htmlFor="rider">Rider:</label>
                    <select id="rider" onChange={(e) => setRider(e.target.value)}>
                        <option value="nimal">Select Rider</option>
                        <option value="nimal">Nimal</option>
                        <option value="kamal">Kamal</option>
                        <option value="sunil">Sunil</option>
                    </select>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
