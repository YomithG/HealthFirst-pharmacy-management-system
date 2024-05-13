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
  //remove from cart
  const handleRemoveFromCart = (itemId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(itemId);
      Toast({ type: "success", message: "Item removed from cart" });
    }
  };
  //reset the cart
  const handleResetCart = () => {
    if (window.confirm('Are you sure you want to reset your cart?')) {
      resetCart();
    }
  };

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

                  (total, item) => total + item?.price * item?.quantity, //calculate total price
                  0
                )}
              </h4>
              <div>
                <button className="btn btn-secondary" onClick={handleResetCart}>
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
