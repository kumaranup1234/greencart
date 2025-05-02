import Order from "../models/Order.js";

export const getPaymentType = async () => {
    try {
        const result = await Order.aggregate([
            {
                $group: {
                    _id: "$paymentType",
                    count: { $sum: 1 }
                }
            }
        ]);

        let cod = 0;
        let online = 0;

        result.forEach(item => {
            if(item._id === "COD"){
                cod = item.count;
            }else if(item._id === "Online"){
                online = item.count;
            }
        })
        return {cod, online};
    } catch (error) {
        console.log(error.message);
        throw new Error("Failed to get payment type statistics");
    }
}