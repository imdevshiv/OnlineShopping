
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import './cart.css'; 

const Cart = () => {
    const { cart, dispatch } = useCart();

    const handleRemoveFromCart = (product) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                            <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
