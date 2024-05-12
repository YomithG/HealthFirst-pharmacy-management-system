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

const Aboutus = () => {
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
      
    </div>
  );
};

export default Aboutus;

