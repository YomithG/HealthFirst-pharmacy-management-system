import { useEffect } from 'react'
import { useSalaryContext } from '../hooks/useSalaryContext'

// components
import SalaryDetails from '../components/SalaryDetails'
import Salaryform from '../components/Salaryform'

const Home = () => {
    const {salary, dispatch} = useSalaryContext();

    useEffect(() => {
        const fetchSalary = async () => {
            const response = await fetch('/api/salary')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_SALARY', payload: json})
            }
        }

        fetchSalary()
    }, [dispatch])

    return (
        <div className="home">
            <div className='salary'>
                {salary && salary.map((salary) => (
                    <SalaryDetails key={salary._id} salary={salary} />
                ))}
            </div>
            <Salaryform />
        </div>
    )
}

export default Home