import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import Fuse from 'fuse.js';

const AllProducts = () => {

    const {products, searchQuery} = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        if (searchQuery.length > 0) {
            const options = {
                keys: ['name'],
                threshold: 0.5, // (0.3–0.5)
            };

            const fuse = new Fuse(products, options);
            const result = fuse.search(searchQuery);

            const matchedProducts = result.map(r => r.item);
            setFilteredProducts(matchedProducts);
        } else {
            setFilteredProducts(products);
        }
    }, [products, searchQuery]);

  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
            {filteredProducts.filter((product) => product.inStock).length === 0 ? (
                <div className='col-span-full text-center text-gray-500 py-10 text-lg'>
                    No products found matching your search.
                </div>
            ) : (
                filteredProducts
                    .filter((product) => product.inStock)
                    .map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
            )}
        </div>

    </div>
  )
}

export default AllProducts
