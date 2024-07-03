import { useState } from 'react';
import { useEffect } from 'react'
import { useSalaryContext } from '../hooks/useSalaryContext'

// components
import SalaryDetails from '../components/SalaryDetails'

const Dashboard = () => {
    const { salary, dispatch } = useSalaryContext();

    const [searchTerm, setSearchTerm] = useState('');

    // Ensure salary is not null before filtering
    const filteredSalary = salary ? salary.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const response = await fetch('/api/salary');
                if (response.ok) {
                    const json = await response.json();
                    dispatch({ type: 'SET_SALARY', payload: json });
                } else {
                    throw new Error('Failed to fetch salary data');
                }
            } catch (error) {
                console.error('Error fetching salary:', error);
            }
        };

        fetchSalary()
    }, [dispatch])

    return (
        <div className="dashboard">
            <input
                type="text" // Changed type to "text" for input
                placeholder="Search by Employee Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="salary">
                {filteredSalary.map((employee) => (
                    <SalaryDetails key={employee.id} salary={employee} />
                    // Assuming employee objects have unique IDs
                ))}
            </div>
        </div>
    )
}

export default Dashboard
