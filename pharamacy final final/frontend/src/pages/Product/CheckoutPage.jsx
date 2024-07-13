import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import OrderAPI from "../../api/OrderAPI";
import { useShoppingCartStore } from "../../pages/Product/ShoppingCart";
import { errorMessage, successMessage } from "../../utils/Alert";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, resetCart } = useShoppingCartStore();

  // calculate total price of the cart items with quantity
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const redirectToDashboard = () => {
    navigate("/delivery-page");
  };

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate: createOrder } = useMutation({
    mutationFn: OrderAPI.create,
    onSuccess: () => {
      successMessage("Success", "Order created successfully");
    },
    onError: (error) => {
      errorMessage("Error", error.message);
    },
  });

  // can only enter 10 numbers
  const contactNoRegExp = /^\d{10}$/;

  // Submit function
  const onSubmit = (values) => {
    const orderData = {
      // customer: "", // Add currently logged in user id
      name: values.name,
      address: values.address,
      city: values.city,
      contactNo: Number(values.contactNo), // Convert to number 
      totalPrice: totalPrice,
      orderItems: cartItems.map((item) => ({
        product: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    // if payment is successful, create order
    createOrder(orderData);
    reset();
    resetCart();
    redirectToDashboard();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
      <div style={{ width: '45%',position:'relative' }}>
        <img
          src={require('../Product/Images/pexels-norma-mortenson-4393517.jpg')}
          alt="Side Image"
          style={{ width: '100%', height: 'auto', objectFit: 'cover',opacity:'0.4' }}
        />
        <div style={{position:'absolute', top:'45%',left:'20%'}} >
        <h1 style={{fontSize:'60px'}}>
          Secure Delivery</h1>
          <h3 style={{fontSize:'30px'}}> to Your DoorStep</h3>
        </div>
      </div>
      <div style={{ width: '50%', paddingRight:'30px'}}>
        <h2>Checkout</h2><br/>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          style={{ width: "100%",fontSize:'20px' }}
        >
          {/* Name */}
          <div className="form-group">
            <label className="my-2" htmlFor="name">
              Name
            </label>
            <input
              placeholder="Name"
              type="text"
              className="form-control"
              id="name"
              name="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <small className="form-text text-danger">Name is required</small>
            )}
          </div>

          <div className="form-group">
            <label className="my-2" htmlFor="address">
              Shipping Address
            </label>
            <input
              placeholder="Enter your shipping address"
              type="text"
              className="form-control"
              id="address"
              name="address"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <small className="form-text text-danger">
                Shipping Address is required
              </small>
            )}
          </div>
          
          <div className="form-group">
            <label className="my-2" htmlFor="city">
              City
            </label>
            <select
              className="form-select"
              id="city"
              name="city"
              {...register("city", { required: true })}
            >
              <option value="">Select a city</option>
              <option value="Malabe">Malabe</option>
              <option value="Kaduwela">Kaduwela</option>
              <option value="Koswaththa">Koswaththa</option>
            </select>
            {errors.city && (
              <small className="form-text text-danger">City is required</small>
            )}
          </div>

          {/* ContactNo */}
          <div className="form-group">
            <label className="my-2" htmlFor="contactNo">
              Contact Number
            </label>
            <input
              placeholder="Contact Number"
              type="text" // Change type to text to allow leading zeros
              className={`form-control ${errors.contactNo ? "is-invalid" : ""}`}
              id="contactNo"
              name="contactNo"
              {...register("contactNo", {
                required: "Contact Number is required",
                pattern: {
                  value: contactNoRegExp, //validation function 43 line
                  message: "Please enter a valid 10-digit contact number"
                }
              })}
            />
            {errors.contactNo && (
              <div className="invalid-feedback">{errors.contactNo.message}</div>
            )}
          </div>

          {/* Total Price */}
          <div className="mt-4">
            <h4>Total Price: Rs.{totalPrice}</h4>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
