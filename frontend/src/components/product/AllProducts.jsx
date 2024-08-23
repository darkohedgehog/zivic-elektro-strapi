import React, { useState, useEffect, useCallback } from 'react';
import ProductItem from '../home/ProductItem';
import GlobalApi from '@/app/utils/GlobalApi';


const AllProducts = ({ initialProductList }) => {
  const [products, setProducts] = useState(initialProductList);
  const [page, setPage] = useState(1);
  const productsPerPage = 24;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Novo stanje za praćenje da li ima još proizvoda
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceOrder, setPriceOrder] = useState('');

  const loadProducts = useCallback(async (reset = false) => {
    if (!hasMore) return; // Ako nema više proizvoda, prekini učitavanje

    setLoading(true);
    try {
      const start = reset ? 0 : products.length;
      const response = await GlobalApi.getProducts(productsPerPage, start, categoryFilter, priceOrder);
      const newProducts = response.data.data;
      
      if (newProducts.length < productsPerPage) {
        setHasMore(false); // Ako smo dobili manje proizvoda od limit-a, nema više za učitavanje
      }

      setProducts(prevProducts => reset ? newProducts : [...prevProducts, ...newProducts]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  }, [categoryFilter, priceOrder, products.length, hasMore]);

  // Lazy loading on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
        loadProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadProducts]);

  // Reload products when filter or sort order changes
  useEffect(() => {
    setHasMore(true); // Resetuj hasMore kada se filter ili sortiranje promene
    loadProducts(true); // Reset the product list and load new filtered/sorted products
  }, [categoryFilter, priceOrder]);

  return (
    <div className='w-full'>
      <div className='my-8 gap-2 grid grid-cols-2 lg:grid lg:w-[300px]'>
        <select 
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setPage(1);
          }} 
          className='p-2 border border-gray rounded-md bg-transparent text-accent dark:text-accentDark text-sm'
        >
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
        <select 
          onChange={(e) => {
            setPriceOrder(e.target.value);
            setPage(1);
          }} 
          className='p-2 border border-gray rounded-md bg-transparent text-accent dark:text-accentDark text-sm'
        >
          <option value=''>Sortiraj po cijeni</option>
          <option value='asc'>Cijena: Najniža</option>
          <option value='desc'>Cijena: Najviša</option>
        </select>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 pt-16 mt-16'>
        {products.map((item, index) => (
          <div key={index} className="flex-none basis-full md:basis-1/3 lg:basis-1/3 p-2">
            <ProductItem product={item} />
          </div>
        ))}
      </div>
      {loading && <div className='flex items-center justify-center text-gray'>Učitavam...</div>}
      {!hasMore && <div className='flex items-center justify-center text-gray mt-8'>Nema više proizvoda...</div>}
    </div>
  );
};

export default AllProducts;
