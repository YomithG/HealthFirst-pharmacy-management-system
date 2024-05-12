import { useState } from 'react';
import { useEffect } from 'react'
import { useSalaryContext } from '../../hooks/useSalaryContext'
import './SalaryManagement.css';
import SalaryDetails from '../../Components/SalaryManagement/SalaryDetails';


const Dashboard = () => {
    const { salary, dispatch } = useSalaryContext();

    const [searchTerm, setSearchTerm] = useState('');

    // Ensure salary is not null before filtering
    const filteredSalary = salary ? salary.filter((employee) =>
        employee._id.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    useEffect(() => {
        const fetchSalary = async () => {
            const response = await fetch('http://localhost:8070/api/salary')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_SALARY', payload: json })
            }
        }

        fetchSalary()
    }, [dispatch])

    return (
        <div className="dashboard">

            <input
                type="text"
                placeholder="Search by Employee ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="salary">
                {filteredSalary.map((employee) => (
                    <SalaryDetails key={employee._id} salary={employee} />
                ))}
            </div>

        </div>
    )
}

export default Dashboard
