const Order = require('../models/order.model');
const OrderUsers = require('../models/orderUsers.model');

class OrderServices {
    static async updateOrdersStatus(id, status) {
      try {
        return await Order.update( { status: status }, {
          where: { id },
          include: {
            model: OrderUsers,
          },
        });
      } catch (error) {
        throw error;
      }
    }
    static async assignColectorToOrder(orderId, userId) {
      try {
        return await OrderUsers.create( { order_id: orderId, colector_id: userId });
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
        return await Order.destroy({
          where: { id }
        });
      } catch (error) {
        throw error;
      }
    }
  }
  module.exports = OrderServices;