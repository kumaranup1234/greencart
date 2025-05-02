import { assets } from "../../../assets/assets.js";

const TopList = ({ heading, products }) => {
    return (
        <div className="p-6 rounded-lg border border-gray-500/20 bg-white">
            {/* Heading */}
            <div className="flex items-center mb-4">
                <img src={assets.sixDots} alt="dotsIcon" className="w-5 h-5 mr-2" />
                <p className="text-base font-bold">{heading}</p>
            </div>

            {/* Scrollable Product List */}
            <div className="max-h-96 overflow-y-auto pr-1">
                <div className="flex flex-wrap gap-4">
                    {products?.length > 0 ? (
                        products.map(({ _id, product, totalOrdered }) => (
                            <div
                                key={_id}
                                className="flex-shrink-0 w-full sm:w-[48%] lg:w-[48%] xl:w-[58%] border border-gray-300/30 rounded-md p-3 flex gap-3 items-start bg-gray-50"
                            >
                                <img
                                    src={product.image?.[0]}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                                <div className="flex flex-col w-full">
                                    <p className="font-medium text-gray-800 line-clamp-2">{product.name}</p>
                                    <p className="text-sm text-gray-500 truncate">{product.category}</p>
                                    <div className="text-sm text-primary font-semibold mt-1">
                                        ₹{product.offerPrice}
                                        <span className="line-through text-xs text-gray-400 ml-2">
                                            ₹{product.price}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Ordered {totalOrdered} times</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No products found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopList;
