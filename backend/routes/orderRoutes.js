const express = require('express');
const router = express.Router();
const {
  createOrder,
  updateOrderToPaid,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  markOrderAsCODPaid,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, createOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/admin/orders').get(protect, admin, getAllOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/status').put(protect, admin, updateOrderStatus);
router.route('/:id/cod-paid').put(protect, admin, markOrderAsCODPaid);

module.exports = router;
