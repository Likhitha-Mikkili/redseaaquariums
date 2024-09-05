// redsea/backend/controllers/adminController.js

const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name email');
  res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Mark COD order as paid
// @route   PUT /api/admin/orders/:id/cod-paid
// @access  Admin
const markCODPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.paymentMethod === 'COD' && !order.isPaid) {
      order.isPaid = true;
      order.paidAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(400);
      throw new Error('Order is already paid or not a COD order');
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

module.exports = {
  getAllOrders,
  updateOrderStatus,
  markCODPaid,
};
