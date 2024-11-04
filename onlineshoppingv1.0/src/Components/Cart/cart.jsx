import React from 'react';
import { useCart } from '../../contexts/CartContext';
import './cart.css'; 

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
