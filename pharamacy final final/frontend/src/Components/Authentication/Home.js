import React from 'react';
import heroImage from './heroImage.jpg';
import heroImage2 from './heroImage2.jpg';
import explore from './explore.png';
import logo from './logo1.jpeg';
import delivery from './delivery.jpg';
import aicon from './aicon.png';
import dicon from './dicon.png';
import sicon from './sicon.png';
import oShop from './oShop.jpg';
import feed from './feed.jpg';
import bc112 from './bc112.jpg';
import arrow from './arrow.gif';
import '../../pages/Product/Medicine.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import specific Swiper styles
import 'swiper/css/pagination'; // Import specific Swiper styles
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (route) => {
    navigate(route);
  };

  return (
    <div>
      <br /><br />
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
            style={{ height: '600px', width: '100%', objectFit: 'cover', backgroundColor: '#f0f0f0', opacity: '0.6' }}
            alt="Hero Image"
          />
          <div className='text'
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'black', zIndex: 1, fontFamily: 'sans-serif' }}
          >
            <img src={logo} style={{ height: '200px', width: '180px' }} />
            <h1 style={{ color: 'rgb(64, 50, 17)', fontWeight: 'bold' }}>MEET YOUR ONLINE PHARMACY <span style={{ color: 'black', fontSize: '60px', fontWeight: 'bolder' }}>HealthFirst</span></h1>
            <p style={{ color: 'black' }}>Medicine at your Door</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={explore}
            alt=""
            style={{ height: '600px', width: '100%', objectFit: 'fill', backgroundColor: '#f0f0f0' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={delivery}
            style={{ height: '600px', width: '100%', objectFit: 'cover', backgroundColor: '#f0f0f0' }}
            alt="Hero Image"
          />
          <div className='text'
            style={{ padding: '10%', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: '50%', left: '25%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'black', zIndex: 1, fontFamily: 'sans-serif' }}
          >
            <h1 style={{ color: 'rgb(204, 184, 142)', fontSize: '55px', fontWeight: 'bold' }}>RELIABLE ON TIME <br />HOME DELIVERY </h1><br />
            <p style={{ color: 'white', fontSize: '25px', fontWeight: 'bolder' }}>OUR IN-HOUSE PHARMACIST ENSURE<br /> YOUR MEDICINE REACH
              YOU<br /> WHEN YOU NEED THEM.
            </p><br />
            <p><button className='searchbtn1' style={{ borderRadius: '20px', fontSize: '25px', padding: '0px 30px', height: '50px' }}
              onClick={() => handleCategoryClick('/medicine')}>
              Discover your medicine needs </button> </p>
          </div>
        </SwiperSlide>
      </Swiper>
      <div style={{ padding: '20px 0px', paddingBottom: '20px', alignItems: 'center', margin: '10px' }}>
        <Box sx={{ width: '100%', height: 250, textAlign:'center', }}>
          <ImageList variant="masonry" cols={3} gap={10} className='ilist'>
            <ImageListItem>
              <div style={{ fontWeight: 'bold', padding: '0 40px', textAlign: 'center' }}>
                <img className="imgccs1" style={{ height: '100px', width: '100px' }} src={dicon} />
                <ImageListItemBar position="below" title="Same-Day Delivery" />
                <p style={{ textAlign: 'justify' }}>
                  Get your medications and health products delivered to your doorstep within hours.
                  Fast, reliable, and convenient service to meet your urgent needs.
                </p><br />
              </div>
            </ImageListItem>
            <ImageListItem>
              <div style={{ fontWeight: 'bold', padding: '0 20px', textAlign: 'center' }}>
                <img className="imgccs1" style={{ height: '100px', width: '100px' }} src={aicon} />
                <ImageListItemBar position="below" title="Refund Guarantee" />
                <p style={{ textAlign: 'justify' }}>
                  Shop with confidence. If you're not satisfied, we offer a hassle-free refund on all purchases.
                </p>
              </div>
            </ImageListItem>
            <ImageListItem>
              <div style={{ fontWeight: 'bold', padding: '0 40px', textAlign: 'center' }}>
                <img className="imgccs1" style={{ height: '100px', width: '100px' }} src={sicon} />
                <ImageListItemBar position="below" title="Pharmacy Support" />
                <p style={{ textAlign: 'justify' }}>
                  Our expert pharmacists are here to help with any questions or concerns. Get professional advice and personalized care.
                </p>
              </div>
            </ImageListItem>
          </ImageList>
        </Box>
      </div>
      <br></br><br></br>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ width: '50%', position: 'relative' }}>
          <img
            src={oShop}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: '30%', left: '30%', textAlign: 'center' }}>
            <h1>Why Hesitate?</h1> <br />
            <button className='searchbtn1' style={{ borderRadius: '20px', fontSize: '25px', padding: '0px 30px', height: '50px' }}
              onClick={() => handleCategoryClick('/medicine')}>
              Shop now
            </button>
          </div>
        </div>
        <div style={{ width: '50%', position: 'relative' }}>
          <img
            src={feed}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            height: '50%',
            background: 'rgba(255, 255, 255, 0.6)',  // Light color with transparency
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <h1>Your ideas matter<br /></h1>
            <h3>Help us to improve our services by simply<br /> giving a feedback</h3>
            <img
              src={arrow}
              style={{ width: '10%', height: 'auto', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => handleCategoryClick('/medicine')}
            />
          </div>
        </div>
      </div>

      {/* About Us section */}
      <section style={{ height: 'auto', position: 'relative', textAlign: 'center', margin: '20px 0' }}>
        <img
          src={bc112}
          style={{ width: '100%', height: 'auto', objectFit: 'cover', opacity: '0.5' }}
        />
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', color: 'black', padding: '50px', boxSizing: 'border-box' }}>
          <h2>About Us</h2>
          <hr style={{ width: '50%', margin: '20px auto', borderColor: '#000' }} />
          <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', fontSize: '1.1em', color: 'black', fontWeight: 'normal' }}>
            Central Pharmacy: Your Trusted Health Partner Since 2001<br />
            Welcome to Central Pharmacy, a cornerstone of healthcare in the heart of Pokunuwita since 2001. As a proud franchise of the Osu Sala network under the State Pharmaceuticals Corporation (SPC) of Sri Lanka, we are committed to providing our community with high-quality, affordable healthcare solutions.
            <br /><br /><strong>Our Journey</strong><br />
            Founded over two decades ago, Central Pharmacy has grown into a trusted name in the region, known for its dedication to customer care and pharmaceutical excellence. Our location in Pokunuwita serves as a hub where health and well-being are our top priorities.
            <br /><br /><strong>Our Services</strong><br />
            At Central Pharmacy, we offer a comprehensive range of services designed to meet all your health needs:
            <br />- Prescription Medication Services: Our knowledgeable pharmacists ensure that you receive the correct medications and provide expert advice on their use.
            <br />- Over-the-Counter Medication Services: We stock a wide variety of over-the-counter medicines and health products to address everyday health concerns.
            <br />- Delivery Services: For your convenience, we offer prompt and reliable delivery services, bringing your medications and health products right to your doorstep.
            <br /><br />As part of the SPC's Osu Sala network, we uphold the highest standards of quality and service, ensuring that every customer receives the best care possible.
            <br /><br />Thank you for choosing Central Pharmacy. We are here to support your health and wellness journey every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Us section */}
      <section style={{ height: '500px', backgroundColor: '#f0f0f0', textAlign: 'center', paddingTop: '200px', margin: '20px 0' }}>
        <h2>Contact Us</h2>
        <p>Email: info@example.com</p>
        <p>Phone: 123-456-7890</p>
        <p>Address: 123 Main Street, City, Country</p>
      </section>

      {/* Footer section */}
      <footer style={{
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        textAlign: 'center',
        padding: '50px 0',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1 1 300px', margin: '20px' }}>
          <h2 style={{
            borderBottom: '2px solid #ecf0f1',
            display: 'inline-block',
            paddingBottom: '10px',
            color: '#f39c12'
          }}>Our Pharmacy</h2>
          <p>Central Pharmacy is committed to providing high-quality healthcare solutions. Trusted by the community since 2001.</p>
        </div>
        <div style={{ flex: '1 1 300px', margin: '20px' }}>
          <h2 style={{
            borderBottom: '2px solid #ecf0f1',
            display: 'inline-block',
            paddingBottom: '10px',
            color: '#f39c12'
          }}>Follow Us</h2>
          <div>
            <a href="#facebook" style={{
              color: '#ecf0f1',
              margin: '0 10px',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }} onMouseOver={(e) => e.target.style.color = '#f39c12'}
              onMouseOut={(e) => e.target.style.color = '#ecf0f1'}>Facebook</a>
            <a href="#twitter" style={{
              color: '#ecf0f1',
              margin: '0 10px',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }} onMouseOver={(e) => e.target.style.color = '#f39c12'}
              onMouseOut={(e) => e.target.style.color = '#ecf0f1'}>Twitter</a>
            <a href="#instagram" style={{
              color: '#ecf0f1',
              margin: '0 10px',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }} onMouseOver={(e) => e.target.style.color = '#f39c12'}
              onMouseOut={(e) => e.target.style.color = '#ecf0f1'}>Instagram</a>
          </div>
        </div>
        <div style={{ flex: '1 1 300px', margin: '20px' }}>
          <h2 style={{
            borderBottom: '2px solid #ecf0f1',
            display: 'inline-block',
            paddingBottom: '10px',
            color: '#f39c12'
          }}>Contact Us</h2>
          <p>Email: <a href="mailto:info@centralpharmacy.lk" style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#f39c12'} onMouseOut={(e) => e.target.style.color = '#ecf0f1'}>info@centralpharmacy.lk</a></p>
          <p>Phone: <a href="tel:+94123456789" style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#f39c12'} onMouseOut={(e) => e.target.style.color = '#ecf0f1'}>+94 123 456 789</a></p>
          <p>Address: 123 Main Street, Pokunuwita, Sri Lanka</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
