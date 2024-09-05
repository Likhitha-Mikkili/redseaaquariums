import React, { useState } from 'react';

const PaymentMethodSelector = ({ onPaymentMethodSelect }) => {
    const [selectedMethod, setSelectedMethod] = useState('Stripe');

    const handleMethodChange = (e) => {
        setSelectedMethod(e.target.value);
        onPaymentMethodSelect(e.target.value);
    };

    return (
        <div className="payment-method-selector">
            <h3>Select Payment Method</h3>
            <label>
                <input
                    type="radio"
                    value="Stripe"
                    checked={selectedMethod === 'Stripe'}
                    onChange={handleMethodChange}
                />
                Credit/Debit Card (Stripe)
            </label>
            <label>
                <input
                    type="radio"
                    value="PhonePe"
                    checked={selectedMethod === 'PhonePe'}
                    onChange={handleMethodChange}
                />
                PhonePe
            </label>
            <label>
                <input
                    type="radio"
                    value="GPay"
                    checked={selectedMethod === 'GPay'}
                    onChange={handleMethodChange}
                />
                Google Pay
            </label>
            <label>
                <input
                    type="radio"
                    value="COD"
                    checked={selectedMethod === 'COD'}
                    onChange={handleMethodChange}
                />
                Cash on Delivery
            </label>
        </div>
    );
};

export default PaymentMethodSelector;
