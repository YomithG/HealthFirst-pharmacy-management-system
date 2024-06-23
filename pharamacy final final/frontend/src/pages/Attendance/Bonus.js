import React, { useState, useEffect } from "react";
import BonusForm from '../../Components/Attendance/BonusForm';
//import './Bonus.css'

const BonusPage = () => {
    const [bonuses, setBonuses] = useState([]);

    useEffect(() => {
        const fetchBonuses = async () => {
            try {
                const response = await fetch('http://localhost:8070/api/bonus');
                const data = await response.json();
                setBonuses(data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching bonus data:', error);
            }
        };
    
        fetchBonuses();
    }, []);
    

    const handleFormSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:8070/api/bonus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const newBonus = await response.json();
                console.log("bonus", response.data)
                setBonuses([...bonuses, newBonus]); // Add new bonus to bonuses state
            } else {
                console.error('Failed to submit bonus form:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting bonus form:', error);
        }
    };
    

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    };
    
    const thStyle = {
        backgroundColor: '#f2f2f2',
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };
    
    const tdStyle = {
        padding: '12px',
        borderBottom: '1px solid #ddd',
    };

    const tableContainerStyle = {
        maxWidth: '800px',
        margin: 'auto',
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Bonus Details</h2>
            <BonusForm onSubmit={handleFormSubmit} />
            <div style={tableContainerStyle}>
                <h3>Bonus Table</h3>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Bonus ID</th>
                            <th style={thStyle}>Month</th>
                            <th style={thStyle}>Year</th>
                            <th style={thStyle}>Bonus Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bonuses.map((bonus) => (
                            <tr key={bonus.bonusID}>
                                <td style={tdStyle}>{bonus.bonusID}</td>
                                <td style={tdStyle}>{bonus.month}</td>
                                <td style={tdStyle}>{bonus.year}</td>
                                <td style={tdStyle}>{bonus.bonusAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
};

export default BonusPage;
