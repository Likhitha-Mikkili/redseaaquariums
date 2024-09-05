const express = require('express');
const router = express.Router();
const { getAllOrders, updateOrderStatus, markCODPaid  } = require('../controllers/adminController');
const { admin, protect } = require('../middleware/authMiddleware');
// GET all orders
router.get('/orders', protect, admin, getAllOrders);

// Route to update order status
router.route('/orders/:id/status').put(protect, admin, updateOrderStatus);

// Route to mark COD order as paid
router.route('/orders/:id/cod-paid').put(protect, admin, markCODPaid);

module.exports = router;

