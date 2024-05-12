import { useState, useEffect } from "react";

const DeliveryDetailsForm = ({ setDetails }) => {
    console.log('Rendering DeliveryDetailsForm');
    
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        console.log('Current name:', name);
        console.log('Current address:', address);
        console.log('Current city:', city);
        console.log('Current contactNo:', contactNo);
    }, [name, address, city, contactNo]);

    useEffect(() => {
        if (isSubmitted) {
            alert('Data inserted successfully!');
            setIsSubmitted(false);
        }
    }, [isSubmitted]);

    const handleSubmit = async (e) => {
        console.log('Submitting form');
        e.preventDefault();
    
        const detail = { name, address, city, contactNo };
    
        try {
            const response = await fetch('http://localhost:8070/api/delivery_details', {
                method: 'POST',
                body: JSON.stringify(detail),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error);
            }
    
            const newDetail = await response.json();
    
            setDetails(prevDetails => [...prevDetails, newDetail]);
    
            setName('');
            setAddress('');
            setCity('');
            setContactNo('');
            setError(null);
            setIsSubmitted(true);

        } catch (error) {
            setError(error.message);
        }
    };
    

    return (
        <>{console.log('Rendering form fields')}
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add delivery information</h3>

            <label>Name: </label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <br /><br />
            <label>Address: </label>
            <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
            />
            <br /><br />
            <label>City: </label>
            <select
                onChange={(e) => setCity(e.target.value)} 
                value={city}
            >
                <option value="">Select City</option>
                <option value="Kaduwela">Kaduwela</option>
                <option value="Malabe">Malabe</option>
                <option value="Homagama">Homagama</option>
            </select>
            <br /><br />
            <label>Contact No: </label>
            <input
                type="text"
                onChange={(e) => setContactNo(e.target.value)}
                value={contactNo}
            />
            <br /><br />
            <button>Submit</button>
        </form></>
    )
}

export default DeliveryDetailsForm;
