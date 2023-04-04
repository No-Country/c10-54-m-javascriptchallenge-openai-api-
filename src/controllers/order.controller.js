const Orders = require('../models/order.model')
const OrderServices = require('../services/order.services')


exports.assignOrder = async (req, res, next) => {
  try {
    const userId = req.user.id
    const role = req.user.role_id;
    //Realizar middleware de restricción de usuario. 
    if(role === 1) {
      res.send('Usuario incorrecto')
    } else {
    const orderId  = req.params.id;
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
    console.error(error)
}

};

exports.unassignOrder = async (req, res, next) => {
  try {
    const userId = req.user.id
    const role = req.user.role_id;
    //Realizar middleware de restricción de usuario. 
    if(role === 1) {
      res.send('Usuario incorrecto')
    } else {
    const  orderId  = req.params.id;
    const  status  = 'pendiente';
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
    console.error(error)
}

  };

exports.closeOrder = async (req, res, next) => {
  try {
    const userId = req.user.id
    const role = req.user.role_id;
    //Realizar middleware de restricción de usuario. 
    if(role === 1) {
      res.send('Usuario incorrecto')
    } else {
    const orderId  = req.params.id;
    const status  = 'entregado';
    const order = await OrderServices.updateOrdersStatus(orderId, status);
    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  }    
} catch (error) {
    console.error(error)
}

  };

exports.deleteOrder = async (req, res, next) => {
  try {
      const role = req.user.role_id;
    //Realizar middleware de restricción de usuario. 
    if(role === 2) {
      res.send('Usuario incorrecto')
    } else {
    const orderId  = req.params.id;
    await OrderServices.deleteOrders(orderId);
    res.status(204).json({
      status: 'success',
    });
  }    
} catch (error) {
    console.error(error)
}

  };