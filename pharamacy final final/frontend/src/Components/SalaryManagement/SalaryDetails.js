import React, { useState, useEffect } from "react";
import { useSalaryContext } from "../../hooks/useSalaryContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './Salary.css'

const SalaryDetails = ({ salary }) => {
    const { dispatch } = useSalaryContext();
    const [editing, setEditing] = useState(false);
    const [editedSalary, setEditedSalary] = useState({ ...salary });
    const [presentCount, setPresentCount] = useState(0); // State to store present count
    const [loading, setLoading] = useState(true); // State to track loading state

    useEffect(() => {
        // Function to fetch attendance data for the specific employee
        const fetchAttendanceData = async () => {
            try {
                const response = await fetch(`http://localhost:8070/api/attendance?name=${salary.name}`);
                const attendanceData = await response.json();
                // Calculate the count of 'present' statuses
                const count = attendanceData.filter(record => record.status === 'present').length;
                setPresentCount(count);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        // Fetch attendance data when component mounts
        fetchAttendanceData();
    }, [salary.name]);

    const handleClick = async () => {
        const response = await fetch(`http://localhost:8070/api/salary/${salary._id}` , {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_SALARY', payload: json })
        }
    };

    const handleEdit = async () => {
        const response = await fetch('http://localhost:8070/api/salary/' + salary._id);
        const updatedSalary = await response.json();

        if (response.ok) {
            setEditedSalary({ ...updatedSalary });
            setEditing(true);
        }
    };

    const handleSave = async () => {
        const response = await fetch(`http://localhost:8070/api/salary/${salary._id}`, {
            method: 'PATCH',
            body: JSON.stringify(editedSalary),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            dispatch({ type: 'UPDATE_SALARY', payload: editedSalary });
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
                    <input type="number" name="net" value={editedSalary.net} onChange={handleChange} />
                    <button className="save-button" onClick={handleSave}>Save</button>
                </>
            )}
            <p>{formatDistanceToNow(new Date(salary.createdAt), { addSuffix: true })}</p>
        </div>
    );
}

export default SalaryDetails;
