import { Link } from 'react-router-dom'

const TopNav = () => {

    return  (
        <header>
            <div className="pharmacy_name">
                <Link to="/">
                    <h1>HealthFirst</h1>
                </Link>
            </div>
        </header>
    )
}

export default TopNav