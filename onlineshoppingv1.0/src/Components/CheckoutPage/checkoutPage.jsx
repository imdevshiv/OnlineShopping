import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const { state } = useLocation();
  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    phone: "",
  });
  const navigate = useNavigate();
  const product = state.product; // Get product details passed from Home

  const handlePlaceOrder = async () => {
    try {
      // Create order on your backend
      const orderResponse = await axios.post("http://localhost:5000/create-order", {
        amount: product.price * 1, // amount in paise (e.g., ₹50.00)
      });

      const { id: orderId, amount } = orderResponse.data;

      const options = {
        key: "rzp_test_1CoBUF9hME2aCU", // Your Razorpay key ID
        amount: amount,
        currency: "INR",
        name: "Your Company Name",
        description: product.title,
        order_id: orderId,
        handler: async function (response) {
          console.log("Payment successful!", response);

          // Verify payment on your backend
          try {
            const verifyResponse = await axios.post(
              "http://localhost:5000/verify-payment",
              {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
              }
            );

            console.log("Payment verification response:", verifyResponse.data);
            if (verifyResponse.data.status === "success") {
              navigate("/orders", {
                state: {
                  orderId: orderId,
                  paymentId: response.razorpay_payment_id,
                  products:product
                },
              });
            } else {
              console.error("Payment verification failed:", verifyResponse.data);
              navigate("/payment-failure");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            navigate("/payment-failure");
          }
        },
        prefill: {
          name: paymentInfo.name,
          contact: paymentInfo.phone,
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error placing order:", error);
      navigate("/payment-failure");
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout Page</h2>
      <form>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setPaymentInfo({ ...paymentInfo, name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          onChange={(e) =>
            setPaymentInfo({ ...paymentInfo, phone: e.target.value })
          }
          required
        />
      </form>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
