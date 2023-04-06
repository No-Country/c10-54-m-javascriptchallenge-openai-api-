const { Router } = require('express');
const orderController = require('../controllers/order.controller');
const authController = require('../controllers/auth.controller');

const router = Router();
// Routes

router.post('/', authController.protect, orderController.createPendingOrder);
router.put('/:id', authController.protect, orderController.updateOrderRecycler);
router.delete(
  '/:id',
  authController.protect,
  orderController.deleteOrderRecycler
);

//Un recolector puede atender una orden (/api/v1/orders/:id) put (actualizar status de orden: asignado)
router.put('/:id/assign', authController.protect, orderController.assignOrder);

// //Un recolector puede descartar una orden (/api/v1/orders/:id) put (actualizar status de orden: pendiente)
router.put(
  '/:id/unassign',
  authController.protect,
  orderController.unassignOrder
);

// //Un recolector puede finalizar una orden (/api/v1/orders/:id) put (actualizar status de orden: entregado)
router.put('/:id/close', authController.protect, orderController.closeOrder);

// //Un reciclador puede eliminar una orden (/api/v1/orders/:id) delete
router.delete('/:id', authController.protect, orderController.deleteOrder);

module.exports = router;
