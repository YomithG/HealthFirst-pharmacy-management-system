import { useState } from "react";
import { useShoppingCartStore } from "../../pages/Product/ShoppingCart";
import "./ProductDetails.css";
import Toast from "../../utils/Toast";
const ItemDetails = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  //
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
      <h4>{item.title}</h4>
      <img src={item.image} alt={item.title} />
      <p className="p123">
        {item.description}
      </p>
      <p className="p123"><h6>
        <strong>Category: </strong>
        {item.category}</h6>
      </p>
      <p className="p123"><h6>
        <strong>Price: Rs. </strong>
        {item.price}</h6>
      </p>
      <p className="p123"><h6>
        <strong>Stock: </strong>
        {item.countInStock}</h6>
      </p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{ width: "50px", marginRight: "10px" }}
        min="1"
        max={item?.countInStock}
      />
      <button onClick={handleAddToCart} disabled={item?.countInStock === 0}>
        Add to Cart
      </button>
    </div>
  );
};

export default ItemDetails;
