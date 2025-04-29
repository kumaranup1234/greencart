import Order from "../models/Order.js";

export const getRevenueTrend = async () => {
    try {
        const trend = await Order.aggregate([
            {
                $match: {
                    isPaid: true,
                    status: { $in: ["Delivered", "Completed"] },
                    createdAt: { $gte:  new Date(Date.now() - 7 * 24 *60 * 60 * 1000) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    amount: { $sum: "$amount" }
                }
            },
            {
                $sort: { _id: -1 }
            }
        ])

        const today = new Date();
        const trendMap = new Map(trend.map(item => [item._id, item.amount]));
        const past7Days = [...Array(7)].map((_, i) => {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const completeTrend = past7Days.map(date => ({
            date,
            amount: trendMap.get(date) || 0

        }));

        return completeTrend;
    } catch (error){
        console.log(error.message)
        throw new Error("Failed to calculate revenue trend")
    }
}