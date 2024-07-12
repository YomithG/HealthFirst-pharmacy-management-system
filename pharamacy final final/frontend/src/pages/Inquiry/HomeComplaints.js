import { Link } from 'react-router-dom';
import ComplaintForm from '../../Components/Inquiry/ComplaintForm';
import './Inquiry.css';


const HomeComplaints = () => {
  return (
    <div className="">
      <br></br>
<br></br> <br></br>     <h2>Inquiries and Complaints</h2>
      <ComplaintForm />
      <br></br>
      <h4 style={{ fontSize: '14px', fontWeight: 'bold' }}>Contact us: 074-289-1299</h4>
      <h3 style={{ fontSize: '17px', fontWeight: 'bold' }}>Find us on Google Maps:</h3>
       <iframe
        title="Google Map"
        width="100%"
        height="300px"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7740308086973!2d79.85258597397747!3d6.917597018460291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596b1c2ae5b1%3A0x872e9262f485d782!2sColombo%20City%20Centre%20Mall%20and%20Residences!5e0!3m2!1sen!2slk!4v1686197786791!5m2!1sen!2slk"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
     <button className="inq_button"> <Link to="/check-complaints">Check Complaints</Link>
    </button></div>
  );
};

export default HomeComplaints;
