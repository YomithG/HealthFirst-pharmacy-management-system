import { useEffect } from 'react'
import { useSalaryContext } from '../../hooks/useSalaryContext'
import './SalaryManagement.css';

// components
import Salaryform from '../../Components/SalaryManagement/Salaryform'
import SalaryDetails from '../../Components/SalaryManagement/SalaryDetails'

const Home = () => {
    const {salary, dispatch} = useSalaryContext();

    useEffect(() => {
        const fetchSalary = async () => {
            const response = await fetch('http://localhost:8070/api/salary')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_SALARY', payload: json})
            }
        }

        fetchSalary()
    }, [dispatch])

    return (
        <div className="">
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