const { Router } = require('express');
const orderController = require('../controllers/order.controller');
const authController = require('../controllers/auth.controller');

const router = Router();

// router.get('/', authController.protect, orderController.getAllOrders)



router.post('/', authController.protect, orderController.createPendingOrder);
router.put('/:id', authController.protect, orderController.updateOrderRecycler);
router.delete('/:id', authController.protect, orderController.deleteOrderRecycler);

module.exports = router;