// Navbar.js
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (

        <nav className="sidenav">
            <Link to="/" className="brand">
                HealthFirst
            </Link>
            <ul>
                <li><Link to="/home">Calculate Salary</Link></li>
                <li><Link to="/attendance">Attendance</Link></li>
                <li><Link to="/leave">Leave</Link></li>
                <li><Link to="/salaryReport">Salary Report</Link></li>
                <li><Link to="/bonusReport">Bonus Report</Link></li>
                <li><Link to="/attendanceEmp">AttendanceEmp</Link></li>
                <li><Link to="/leavesEmp">LeavesEmp</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
