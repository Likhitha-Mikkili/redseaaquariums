const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  updateOrderStatus,
  markCODPaid,
} = require('../controllers/adminOrderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all orders
router.get('/orders', protect, admin, getAllOrders);

// Update order status
router.put('/orders/:id/status', protect, admin, updateOrderStatus);

// Mark COD orders as paid
router.put('/orders/:id/cod-paid', protect, admin, markCODPaid);

module.exports = router;
