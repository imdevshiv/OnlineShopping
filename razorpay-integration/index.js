// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Initialize Razorpay instance with API keys from environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Your Razorpay key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Your Razorpay key secret
});

// Endpoint to create a Razorpay order
app.post('/create-order', async (req, res) => {
  const { amount } = req.body; // Get the amount from request body

  try {
    // Create an order with Razorpay
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise (1 INR = 100 paise)
      currency: 'INR', // Currency code
      receipt: `receipt_order_${Date.now()}`, // Generate a unique receipt ID
    });

    res.status(200).json(order); // Send the order details to the frontend
  } catch (error) {
    console.error("Error creating Razorpay order:", error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to create order' }); // Send error response
  }
});

// Endpoint to verify Razorpay payment
app.post('/verify-payment', async (req, res) => {
  const { payment_id, order_id, signature } = req.body; // Get payment details from request body

  // Construct the expected signature using HMAC
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(order_id + "|" + payment_id)
    .digest('hex');

  if (expectedSignature === signature) {
    // Payment verification successful
    res.json({ status: 'success' }); // Send success response
  } else {
    // Payment verification failed
    res.status(400).json({ status: 'failed' }); // Send failure response
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`); // Log server status
});
