import Order from "../models/Order.js";

export const checkDeliveredOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findOne({
            userId: req.user._id,
            "items.product": id,  // inside items array
            status: "Delivered"
        })

        if (!order) {
            return res.status(400).json({
                success: false,
                message: "You can only rate after your order is delivered."
            });
        }

        next();

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server error during delivery check." });
    }
}