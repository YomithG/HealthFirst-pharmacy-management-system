import React from 'react';
import backgroundImage from './contactbackground.jpg'; // Import the image
import bc112 from './bc1124.jpg';

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
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url(${bc112})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed', // Ensure the background covers the whole page
    padding: '20px',
    margin: 0,
    width: '100vw',
    minHeight: '100vh', // Ensure minimum height covers the viewport
    height: 'auto', // Allow height to adjust with content
  };

  const backgroundStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${bc112})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    color: 'whitesmoke',
    fontWeight: 'bolder',
    padding: '50px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '10px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div> {/* Background layer */}
      <section style={contentStyle}>
        <h1 style={{color:'whitesmoke'}}>About Us</h1>
        <hr style={{ width: '50%', margin: '20px auto', borderColor: '#fff' }} />
        <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', fontSize: '1.1em' }}>
        <strong style={{color:'whitesmoke',fontSize:'20px'}}>Central Pharmacy: Your Trusted Health Partner Since 2001</strong><br />
          Welcome to Central Pharmacy, a cornerstone of healthcare in the heart of Pokunuwita since 2001. As a proud franchise of the Osu Sala network under the State Pharmaceuticals Corporation (SPC) of Sri Lanka, we are committed to providing our community with high-quality, affordable healthcare solutions.
          <br /><br /><strong style={{color:'whitesmoke',fontSize:'25px'}}>Our Journey</strong><br />
          Founded over two decades ago, Central Pharmacy has grown into a trusted name in the region, known for its dedication to customer care and pharmaceutical excellence. Our location in Pokunuwita serves as a hub where health and well-being are our top priorities.
          <br /><br /><strong style={{color:'whitesmoke',fontSize:'25px'}}>Our Services</strong><br />
          At Central Pharmacy, we offer a comprehensive range of services designed to meet all your health needs:
          <br />- Prescription Medication Services: Our knowledgeable pharmacists ensure that you receive the correct medications and provide expert advice on their use.
          <br />- Over-the-Counter Medication Services: We stock a wide variety of over-the-counter medicines and health products to address everyday health concerns.
          <br />- Delivery Services: For your convenience, we offer prompt and reliable delivery services, bringing your medications and health products right to your doorstep.
          <br /><br />As part of the SPC's Osu Sala network, we uphold the highest standards of quality and service, ensuring that every customer receives the best care possible.
          <br /><br /><strong style={{color:'whitesmoke',fontSize:'20px'}}>Thank you for choosing Central Pharmacy. We are here to support your health and wellness journey every step of the way.</strong>
        </p>
      </section>
    </div>
  );
};

export default Aboutus;
