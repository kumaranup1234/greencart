import Order from "../models/Order.js";

export const getOrdersPerDay = async () => {
    try {
        const trend = await Order.aggregate([
            {
                $match: {
                    status: { $nin: ["Cancelled"] },
                    createdAt: { $gte:  new Date(Date.now() - 7 * 24 *60 * 60 * 1000) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: -1 }
            }
        ])

        const today = new Date();
        const trendMap = new Map(trend.map(item => [item._id, item.count]));
        const past7Days = [...Array(7)].map((_, i) => {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const completeOrderTrend = past7Days.map(date => ({
            date,
            count: trendMap.get(date) || 0
        }));

        return completeOrderTrend;
    } catch (error){
        console.log(error.message)
        throw new Error("Failed to calculate revenue trend")
    }
}