const axios = require('axios');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process payment through Stripe
const processStripePayment = async (paymentDetails) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: paymentDetails.amount,
        currency: 'inr',
        payment_method: paymentDetails.paymentMethodId,
        confirmation_method: 'manual',
        confirm: true,
    });
    return paymentIntent;
};

// Process payment through PhonePe
const processPhonePePayment = async (paymentDetails) => {
    // Placeholder for PhonePe API request
    const response = await axios.post(
        'https://api.phonepe.com/transaction/v3/process',
        {
            merchantId: process.env.PHONEPE_MERCHANT_ID,
            ...paymentDetails,
        }
    );
    return response.data;
};

// Process payment through GPay
const processGPayPayment = async (paymentDetails) => {
    // Placeholder for GPay API request
    const response = await axios.post(
        'https://api.gpay.com/transaction/v3/process',
        {
            merchantId: process.env.GPAY_MERCHANT_ID,
            ...paymentDetails,
        }
    );
    return response.data;
};

// Validate COD availability
const validateCOD = (city) => {
    const availableCities = ['Guntur', 'Vijayawada'];
    return availableCities.includes(city);
  };

module.exports = {
    processStripePayment,
    processPhonePePayment,
    processGPayPayment,
    validateCOD,
};
