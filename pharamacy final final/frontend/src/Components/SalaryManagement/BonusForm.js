import React, { useState, useEffect } from "react";

const BonusForm = ({ onSubmit }) => {
    const [bonusID, setBonusID] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [bonusAmount, setBonusAmount] = useState('');

    useEffect(() => {
        // Set the default year as the current year
        const currentYear = new Date().getFullYear();
        setYear(currentYear);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ bonusID, month, year, bonusAmount });

        // Clear the form after submitting details to the database
        setBonusID('');
        setMonth('');
        setYear('');
        setBonusAmount('');
    };

    return (
        <form onSubmit={handleSubmit} className="bonus-form">
            <input type="text" value={bonusID} onChange={(e) => setBonusID(e.target.value)} placeholder="Bonus ID" />
            <select value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month">
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </select>
            <br/>
            <br/>
            <select value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year">
                <option value="">Select Year</option>
                {[...Array(50)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={i} value={year}>{year}</option>;
                })}
            </select>
            <br/>
            <br/>
            <input type="number" value={bonusAmount} onChange={(e) => setBonusAmount(e.target.value)} placeholder="Bonus Amount" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default BonusForm;
