const Orders = require('../models/order.model');
const OrderUsers = require('../models/orderUsers.model');

class OrderServices {
  static async createOrder(recycler_id, newOrder) {
    try {
      const orderCreated = await Orders.create({
        ...newOrder,
        recycler_id,
      });
      return orderCreated;
    } catch (error) {
      throw error;
    }
  }

  static async updateOrderPending(id, order) {
    try {
      return await Orders.update(
        {
          volumen: order.volumen,
          weight: order.weight,
          observations: order.observations,
          material_id: order.material_id,
        },
        // order,
        {
          where: {
            id,
            status: 'pendiente',
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async deleteOrders(id) {
    return await Orders.destroy({
      where: {
        id,
      },
    });
  }

  static async updateOrdersStatus(id, status) {
    try {
      return await Orders.update(
        { status: status },
        {
          where: { id },
          include: {
            model: OrderUsers,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }
  static async assignColectorToOrder(orderId, userId) {
    try {
      return await OrderUsers.create({
        order_id: orderId,
        colector_id: userId,
      });
    } catch (error) {
      throw error;
    }
  }
  static async unassignColectorToOrder(orderId) {
    try {
      return await OrderUsers.destroy({
        where: { order_id: orderId },
      });
    } catch (error) {
      throw error;
    }
  }
  static async deleteOrders(id) {
    try {
      return await Orders.destroy({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = OrderServices;
