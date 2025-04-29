import Order from "../models/Order.js";

export const getTotalRevenue = async () => {
    try {
        const revenue = await Order.aggregate([
            {
                $facet: {
                    totalRevenue: [
                        {
                            $match: {
                                isPaid: true,
                                status: { $in: ["Delivered", "Completed"] }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                amount: { $sum: "$amount" }
                            }
                        }
                    ],
                    pendingAmount: [
                        {
                            $match: {
                                isPaid: false,
                                status: { $nin: ["Cancelled"] }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                amount: { $sum: "$amount" }
                            }
                        }
                    ]
                }
            }
        ]);
        const totalRevenue = revenue[0].totalRevenue[0]?.amount || 0;
        const pendingAmount = revenue[0].pendingAmount[0]?.amount || 0;
        return { totalRevenue, pendingAmount };
    } catch (error) {
        console.log(error.message);
        throw new Error("Failed to calculate total revenue");
    }
}