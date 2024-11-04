import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const [paymentInfo, setPaymentInfo] = useState({
        name: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        const isPaymentSuccessful = Math.random() > 0.5;
        if (isPaymentSuccessful) {
            navigate('/payment-success');
        } else {
            navigate('/payment-failure');
        }
    };

    return (
        <div className="checkout">
            <h2>Checkout Page</h2>
            <form>
                <input type="text" placeholder="Name" onChange={(e) => setPaymentInfo({ ...paymentInfo, name: e.target.value })} />
                <input type="text" placeholder="Card Number" onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })} />
                <input type="text" placeholder="Expiry" onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })} />
                <input type="text" placeholder="CVV" onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })} />
            </form>
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};

export default CheckoutPage;
