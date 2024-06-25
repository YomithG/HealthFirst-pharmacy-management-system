import React, { useState, useEffect } from "react";
import { useSalaryContext } from "../hooks/useSalaryContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const SalaryDetails = ({ salary }) => {
    const { dispatch } = useSalaryContext();
    const [editing, setEditing] = useState(false);
    const [editedSalary, setEditedSalary] = useState({ ...salary });
    const [bonusAmount, setBonusAmount] = useState(null); // State to store bonus amount
    // eslint-disable-next-line no-unused-vars
    const [presentCount, setPresentCount] = useState(0); // State to store present count
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true); // State to track loading state

    useEffect(() => {
        // Function to fetch attendance data for the specific employee
        const fetchAttendanceData = async () => {
            try {
                const response = await fetch(`/api/attendance?name=${salary.name}`);
                const attendanceData = await response.json();
                // Calculate the count of 'present' statuses
                const count = attendanceData.filter(record => record.status === 'present').length;
                setPresentCount(count);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        const fetchBonusData = async () => {
            try {
                const response = await fetch(`/api/bonus?month=${salary.month}&year=${salary.year}`);
                const bonusData = await response.json();
                // Find the bonus amount for the specific month and year
                const bonusForMonthYear = bonusData.find(bonus => bonus.month === salary.month && bonus.year === salary.year);
                // If bonus data exists for the selected month and year, set the bonus amount
                if (response.ok && bonusForMonthYear) {
                setBonusAmount(bonusForMonthYear.bonusAmount);
                } else {
                    setBonusAmount(null); // Clear bonus amount if no data found
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bonus data:', error);
            }
        };

        // Fetch attendance data when component mounts
        fetchAttendanceData();
        // Fetch bonus data when component mounts
        fetchBonusData();
    }, [salary.name , salary.month, salary.year]);

    const handleClick = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this salary record?");
        if (confirmed) {
            const response = await fetch('/api/salary/' + salary._id, {
                method: 'DELETE'
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'DELETE_SALARY', payload: json });
            }
        }
    };

    const handleEdit = async () => {
        const response = await fetch('/api/salary/' + salary._id);
        const updatedSalary = await response.json();

        if (response.ok) {
            setEditedSalary({ ...updatedSalary });
            setEditing(true);
        }
    };

    const handleSave = async () => {
        // Calculate net salary based on edited values
        const net = Number(editedSalary.basic) + (300 * Number(editedSalary.oThours)) - (200 * Number(editedSalary.leaves)) + (bonusAmount || 0);
        const editedSalaryWithNet = { ...editedSalary, net };

        // Send the edited data to the server
        const response = await fetch(`/api/salary/${salary._id}`, {
            method: 'PATCH',
            body: JSON.stringify(editedSalaryWithNet),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Update the net amount in the edited salary object
            setEditedSalary(editedSalaryWithNet);
            // Dispatch the update to the context
            dispatch({ type: 'UPDATE_SALARY', payload: editedSalaryWithNet });
            // Exit editing mode
            setEditing(false);
        }
    };

    const handleChange = (e) => {
        setEditedSalary({
            ...editedSalary,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="salary-details">
            {!editing ? (
                <>
                    <h4>{salary.name}</h4>
                    <p><strong>Employee ID: </strong>{salary._id}</p>
                    <p><strong>Basic(Rs): </strong>{salary.basic}</p>
                    <p><strong>Leaves: </strong>{salary.leaves}</p>
                    <p><strong>OThours: </strong>{salary.oThours}</p>
                    <p><strong>Bonus: </strong>{bonusAmount}</p>
                    <p><strong>Net(Rs): </strong>{salary.net}</p>
                    <p><strong>Month: </strong>{salary.month}</p>
                    <p><strong>Year: </strong>{salary.year}</p>
                    <span className="delete-button" onClick={handleClick}>Delete</span>
                    <span className="edit-button" onClick={handleEdit}>Edit</span>
                </>
            ) : (
                <>
                    <input type="text" name="name" value={editedSalary.name} onChange={handleChange} />
                    <input type="number" name="basic" value={editedSalary.basic} onChange={handleChange} />
                    <input type="number" name="leaves" value={editedSalary.leaves} onChange={handleChange} />
                    <input type="number" name="oThours" value={editedSalary.oThours} onChange={handleChange} />
                    <input type="text" name="month" value={editedSalary.month} onChange={handleChange} />
                    <input type="text" name="year" value={editedSalary.year} onChange={handleChange} />
                    {/* Exclude net salary input when editing */}
                    <p><strong>Net(Rs): </strong>{editedSalary.net}</p>
                    <button className="save-button" onClick={handleSave}>Save</button>     
                </>
            )}
            <p>{formatDistanceToNow(new Date(salary.createdAt), { addSuffix: true })}</p>
        </div>
    );
}

export default SalaryDetails;
