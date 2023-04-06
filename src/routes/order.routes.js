const { Router } = require('express');
const orderController = require('../controllers/order.controller');
const authController = require('../controllers/auth.controller');

const router = Router();
// Routes

//////////////////////////////////////////////////////////////////////////////////////
// Recycler
// View active orders (pending)
// View closed orders (history)
// Create order
router.post('/', authController.protect, orderController.createOrder);
// Update order
router.put('/:id', authController.protect, orderController.updateOrder);
// Delete order
router.delete('/:id', authController.protect, orderController.deleteOrder);

//////////////////////////////////////////////////////////////////////////////////////
// Collector
// View available orders (pending)
// View attending orders (assigned)
// View attended orders (closed)
// Attend an order
router.put('/:id/attend', authController.protect, orderController.attendOrder);
// Dismiss an order
router.put('/:id/dismiss', authController.protect, orderController.dismissOrder);
// Close an order
router.put('/:id/close', authController.protect, orderController.closeOrder);

module.exports = router;
