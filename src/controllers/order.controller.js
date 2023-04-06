const OrderServices = require('../services/order.services');

exports.createPendingOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;
    const newOrder = req.body;

    if (role === 1) {
      const orderCreated = await OrderServices.createOrder(userId, newOrder);
      res.status(200).json({
        status: 'success',
        orderCreated,
      });
    } else {
      res.send('Usuario incorrecto');
    }
  } catch (error) {
    next(error);
  }
};

exports.updateOrderRecycler = async (req, res, next) => {
  try {
    const role = req.user.role_id;
    const order = req.body;

    if (role === 1) {
      const orderId = req.params.id;
      const orderUpdated = await OrderServices.updateOrderPending(
        orderId,
        order
      );

      return res.status(201).json({
        status: 'success',
        message: 'Order updated successfully',
        orderUpdated,
      });
    } else {
      return res.status(201).json({
        message: 'No permite modificar la orden',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteOrderRecycler = async (req, res, next) => {
  try {
    const role = req.user.role_id;

    if (role === 1) {
      const orderId = req.params.id;
      await OrderServices.deleteOrders(orderId);

      return res.status(201).json({
        status: 'success',
        message: 'Order deleted successfully',
      });
    } else {
      return res.status(201).json({
        message: 'No permite eliminar la orden',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.assignOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;
    //Realizar middleware de restricción de usuario.
    if (role === 1) {
      res.send('Usuario incorrecto');
    } else {
      const orderId = req.params.id;
      const status = 'asignado';
      await OrderServices.assignColectorToOrder(orderId, userId);
      const order = await OrderServices.updateOrdersStatus(orderId, status);
      res.status(200).json({
        status: 'success',
        data: {
          order,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.unassignOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;
    //Realizar middleware de restricción de usuario.
    if (role === 1) {
      res.send('Usuario incorrecto');
    } else {
      const orderId = req.params.id;
      const status = 'pendiente';
      await OrderServices.unassignColectorToOrder(orderId, userId);
      const order = await OrderServices.updateOrdersStatus(orderId, status);
      res.status(200).json({
        status: 'success',
        data: {
          order,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.closeOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;
    //Realizar middleware de restricción de usuario.
    if (role === 1) {
      res.send('Usuario incorrecto');
    } else {
      const orderId = req.params.id;
      const status = 'entregado';
      const order = await OrderServices.updateOrdersStatus(orderId, status);
      res.status(200).json({
        status: 'success',
        data: {
          order,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const role = req.user.role_id;
    //Realizar middleware de restricción de usuario.
    if (role === 2) {
      res.send('Usuario incorrecto');
    } else {
      const orderId = req.params.id;
      await OrderServices.deleteOrders(orderId);
      res.status(204).json({
        status: 'success',
      });
    }
  } catch (error) {
    console.error(error);
  }
};
