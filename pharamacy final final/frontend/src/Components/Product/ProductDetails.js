import { useState } from "react";
import { useShoppingCartStore } from "../../pages/Product/ShoppingCart";
import "./ProductDetails.css";
import Toast from "../../utils/Toast";
const ItemDetails = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const { addToCart } = useShoppingCartStore();
  //
  const handleAddToCart = () => {
    const itemToAdd = {
      ...item,
      quantity: Math.min(quantity, item?.countInStock),
    };
    addToCart(itemToAdd);
    Toast({ type: "success", message: "Added to cart" });
  };
  
  return (
    <div className="item-details">
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={item.countInStock === 0 ? "out-of-stock": ""}>
      {item.countInStock === 0 && (
        <div className="out-of-stock-label">Out of Stock </div>
      )}
      <h4>{item.title}</h4>
      <img src={item.image} alt={item.title} className="itemImg" />
      <p className="p123"><h6>
        <strong>Rs. </strong>
        {item.price}</h6>
      </p>
      </div>
      {isHovering && (
        <div>
          <p className="pc123"><h6>
        {item.category}</h6>
      </p>
          <p className="p123">
        {item.description}
      </p>
      
      <p className="p123"><h6>
        <strong>Items Available: </strong>
        {item.countInStock}</h6>
      </p>
        </div>
      )}
      
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{ width: "50px", marginRight: "10px" }}
        min="1"
        max={item?.countInStock}
      />
      <button onClick={handleAddToCart} 
      disabled={item?.countInStock === 0}
      className="btnAdd">
        Add to Cart
      </button>
    </div>
  );
};

export default ItemDetails;
