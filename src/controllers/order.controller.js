const OrderServices = require('../services/order.services');

/////////////////////////////////////////////////////////////////
// Recycler

exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;
    const newOrder = req.body;

    // Verificar que el rol del usuario sea reciclador
    if (role === 1) {
      const orderCreated = await OrderServices.createOrder(userId, newOrder);
      res.status(200).json({
        status: 'success',
        orderCreated,
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const role = req.user.role_id;
    const order = req.body;

    // Verificar que el rol del usuario sea reciclador
    // Verificar que el usuario que borra la orden sea el que la creó
    if (role === 1) {
      const orderId = req.params.id;
      const orderUpdated = await OrderServices.updateOrder(orderId, order);
      res.status(201).json({
        status: 'success',
        message: 'Order updated successfully',
        orderUpdated,
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const role = req.user.role_id;
    const orderId = req.params.id;

    //TODO Realizar middleware de restricción de usuario.
    // Verificar que el usuario que borra la orden sea el que la creó
    // Verificar que el rol del usuario sea reciclador
    if (role === 1) {
      await OrderServices.deleteOrder(orderId);
      res.status(204).json({
        status: 'success',
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

/////////////////////////////////////////////////////////////////
// Collector

exports.attendOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;
    const orderId = req.params.id;

    // Verificar que el rol del usuario sea recolector
    // Se debería validar que la orden esté pendiente para poder atenderla
    if (role === 2) {
      const status = 'asignado';
      await OrderServices.assignCollectorToOrder(orderId, userId);
      const order = await OrderServices.updateOrderStatus(orderId, status);
      res.status(200).json({
        status: 'success',
        data: {
          order,
        },
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.dismissOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;
    const orderId = req.params.id;

    // Verificar que el rol del usuario sea recolector
    // Verificar que el recolectar que modifica la orden sea que está asignado
    // Se debería validar que la orden esté asignada para poder descartar
    if (role === 2) {
      const status = 'pendiente';
      await OrderServices.unassignCollectorToOrder(orderId, userId);
      const order = await OrderServices.updateOrderStatus(orderId, status);
      res.status(200).json({
        status: 'success',
        data: {
          order,
        },
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.closeOrder = async (req, res, next) => {
  try {
    const role = req.user.role_id;
    const orderId = req.params.id;

    // Verificar que el rol del usuario sea recolector
    // Verificar que el recolectar que modifica la orden sea que está asignado
    // Se debería verificar que la orden está asignada para poder cerrarla
    if (role === 2) {
      const status = 'entregado';
      const order = await OrderServices.updateOrderStatus(orderId, status);
      res.status(200).json({
        status: 'success',
        data: {
          order,
        },
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};
