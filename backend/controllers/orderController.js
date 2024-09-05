const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const {
  processStripePayment,
  processPhonePePayment,
  processGPayPayment,
  validateCOD,
} = require('../utils/paymentGateway');

const getAllOrders = async (req, res) => {
  try {
      const orders = await Order.find().populate('user', 'name email');
      res.json(orders);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Order confirmation function
const confirmOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isConfirmed = true;
  order.confirmedAt = Date.now();

  // Notification logic (this is a placeholder, you might need to implement an actual notification system)
  const notificationMessage = `Your order with ID: ${order._id} has been confirmed!`;

  // Send notification to user (you can integrate email/SMS services here)
  console.log(notificationMessage);

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = status;
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  const { sendEmailNotification } = require('../utils/notification');

// ... Inside confirmOrder function
await sendEmailNotification(order.user.email, 'Order Confirmed', notificationMessage);


  const { paymentMethod, paymentDetails, shippingAddress } = req.body;

  if (paymentMethod === 'Stripe') {
    const paymentIntent = await processStripePayment(paymentDetails);
    if (paymentIntent.status === 'succeeded') {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: paymentIntent.id,
        status: paymentIntent.status,
        update_time: paymentIntent.created,
        email_address: req.user.email,
      };
    }
  } else if (paymentMethod === 'PhonePe') {
    const paymentResponse = await processPhonePePayment(paymentDetails);
    if (paymentResponse.status === 'SUCCESS') {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: paymentResponse.transactionId,
        status: paymentResponse.status,
        update_time: Date.now(),
        email_address: req.user.email,
      };
    }
  } else if (paymentMethod === 'GPay') {
    const paymentResponse = await processGPayPayment(paymentDetails);
    if (paymentResponse.status === 'SUCCESS') {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: paymentResponse.transactionId,
        status: paymentResponse.status,
        update_time: Date.now(),
        email_address: req.user.email,
      };
    }
  } else if (paymentMethod === 'COD') {
    if (validateCOD(shippingAddress.city)) {
      order.isPaid = false; // COD orders are not marked as paid until delivery
      order.paymentResult = {
        status: 'COD',
      };
    } else {
      res.status(400);
      throw new Error('COD not available in your location');
    }
  } else {
    res.status(400);
    throw new Error('Invalid payment method');
  }

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

module.exports = {
  updateOrderToPaid,getAllOrders,confirmOrder,updateOrderStatus
};
