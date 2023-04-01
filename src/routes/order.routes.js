const { Router } = require('express');

const router = Router();

const authController = require("../controllers/auth.controller"); // Importa la función de autenticación de token

const orderController = require("../controllers/order.controller");

// Routes

//Un reciclador puede ver todas sus ordenes (/api/v1/orders) get (obtener user_id del token del login)
//Un recolector puede ver todas sus órdenes atendidas y asignadas (/api/v1/orders) get (obtener user_id del token del login)
router.get('/', authController, orderController.myOrders);

//Un recolector puede ver todas las órdenes pendientes (/api/v1/orders/feed) get (obtener solo órdenes pendientes)
router.get('/feed', authController, orderController.pendingOrders);

//Un reciclador puede crear una orden (/api/v1/orders) post
router.post('/createOrder', authController, orderController.postOrder);

//Un reciclador puede editar una orden (/api/v1/orders/:id) put
router.put('/editOrder/:id', authController, orderController.editOrder);

//Un recolector puede atender una orden (/api/v1/orders/:id) put (actualizar status de orden: asignado)
router.put('/assignOrder/:id', authController, orderController.assignOrder);

//Un recolector puede descartar una orden (/api/v1/orders/:id) put (actualizar status de orden: pendiente)
router.put('/pendingOrder/:id', authController, orderController.pendingOrder);

//Un recolector puede finalizar una orden (/api/v1/orders/:id) put (actualizar status de orden: entregado)
router.put('/finishOrder/:id', authController, orderController.finishOrder);

//Un reciclador puede eliminar una orden (/api/v1/orders/:id) delete
router.delete('/deleteOrder/:id', authController, orderController.deleteOrder);

//Estoy en duda de si dejar o borrar el /:id en los ultimos dos, dado que ya estaría pasando el authController.


module.exports = router;