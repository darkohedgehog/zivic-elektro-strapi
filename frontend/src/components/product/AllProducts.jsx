import React, { useState, useEffect } from 'react';
import ProductItem from '../home/ProductItem';

const AllProducts = ({ initialProductList }) => {
  const [filteredProducts, setFilteredProducts] = useState(initialProductList);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceOrder, setPriceOrder] = useState('');

  useEffect(() => {
    let products = [...initialProductList];

    if (categoryFilter) {
      products = products.filter(product => product.attributes.category === categoryFilter);
    }

    if (priceOrder) {
      products.sort((a, b) => priceOrder === 'asc' ? a.attributes.price - b.attributes.price : b.attributes.price - a.attributes.price);
    }

    setFilteredProducts(products);
  }, [categoryFilter, priceOrder, initialProductList]);

  return (
    <div className='w-full'>
      <div className='my-8 gap-2 grid grid-cols-2 lg:grid lg:w-[300px]'>
        <select onChange={(e) => setCategoryFilter(e.target.value)} 
        className='p-2 border border-gray rounded-md bg-transparent text-accent dark:text-accentDark text-sm'>
          <option value=''>Sve kategorije</option>
          <option value='Status'>Status</option>
          <option value='Emporio'>Emporio</option>
          <option value='OG program'>OG program</option>
          <option value='Kombo'>Kombo</option>
          <option value='Premijer +'>Premijer +</option>
          <option value='Happy'>Happy</option>
          <option value='Elektroinstalacijski pribor'>Elektroinstalacijski pribor</option>
          <option value='Kutije'>Kutije</option>
          <option value='Prijenosne priključnice'>Prijenosne priključnice</option>
          <option value='Grlo'>Grlo</option>
          <option value='Zvono'>Zvono</option>
        </select>
        <select onChange={(e) => setPriceOrder(e.target.value)} 
        className='p-2 border border-gray rounded-md bg-transparent text-accent dark:text-accentDark text-sm'>
          <option value=''>Sortiraj po cijeni</option>
          <option value='asc'>Cijena: Najniža</option>
          <option value='desc'>Cijena: Najviša</option>
        </select>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 pt-16 mt-16'>
        {filteredProducts.map((item, index) => (
          <div key={index} className="flex-none basis-full md:basis-1/3 lg:basis-1/3 p-2">
            <ProductItem product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
