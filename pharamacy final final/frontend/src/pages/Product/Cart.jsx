import React from "react";
import { useShoppingCartStore } from "./ShoppingCart";
import Toast from "../../utils/Toast";
import {warningMessage1, warningMessage2} from "../../utils/Alert"

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, resetCart } =
    useShoppingCartStore();

  const handleQuantityChange = (itemId, quantity) => {
  //if quantity is less than 1, set it to 1
    quantity = Math.max(1, quantity);
    updateItemQuantity(itemId, quantity);
  };
  //remove from cart
  const handleRemoveFromCart = (itemId) => {
    warningMessage1(
      "Are you sure ?", "Once confirmed the selected item will no longer be available in your cart!",
      () => {
        removeFromCart(itemId);
      Toast({ type: "success", message: "Item removed from cart" });
      }
    )
  };
  //reset the cart
  const handleResetCart = () => {
    warningMessage2(
      "Are you sure ?", "Once confirmed all items in the cart will be removed!",
      () => {
        resetCart();
        Toast({ type: "success", message: "Cart is resetted" });
      }
    )
  };

  return (
    <><br/><br/>
<div className="bannerbc12" style={{ position: 'relative', height: '200px', width: '100%' }}>
  <img
    src={require('../Product/Images/pexels-rdne-5637739.jpg')}
    alt="Background"
    className="bannerimg1"
    style={{ height: '100%', objectFit: 'cover', width: '100%' }}
  />
  <div style={{ 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    zIndex: '1' 
  }}></div>
  <div className="bannertextc12" style={{ 
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
    zIndex: '2' 
  }}>
    <h1 style={{ color: 'rgb(71, 97, 48)', padding: '10px' }}>
    "Make health a Priority"</h1>
  </div>
</div>


      <div className="mt-3">
        <h2 className="mb-3">Shopping Cart ({cartItems.length})</h2>
        {cartItems.length > 0 ? (
          <>
          <div style={{alignItems:'center',padding:'0px 60px'}}>
            <table style={{ width: "100%",}} className="table table-bordered">
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
                        style={{padding:'7px 20px', borderRadius:'10px'}}
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
                <button className="btn btn-secondary" onClick={handleResetCart}
                style={{padding:'7px 20px', borderRadius:'10px'}}>
                  <h6>Reset Cart</h6>
                </button>
                <a href="/checkout" className="btn btn-warning ms-2"style={{padding:'7px 20px', borderRadius:'10px'}} >
                <h6>Checkout</h6>
                </a>
              </div>
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
