import React, { useState, useEffect } from 'react';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Stripe');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        const response = await fetch('/api/cart');
        const data = await response.json();
        setCartItems(data);
    };

    const handlePlaceOrder = async () => {
        setIsSubmitting(true);
        const order = {
            items: cartItems,
            address,
            paymentMethod
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            });
            if (response.ok) {
                alert('Order placed successfully');
                navigate('/order-confirmation');
            } else {
                alert('Error placing order');
            }
        } catch (error) {
            alert('Error placing order');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            <div className="order-summary">
                <h2>Order Summary</h2>
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id} className="order-item">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p className="price">₹{item.price}</p>
                                <p className="quantity">Quantity: {item.quantity}</p>
                                </div>
                        </li>
                    ))}
                </ul>
                <div className="total-price">
                    Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                </div>
            </div>
            <div className="checkout-form">
                <h2>Shipping Address</h2>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your shipping address"
                    rows="4"
                    required
                />
                <h2>Payment Method</h2>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="Stripe">Stripe</option>
                    <option value="PayPal">PayPal</option>
                </select>
                <button 
                    className="btn btn-primary" 
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
            </div>
        </div>
    );
};

export default Checkout;

                           
