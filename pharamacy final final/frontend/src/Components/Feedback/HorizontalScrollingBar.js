import React, { useState } from 'react';
import './HorizontalScrollingBar.css';

const testimonials = [
  {
    text: "Very impressed and thankful for the amazing service provided by Care Pharmacy. In particular when you went the extra distance to check with all your branch pharmacies to source the meds I have not been able to source for a long time. This certainly puts you at the top of my favorite, goto online pharmacy service. Thank you!!!!",
    name: "- shaine Doe,  Colombo"
  },
  {
    text: "Excellent service in delivering medicines and many other health care products to doorstep. I purchased medicines as well as baby diapers. Medicines were delivered by themselves. You can get other products delivered through a courier service. All items were well packed and received in good condition.",
    name: "- Indika, Maharagama"
  },
  {
    text: "Excellent customer service. Udani and the pharmacy staff are always professional friendly and very helpful. Arrange my mother's medication deliver to her home. Very happy and highly recommend :)",
    name: "- Avinash, Colombo"
  },
  {
    text: "The medicine I wanted was not available in any pharmacy in Galle, so I searched online for a place to buy it. Although there are several online pharmacies, I noticed that the prices of this one are low compared to other pharmacies. I am happy to say that I received what I ordered within a few days, well packaged. I recommend anyone to buy the things you need from mycare.",
    name: "- Chamodi Thisaruwani, Galle"
  },
  {
    text: "Great service and fast delivery. The medicines were packed securely and arrived in good condition. I will definitely order again.",
    name: "- Jane Smith, Nugegoda"
  },
  {
    text: "Amazing experience! The customer support was very responsive and helped me find the exact product I needed. Highly recommend!",
    name: "- Mike Johnson, Chicago"
  }
];

const HorizontalScrollingBar = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === Math.ceil(testimonials.length / 3) - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Math.ceil(testimonials.length / 3) - 1 : prev - 1));
  };

  return (
    <div className="horizontal-scrolling-bar">
      <h1><b>What are people saying?</b></h1>
      <br></br>
      <div className="scroll-wrapper">
        <button className="scroll-button" onClick={prevSlide}>&#9664;</button>
        <div className="scroll-container">
          {testimonials.slice(currentSlide * 3, currentSlide * 3 + 3).map((testimonial, index) => (
            <div className="scroll-item" key={index}>
              <div className="quotation-marks">“</div>
              <h3>{testimonial.text}</h3>
              <div className="quotation-marks">”</div>
              <p className="testimonial-name">{testimonial.name}</p>
            </div>
          ))}
        </div>
        <button className="scroll-button" onClick={nextSlide}>&#9654;</button>
      </div>
      <div className="dots-container">
        {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
          <span key={index} className={`dot ${currentSlide === index ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></span>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollingBar;
