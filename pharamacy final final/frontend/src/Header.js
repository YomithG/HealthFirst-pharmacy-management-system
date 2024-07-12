import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCartStore } from "./pages/Product/ShoppingCart";


const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const { cartItems } = useShoppingCartStore();
  const handleHover = () => {
    setExpanded(true);
  };

  const handleLeave = () => {
    setExpanded(false);
  };

  return (
    <div className='' style={{ width: '100%', zIndex: '100', top: '0',position:'fixed' }}>
      {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light" >
        <Link className="navbar-brand" to="/" style={{ marginLeft: '20px' }}>
          HealthFirst
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav" style={{ marginRight: '0' }}>
          <ul className="navbar-nav">
            <li className="nav-item" style={{ marginRight: '40px' }}>
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item" style={{ marginRight: '40px' }}>
              <a className="nav-link" href="/Aboutus">About Us</a>
            </li>
           
            <li className="nav-item" style={{ marginRight: '40px' }}>
              <a className="nav-link" href="/feedbacks">Feedbacks</a>
            </li>
            <li className="nav-item" style={{ marginRight: '40px' }}>
              <a className="nav-link" href="/add-complaint">Contact Us</a>
            </li>
            <li className="nav-item" style={{ marginRight: '40px' }}>
              <a className="nav-link" href="/medicine">Medicine</a>
            </li>
            <li className="nav-item" style={{ marginRight: '40px' }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
              <span className="nav-link">Login</span>
              {expanded && (
                <div className="dropdown-content">
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/add-customer" className="nav-link">Registration</Link>
                </div>
              )}
            </li>
            
            <li className="nav-item" style={{ marginRight: '0px' }}>
              <Link to="/cart">
                <div className="cartContainer">
                  <div className="cartContent">
                    
                    <img
                      src="https://www.freeiconspng.com/uploads/cart-icon-14.png"
                      alt=""
                      className="cart m-0 p-0"
                    />
                  
                  </div>
                  <div className="cartCountContainer">
                    <p className="cart_count">{cartItems.length}</p>
                  </div>
                </div>
              </Link>
            </li>
            <li className="nav-item" style={{ marginRight: '0px' }}>
              <Link to="/admin" className="nav-link">Admin</Link>
            </li>
            
          </ul>
        </div>
      </nav>
    </div>
    
  );
};

export default Header;
