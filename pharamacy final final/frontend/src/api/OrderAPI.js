import api from "./api";

class OrderAPI {
  // Create Order
  static create(values) {
    return api.post("http://localhost:8070/api/delivery_details", values);
  }
}

export default OrderAPI;
