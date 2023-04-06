const Orders = require('../models/order.model');
const OrderUsers = require('../models/orderUsers.model');

class OrderServices {
  static async createOrder(recycler_id, newOrder) {
    try {
      return await Orders.create({
        volumen: newOrder.volumen,
        weight: newOrder.weight,
        observations: newOrder.observations,
        material_id: newOrder.material_id,
        recycler_id,
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateOrder(id, order) {
    try {
      return await Orders.update(
        {
          volumen: order.volumen,
          weight: order.weight,
          observations: order.observations,
          material_id: order.material_id,
        },
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

  static async deleteOrder(id) {
    try {
      return await Orders.destroy({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateOrderStatus(id, status) {
    try {
      return await Orders.update(
        { status },
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
  static async assignCollectorToOrder(orderId, userId) {
    try {
      return await OrderUsers.create({
        order_id: orderId,
        collector_id: userId,
      });
    } catch (error) {
      throw error;
    }
  }
  static async unassignCollectorToOrder(orderId) {
    try {
      return await OrderUsers.destroy({
        where: { order_id: orderId },
      });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = OrderServices;
