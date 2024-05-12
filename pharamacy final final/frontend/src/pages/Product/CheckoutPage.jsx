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

  // credit card validation regex
//   const cardNumberRegex =
//     /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|2[2-7][0-9]{14}|3[47][0-9]{13}|65[0-9]{14}|6011[0-9]{12}|(644|645|646|647|648|649)[0-9]{13}|622(?:1[2-9]|[2-8][0-9]|9[01])[0-9]{10})$/;
//   const expiryDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
//   const cvvRegex = /^[0-9]{3}$/;

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

  // Submit function
  const onSubmit = (values) => {
    const orderData = {
      // customer: "", // Add currently logged in user id
      name: values.name,
      address: values.address,
      city: values.city,
      contactNo: Number(values.contactNo), // Convert to number explicitly
      totalPrice: totalPrice,
      orderItems: cartItems.map((item) => ({
        product: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    // if payment is successful, create the order
    createOrder(orderData);
    reset();
    resetCart();
    redirectToDashboard();
  };

  return (
    //   set max width to 1/2 of the screen
    <div className="mt-4 mb-4">
      <h2>Checkout</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        style={{ width: "50%", margin: "auto" }}
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
          {errors.name && (
            <small className="form-text text-danger">
              Shipping Address is required
            </small>
          )}
        </div>
        
          {/* city */}
        <div className="form-group">
          <label className="my-2" htmlFor="city">
            City
          </label>
          <input
            placeholder="City"
            type="text"
            className="form-control"
            id="city"
            name="city"
            {...register("city", { required: true })}
          />
          {errors.city && (
            <small className="form-text text-danger">City is required</small>
          )}
        </div>

          {/* ContactNo */}
        <div className="form-group">
          <label className="my-2" htmlFor="contactNo">
            Contact Nunmber
          </label>
          <input
            placeholder="Contact Number"
            type="number"
            className="form-control"
            id="contactNo"
            name="contactNo"
            {...register("contactNo", { required: true })}
          />
          {errors.contactNo && (
            <small className="form-text text-danger">Contact Number is required</small>
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
  );
};

export default CheckoutPage;