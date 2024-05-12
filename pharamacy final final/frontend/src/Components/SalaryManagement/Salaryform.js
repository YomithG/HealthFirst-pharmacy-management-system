import { useState } from "react";
import { useSalaryContext } from '../../hooks/useSalaryContext'
import './Salary.css'
const Salaryform = () => {
    const { dispatch } = useSalaryContext()

    const [name, setName] = useState('')
    const [basic, setBasic] = useState('')
    const [leaves, setLeaves] = useState('')
    const [oThours, setOThours] = useState('')
    const [month, setMonth] = useState('') 
    const [year, setYear] = useState('')   
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Calculate net salary
        const net = Number(basic) + (300 * Number(oThours)) - (200 * Number(leaves));

        const salary = { name, basic, leaves, oThours, net, month, year } // Include month and year in payload

        const response = await fetch('http://localhost:8070/api/salary', {
            method: 'POST',
            body: JSON.stringify(salary),
            headers: {
                'Content-Type': "application/json"
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setBasic('')
            setLeaves('')
            setOThours('')
            setMonth('') 
            setYear('') 
            setError(null)
            setEmptyFields([])
            console.log('new salary added', json)
            dispatch({ type: 'CREATE_SALARY', payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Salary</h3>

            {/*  dropdowns for month and year */}
            <label>Select Month:</label>
            <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={emptyFields.includes('month') ? 'error' : ''}
            >
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

            <label>Select Year:</label>
            <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={emptyFields.includes('year') ? 'error' : ''}
            >
                <option value="">Select Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
            </select>


            <label>Employee Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Basic(Rs:):</label>
            <input
                type="number"
                onChange={(e) => setBasic(e.target.value)}
                value={basic}
                className={emptyFields.includes('basic') ? 'error' : ''}
            />

            <label>Leaves:</label>
            <input
                type="number"
                onChange={(e) => setLeaves(e.target.value)}
                value={leaves}
                className={emptyFields.includes('leaves') ? 'error' : ''}
            />

            <label>OThours:</label>
            <input
                type="number"
                onChange={(e) => setOThours(e.target.value)}
                value={oThours}
                className={emptyFields.includes('oThours') ? 'error' : ''}
            />

            <button>Calculate Salary</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Salaryform