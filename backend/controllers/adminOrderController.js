const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
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

// @desc    Mark COD order as paid
// @route   PUT /api/admin/orders/:id/cod-paid
// @access  Private/Admin
const markCODPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.paymentMethod !== 'COD') {
    res.status(400);
    throw new Error('Order is not a COD order');
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

module.exports = {
  getAllOrders,
  updateOrderStatus,
  markCODPaid,
};
