import React from 'react';
import heroImage from './heroImage.jpg';
import heroImage2 from './heroImage2.jpg';
import explore from './explore1.png';
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
            <br></br><br></br>
            <h1 style={{ color: '#164A41', fontWeight: 'bold' }}>MEET YOUR ONLINE PHARMACY <span style={{ color: 'black', fontSize: '60px', fontWeight: 'bolder' }}>HealthFirst</span></h1>
            <p style={{ color: 'black' }}>Medicine at your Door</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <img
            src={explore}
            style={{ height: '600px', width: '100%', objectFit: 'cover', backgroundColor: '#f0f0f0', opacity: '0.6' }}
            alt="Hero Image"
          />
          <div className='text'
            style={{ position: 'absolute', top: '50%', left: '80%', transform: 'translate(-50%, -50%)', textAlign: 'LEFT', color: 'black', zIndex: 1, fontFamily: 'Poppins,sans-serif' }}
          >
            <h1 style={{ color: '#164A41', fontWeight: 'bold',fontSize:'40PX'}}>DISCOVER YOUR ALL MEDICINE NEEDS IN ONE PLACE</h1><br/>
            <p style={{ color: '#164A41', fontWeight: 'bolder',fontSize:'25PX' }}>EFFORTLESSLY ACCESS AND MANAGE YOUR MEDICATIONS WITH OUR COMPREHENSIVE SYSTEM</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={delivery}
            style={{ height: '600px', width: '100%', objectFit: 'cover', backgroundColor: '#f0f0f0' }}
            alt="Hero Image"
          />
          <div className='text'
            style={{ padding: '10%', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: '50%', left: '25%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'black', zIndex: 1, fontFamily: 'Poppins,sans-serif' }}
          >
            <h1 style={{ color: '#9DC88D', fontSize: '55px', fontWeight: 'bold' }}>RELIABLE ON TIME <br />HOME DELIVERY </h1><br />
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
          <div style={{ position: 'absolute', top: '30%', left: '30%', textAlign: 'center',fontFamily: 'sans-serif' }}>
            <h1><b>Why Hesitate?</b></h1> <br />
            <button className='searchbtn1' style={{ borderRadius: '20px', fontSize: '25px', padding: '0px 30px', height: '50px',fontFamily: 'sans-serif' }}
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
            textAlign: 'center',
            fontFamily: 'sans-serif'

          }}>
            <h1><b>Your ideas matter</b><br /></h1>
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
      {/* Footer section */}
      <footer style={{
  backgroundColor: '#394b3b', // Dark green background
  color: '#ecf0f1', // Light text color
  textAlign: 'center',
  padding: '50px 0',
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap'
}}>
  <div style={{ flex: '1 1 300px', margin: '20px' }}>
    <h3 style={{
      borderBottom: '2px solid #ecf0f1',
      display: 'inline-block',
      paddingBottom: '10px',
      color: '#8FCB81' // Brighter green for the headings
    }}><b>Our Pharmacy</b></h3>
    <p><small>Central Pharmacy is committed to providing high-quality healthcare solutions. Trusted by the community since 2001.</small></p>
  </div>
  <div style={{ flex: '1 1 300px', margin: '20px' }}>
    <h3 style={{
      borderBottom: '2px solid #ecf0f1',
      display: 'inline-block',
      paddingBottom: '10px',
      color: '#8FCB81' // Brighter green for the headings
    }}><b>Follow Us</b></h3>
    <div>
      <a href="#facebook" style={{
        color: '#ecf0f1',
        margin: '0 10px',
        textDecoration: 'none',
        transition: 'color 0.3s'
      }} onMouseOver={(e) => e.target.style.color = '#8FCB81'} // Brighter green on hover
        onMouseOut={(e) => e.target.style.color = '#ecf0f1'}><small>Facebook</small></a>
      <a href="#twitter" style={{
        color: '#ecf0f1',
        margin: '0 10px',
        textDecoration: 'none',
        transition: 'color 0.3s'
      }} onMouseOver={(e) => e.target.style.color = '#8FCB81'} // Brighter green on hover
        onMouseOut={(e) => e.target.style.color = '#ecf0f1'}><small>Twitter</small></a>
      <a href="#instagram" style={{
        color: '#ecf0f1',
        margin: '0 10px',
        textDecoration: 'none',
        transition: 'color 0.3s'
      }} onMouseOver={(e) => e.target.style.color = '#8FCB81'} // Brighter green on hover
        onMouseOut={(e) => e.target.style.color = '#ecf0f1'}><small>Instagram</small></a>
    </div>
  </div>
  <div style={{ flex: '1 1 300px', margin: '20px' }}>
    <h3 style={{
      borderBottom: '2px solid #ecf0f1',
      display: 'inline-block',
      paddingBottom: '10px',
      color: '#8FCB81' // Brighter green for the headings
    }}><b>Contact Us</b></h3>
    <p><small>Email: <a href="mailto:info@centralpharmacy.lk" style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#8FCB81'} onMouseOut={(e) => e.target.style.color = '#ecf0f1'}>info@centralpharmacy.lk</a></small></p>
    <p><small>Phone: <a href="tel:+94123456789" style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#8FCB81'} onMouseOut={(e) => e.target.style.color = '#ecf0f1'}>+94 123 456 789</a></small></p>
    <p><small>Address: 123 Main Street, Pokunuwita, Sri Lanka</small></p>
  </div>
</footer>

    </div>
  );
}

export default Home;
