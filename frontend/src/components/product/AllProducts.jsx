import React, { useState, useEffect, useCallback } from 'react';
import ProductItem from '../home/ProductItem';
import GlobalApi from '@/app/utils/GlobalApi';

const AllProducts = ({ initialProductList }) => {
  const [products, setProducts] = useState(initialProductList);
  const [page, setPage] = useState(1);
  const productsPerPage = 24;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceOrder, setPriceOrder] = useState('');

  // Funkcija za učitavanje proizvoda
  const loadProducts = useCallback(async (reset = false) => {
    if (loading || !hasMore) return; // Sprečavanje ponovnog učitavanja ako više nema proizvoda ili ako je već u toku

    setLoading(true);
    try {
      const start = reset ? 0 : products.length;
      const response = await GlobalApi.getProducts(productsPerPage, start, categoryFilter, priceOrder);
      const newProducts = response.data.data;

      // Resetovanje ili dodavanje novih proizvoda
      setProducts(prevProducts => reset ? newProducts : [...prevProducts, ...newProducts]);

      // Provera da li je kraj liste dostignut
      if (newProducts.length < productsPerPage) {
        setHasMore(false);
      } else {
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  }, [categoryFilter, priceOrder, products.length, hasMore, loading]);

  // Učitavanje proizvoda na osnovu filtera i sortiranja
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadProducts(true); // Resetovanje liste proizvoda prilikom promene filtera ili sortiranja
  }, [categoryFilter, priceOrder, loadProducts]);

  // Lazy loading prilikom skrolovanja
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
        loadProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadProducts]);

  return (
    <div className='w-full'>
      <div className='my-8 gap-2 grid grid-cols-2 lg:grid lg:w-[300px]'>
        <select 
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setPage(1);
            setHasMore(true);
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
            setHasMore(true);
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
    </div>
  );
};

export default AllProducts;
