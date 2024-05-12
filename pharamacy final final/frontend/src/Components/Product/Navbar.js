import { Link } from "react-router-dom";
import "./Navbar.css";
import { useShoppingCartStore } from "../../pages/Product/ShoppingCart";

const Navbar = () => {
  const { cartItems } = useShoppingCartStore();
  
  return (
    <header className="container1">
      <div className="logo">
        <Link to="/"> {/* Link to the home page */}
          <img src="" alt="" />
        </Link>
      </div>

      <div className="buttonsContainer">
        <Link to="/">
          <button className="navButton">Home</button>
        </Link>
        <Link to="/delivery-page">
          <button className="navButton">Order/Delivery<br/>Details</button>
        </Link>
        
      </div>
    </header>
  );
};

export default Navbar;
