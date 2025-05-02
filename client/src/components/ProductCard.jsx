import React from "react";
import {assets} from "../assets/assets";
import {useAppContext} from "../context/AppContext";


const ProductCard = ({product}) => {
    const {currency, addToCart, removeFromCart, cartItems, navigate} = useAppContext()

    const originalPrice = product.price;
    const offerPrice = product.offerPrice;
    const finalPrice = Math.min(originalPrice, offerPrice);
    const savings = originalPrice - finalPrice;
    const discountPercent = Math.round((savings / originalPrice) * 100);

    return product && (
        <div onClick={() => {
            navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
            scrollTo(0, 0)
        }} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white sm:min-w-40 max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]}
                     alt={product.name}/>
            </div>

            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <img key={i} className="md:w-3.5 w3"
                             src={i < Math.round(product.ratings.average) ? assets.star_icon : assets.star_dull_icon}
                             alt=""/>
                    ))}
                    <p>({product.ratings.count})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                        {currency}
                        {finalPrice}{" "}
                        {finalPrice < originalPrice && (
                            <span className="text-gray-500/60 md:text-sm text-xs line-through">
                                {currency}
                                {originalPrice}
                            </span>
                        )}
                    </p>
                    <div onClick={(e) => {
                        e.stopPropagation();
                    }} className="text-primary">
                        {!cartItems[product._id] ? (
                            <button
                                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer"
                                onClick={() => addToCart(product._id)}>
                                <img src={assets.cart_icon} alt="cart_icon"/>
                                Add
                            </button>
                        ) : (
                            <div
                                className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                <button onClick={() => {
                                    removeFromCart(product._id)
                                }} className="cursor-pointer text-md px-2 h-full">
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => {
                                    addToCart(product._id)
                                }} className="cursor-pointer text-md px-2 h-full">
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {savings > 0 && (
                    <p className="text-green-600 md:text-sm text-xs font-medium mt-1">
                        You save {currency}
                        {savings} ({discountPercent}% off)
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;