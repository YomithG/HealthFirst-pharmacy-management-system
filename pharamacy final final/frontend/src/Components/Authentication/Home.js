import React from 'react';
import heroImage from './heroImage.jpg';
import heroImage2 from './heroImage2.jpg';
import explore from './explore.png';
import logo from './logo1.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import specific Swiper styles
import 'swiper/css/pagination'; // Import specific Swiper styles
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

const Home = () => {
  return (
    <div>
      <br/><br/>
      <Swiper
        cssMode={true}
        navigation={true}
        loop={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        rewind={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper mt-12"
      >
      <SwiperSlide>
        <img
          src={heroImage2}
          style={{height: '600px', width: '100%', objectFit: 'cover', backgroundColor: '#f0f0f0', opacity: '0.6'}}
          alt="Hero Image"
        />
        <div className='text' 
          style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'black', zIndex: 1,fontFamily:'sans-serif'}}
        >
          <img src= {logo} style={{height: '200px', width: '180px', }}/>
          <h1 style={{color:'rgb(64, 50, 17)', fontWeight:'bold'}} >MEET YOUR ONLINE PHARMACY <span style={{color:'black', fontSize:'50PX', fontWeight:'bolder'}}>HealthFirst</span></h1>
          <p style={{color:'black'}}>Medicine at your Door</p>
          </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={explore} 
            alt="" 
            style={{height: '600px', width: '100%', objectFit: 'fill', backgroundColor: '#f0f0f0'}}/>
          </SwiperSlide>
        </Swiper>

      {/* About Us section */}
      <section style={{ height: '500px', backgroundColor: '#ffe9e1', textAlign: 'center', paddingTop: '100px' }}>
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et bibendum velit.</p>
      </section>

      {/* Contact Us section */}
      <section style={{ height: '500px', backgroundColor: '#f0f0f0', textAlign: 'center', paddingTop: '200px' }}>
        <h2>Contact Us</h2>
        <p>Email: info@example.com</p>
        <p>Phone: 123-456-7890</p>
        <p>Address: 123 Main Street, City, Country</p>
      </section>

      {/* Footer section */}
      <footer style={{
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '50px 0'
      }}>
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
