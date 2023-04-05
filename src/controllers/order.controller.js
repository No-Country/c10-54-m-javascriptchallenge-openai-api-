
const OrderServices = require("../services/order.services");


exports.createPendingOrder = async (req, res, next) => {
    try {
        const userId = req.user.id
        // const { sessionUser } = req;
        const role = req.user.role_id;
        const newOrder = req.body;

        if (role === 1) {
            const orderCreated = await OrderServices.createOrder(userId, newOrder);
            res.status(200).json({
                status: 'success',
                orderCreated,
            });

        } else {
            res.send('Usuario incorrecto')
        }
    } catch (error) {
        next(error)
    }

};


exports.updateOrderRecycler = async (req, res, next) => {

    try {
        const role = req.user.role_id;
        const order = req.body

        if (role === 1) {
            const orderId = req.params.id;
            const orderUpdated = await OrderServices.updateOrderPending(orderId, order)

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
        next(error)
    }

};



exports.deleteOrderRecycler = async (req, res, next) => {

    try {
        const role = req.user.role_id;

        if (role === 1) {
            const orderId = req.params.id;
            await OrderServices.deleteOrders(orderId)

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
        next(error)
    }

};


