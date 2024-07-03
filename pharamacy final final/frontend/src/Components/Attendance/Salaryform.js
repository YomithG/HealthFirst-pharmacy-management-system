import { useState, useEffect} from "react";
import { useSalaryContext } from '../hooks/useSalaryContext'

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

    useEffect(() => {
        // Fetch existing salary records for the employee when month or year changes
        const fetchExistingSalaries = async () => {
            if (name && month && year) {
                try {
                    const response = await fetch(`/api/salary?name=${name}&month=${month}&year=${year}`);
                    const data = await response.json();
                    if (response.ok) {
                        // If records exist for the selected month and year, set duplication error
                        if (data.length > 0) {
                            setError('Salary record already exists for the selected month and year');
                        } else {
                            setError(null);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching existing salaries:', error);
                }
            }
        };

        fetchExistingSalaries();
    }, [name, month, year]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Validate name field to accept only strings
        if (name === 'name') {
            const isValidName = /^[a-zA-Z ]*$/.test(value); // Regular expression to allow only letters and spaces
            if (!isValidName) {
                setError('Name must contain only letters and spaces');
                return;
            } else {
                setError(null); // Clear error if validation passes
            }
        }
    
           // Validate fields to accept only positive numbers greater than 0
    if (['basic', 'leaves', 'oThours'].includes(name)) {
        const isValidNumber = Number(value) > 0 && !isNaN(value);
        if (!isValidNumber) {
            setError(`${name.charAt(0).toUpperCase() + name.slice(1)} must be a positive number greater than 0`);
            return;
        } else {
            setError(null); // Clear error if validation passes
        }
    }

        // Update state for other fields
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'basic':
                setBasic(value);
                break;
            case 'leaves':
                setLeaves(value);
                break;
            case 'oThours':
                setOThours(value);
                break;
            case 'month':
                setMonth(value);
                break;
            case 'year':
                setYear(value);
                break;
            default:
                break;
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Calculate net salary
        const net = Number(basic) + (300 * Number(oThours)) - (200 * Number(leaves));

        const salary = { name, basic, leaves, oThours, net, month, year } // Include month and year in payload

        const response = await fetch('/api/salary', {
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
                onChange={handleChange}
                name="basic"
                value={basic}
                className={emptyFields.includes('basic') ? 'error' : ''}
            />

            <label>Leaves:</label>
            <input
                type="number"
                onChange={handleChange}
                name="leaves"
                value={leaves}
                className={emptyFields.includes('leaves') ? 'error' : ''}
            />

            <label>OThours:</label>
            <input
                type="number"
                onChange={handleChange}
                name="oThours"
                value={oThours}
                className={emptyFields.includes('oThours') ? 'error' : ''}
            />

            <button>Calculate Salary</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Salaryform