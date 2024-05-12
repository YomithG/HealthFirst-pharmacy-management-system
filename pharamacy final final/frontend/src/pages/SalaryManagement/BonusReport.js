import React, { useState, useEffect } from 'react';
import { useSalaryContext } from '../../hooks/useSalaryContext';
import './SalaryManagement.css';

const BonusReport = () => {
    const { dispatch } = useSalaryContext();
    const [bonuses, setBonuses] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch bonus data from the server
    useEffect(() => {
        const fetchBonuses = async () => {
            try {
                const response = await fetch('http://localhost:8070/api/bonuses');
                const data = await response.json();
                setBonuses(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bonuses:', error);
                setLoading(false);
            }
        };

        fetchBonuses();
    }, []);

    const handleBonusChange = (e, month) => {
        const updatedBonuses = { ...bonuses, [month]: e.target.value };
        setBonuses(updatedBonuses);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8070/api/bonuses', {
                method: 'POST',
                body: JSON.stringify(bonuses),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'UPDATE_BONUSES', payload: data });
            } else {
                console.error('Failed to update bonuses:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating bonuses:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Bonus Report</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(bonuses).map((month) => (
                    <div key={month}>
                        <label htmlFor={month}>{month}: </label>
                        <input
                            type="number"
                            id={month}
                            value={bonuses[month]}
                            onChange={(e) => handleBonusChange(e, month)}
                        />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BonusReport;
