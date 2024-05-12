//D:\Pasindi\SLIIT\Y2S2\ITP\express\frontend\src\pages\Cart.jsx
import React from "react";
import { useShoppingCartStore } from "./ShoppingCart";
import Toast from "../../utils/Toast";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, resetCart } =
    useShoppingCartStore();

  const handleQuantityChange = (itemId, quantity) => {
    // if quantity is less than 1, set it to 1
    quantity = Math.max(1, quantity);
    updateItemQuantity(itemId, quantity);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    Toast({ type: "success", message: "Item removed from cart" });
  };

// const handleCheckout = async (e) => {
//   e.preventDefault();

//   // Create an array of objects with only the necessary properties
//   const orderItems = cartItems.map(item => ({
//     item_id: item._id,
//     amount: item.price * item.quantity, // You might need to adjust this calculation based on your requirements
//     total: item.price * item.quantity  // You might need to adjust this calculation based on your requirements
//   }));

//   try {
//     const response = await fetch('/api/order', {
//       method: 'POST',
//       body: JSON.stringify(orderItems),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       const json = await response.json();
//       throw new Error(json.error);
//     }

//     const newCartItems = await response.json();
//     Toast({ type: "success", message: "Checkout successful" });
//     resetCart();

//   } catch (error) {
//     Toast({ type: "error", message: error.message });
//   }
// };

  


  return (
    <>
      <div className="mt-3">
        <h2 className="mb-3">Shopping Cart</h2>
        {cartItems.length > 0 ? (
          <>
            <table style={{ width: "100%" }} className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item?._id} className="align-middle">
                    <td className="d-flex align-items-center gap-3">
                      <img
                        src={item?.image}
                        alt={item?.title}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                      {item?.title}
                    </td>
                    <td>Rs.{item?.price}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ width: "80px" }}
                        value={item?.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item?._id, e.target.value)
                        }
                        min="1"
                        max={item?.countInStock}
                      />
                    </td>
                    <td>Rs.{item?.price * item?.quantity}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveFromCart(item?._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 className=" text-end">
                Total: Rs.
                {cartItems.reduce(
                  (total, item) => total + item?.price * item?.quantity,
                  0
                )}
              </h4>
              <div>
                <button className="btn btn-secondary" onClick={resetCart}>
                  Reset Cart
                </button>
                <a href="/checkout" className="btn btn-warning ms-2" >
                  Checkout
                </a>
              </div>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
