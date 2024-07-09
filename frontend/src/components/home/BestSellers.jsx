"use client";
import { useEffect, useState, memo } from 'react';
import dynamic from 'next/dynamic';
import { PiCrownSimpleThin } from "react-icons/pi";
import GlobalApi from '@/app/utils/GlobalApi';

// Lazy load BestSellersCarousel component
const BestSellersCarousel = dynamic(() => import('./BestSellersCarousel'), { ssr: false });

const BestSellers = memo(() => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
       // console.log("Fetching bestsellers"); // Log za debagovanje
        const resp = await GlobalApi.getBestSellers();
       // console.log("API Response:", resp); // Log za debagovanje API odgovora
       // console.log("Fetched Bestsellers:", resp.data.data); // Log za debagovanje
        setProductList(resp.data.data);
      } catch (error) {
        console.error("Error fetching bestsellers:", error);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <div className='px-10 md:px-20 flex flex-col items-center justify-center py-10 mt-3'>
      <h2 className='text-[24px] uppercase font-bold mb-4 pb-7 text-gray flex gap-2'>
        <PiCrownSimpleThin className='w-6 h-9 text-accent dark:text-accentDark' />
        Najprodavaniji
        <span className='text-accent'>proizvodi</span>
      </h2>
      <p className='my-8 uppercase text-gray font-semibold text-xl text-center'>
        Upoznajte naše šampione prodaje
      </p>
      {productList.length > 0 ? (
        <BestSellersCarousel productList={productList} />
      ) : (
        <div>Učitavam proizvode...</div>
      )}
    </div>
  );
});

export default BestSellers;
