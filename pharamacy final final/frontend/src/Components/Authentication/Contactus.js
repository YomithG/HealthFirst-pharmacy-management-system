import React from 'react';
import backgroundImage from './contactbackground.jpg'; // Import the image

const ContactInfoBox = ({ icon, label, link }) => {
  const boxStyle = {
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px',
    width: '400px',
    height: '250px',
  };

  return (
    <div style={boxStyle}>
      <i className={icon} />
      <br />
      {label}: <a href={link}>{link}</a>
    </div>
  );
};

const ContactUs = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url(${backgroundImage})`, // Use backgroundImage variable
    backgroundSize: 'cover', // Scale the background image to cover entire container
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat',
    padding: '20px',
    margin: 0, // Remove default margin
    width: '100vw', // Full viewport width
    height: '100vh', // Full viewport height
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: '50px', color: 'black',marginTop: '100px' }}>Contact Us</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px', justifyContent: 'center', alignItems: 'center', }}>
        <div><ContactInfoBox icon="fas fa-phone" label="Phone" link="tel:+1234567890" /></div>
        <div><ContactInfoBox icon="fas fa-envelope" label="Email" link="mailto:info@example.com" /></div>
        <div><ContactInfoBox icon="fab fa-whatsapp" label="WhatsApp" link="https://wa.me/+1234567890" /></div>
        <div><ContactInfoBox icon="fab fa-twitter" label="Twitter" link="https://twitter.com/example" target="_blank" rel="noopener noreferrer" /></div>
        <div><ContactInfoBox icon="fab fa-facebook" label="Facebook" link="https://facebook.com/example" target="_blank" rel="noopener noreferrer" /></div>
        <div><ContactInfoBox icon="fab fa-instagram" label="Instagram" link="https://instagram.com/example" target="_blank" rel="noopener noreferrer" /></div>
      </div>
    </div>
  );
};

export default ContactUs;
