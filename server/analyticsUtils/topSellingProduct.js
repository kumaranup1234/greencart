import Order from "../models/Order.js";

export const topSellingProduct = async () => {
    try {
        const mostOrderedProduct = await Order.aggregate([
            {
                $unwind: "$items"
            },
            {
                $group: {
                    _id: "$items.product",
                    totalOrdered: { $sum: "$items.quantity" },
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $sort: { totalOrdered: -1 }
            },
            {
                $limit: 1
            }
        ]);

        const leastOrderedProducts = await Order.aggregate([
            {
                $unwind: "$items"
            },
            {
                $group: {
                    _id: "$items.product",
                    totalOrdered: { $sum: "$items.quantity" },
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $sort: { totalOrdered: 1 }
            },
            {
                $limit: 1
            }
        ]);


        if (mostOrderedProduct.length === 0 && leastOrderedProducts.length === 0) {
            return { mostOrderedProduct: null, leastOrderedProducts: null };
        } else if (mostOrderedProduct.length === 0) {
            return { mostOrderedProduct: null, leastOrderedProducts };
        } else if (leastOrderedProducts.length === 0) {
            return { mostOrderedProduct, leastOrderedProducts: null };
        } else {
            return { mostOrderedProduct, leastOrderedProducts };
        }
    } catch (error) {
        console.log(error.message);
        throw new Error("Failed to calculate top selling product");
    }
};
