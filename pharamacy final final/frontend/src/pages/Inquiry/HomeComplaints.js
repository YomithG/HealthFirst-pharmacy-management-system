import { Link } from 'react-router-dom';
import ComplaintForm from '../../Components/Inquiry/ComplaintForm';
import './Inquiry.css';

const HomeComplaints = () => {
  return (
    <div className="">
      <h2>Inquiries and Complaints</h2>
      <ComplaintForm />
      <br></br>
     <button className="inq_button"> <Link to="/check-complaints">Check Complaints</Link>
    </button></div>
  );
};

export default HomeComplaints;
