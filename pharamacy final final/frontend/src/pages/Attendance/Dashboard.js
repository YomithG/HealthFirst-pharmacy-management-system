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
            const response = await fetch('/api/salary')
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
                type="String"
                placeholder="Search by Employee Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="salary">
                {filteredSalary.map((employee) => (
                    <SalaryDetails key={employee.name} salary={employee} />
                ))}
            </div>

        </div>
    )
}

export default Dashboard
