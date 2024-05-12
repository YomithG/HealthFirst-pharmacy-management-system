import React from 'react';
import heroImage from './heroImage.jpg';
import half1 from './half1.png';



const Home = () => {
  return (
    <div>
      {/* Hero section with image */}
      <section 
      style={{ 
        height: '800px', 
        background: `url(${heroImage}) no-repeat center center`, // Set background image
        backgroundSize: 'cover', // Ensure the image covers the entire section
        backgroundColor: '#f0f0f0', 
        textAlign: 'center', 
        paddingTop: '200px', 
        color: 'white' // Set text color to white
      }}
    >
      <h1>Welcome to HealthFirst</h1>
      <p>Find all your medication needs in one place</p>
    </section>
    <section style={{ height: '500px', backgroundColor: '#ffffff', textAlign: 'center', paddingTop: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  {/* First row */}
  <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '50px' }}>
    {/* Left side with image */}
    <div style={{ flex: 1 }}>
    <img src={half1} alt="Description of the image" style={{ maxWidth: '1200px', height: '500px', width:'100%' }} />

    </div>
    {/* Right side with text */}
    <div style={{ flex: 1, paddingLeft: '20px', textAlign: 'left' }}>
      <h2>Explore</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et bibendum velit.</p>
    </div>
  </div>
</section>



      {/* About Us section */}
      <section style={{ height: '800px', backgroundColor: '#ffe9e1', textAlign: 'center', paddingTop: '200px' }}>
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et bibendum velit.</p>
      </section>

      {/* Contact Us section */}
      <section style={{ height: '800px', backgroundColor: '#f0f0f0', textAlign: 'center', paddingTop: '200px' }}>
        <h2>Contact Us</h2>
        <p>Email: info@example.com</p>
        <p>Phone: 123-456-7890</p>
        <p>Address: 123 Main Street, City, Country</p>
      </section>

      {/* Footer section */}
      <footer style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '50px 0' }}>
        <div>
          <h2>Our Pharmacy</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div>
          <h2>Follow Us</h2>
          <div>
            <a href="#facebook">Facebook</a> | <a href="#twitter">Twitter</a> | <a href="#instagram">Instagram</a>
          </div>
        </div>
        <div>
          <h2>Contact Us</h2>
          <p>Email: info@example.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;

