

const Orders = require("../models/order.model");

class OrderServices {

    // static async getAllbyUser(recycler_id) {
    //     try {
    //         return await Orders.findAll({
    //             where: { recycler_id },
    //         });
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    static async createOrder(recycler_id, newOrder) {
        try {
            const orderCreated = await Orders.create({
                ...newOrder,
                recycler_id,
            });
            return orderCreated

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
                    }
                });

        } catch (error) {
            throw error;
        }
    }


    static async deleteOrders(id) {

        return await Orders.destroy({
            where: {
                id
            }
        });
    }

}

module.exports = OrderServices;