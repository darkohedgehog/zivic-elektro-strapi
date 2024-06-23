"use client";

import { useEffect, useState } from 'react';
import GlobalApi from '@/app/utils/GlobalApi';
import BestSellersCarousel from './BestSellersCarousel';
import { PiCrownSimpleThin } from "react-icons/pi";

const BestSellers = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    console.log("Fetching bestsellers"); // Log za debagovanje
    GlobalApi.getBestSellers().then(resp => {
      console.log("API Response:", resp); // Log za debagovanje API odgovora
      console.log("Fetched Bestsellers:", resp.data.data); // Log za debagovanje
      setProductList(resp.data.data);
    }).catch(error => {
      console.error("Error fetching bestsellers:", error);
    });
  }, []);

  return (
    <div className='px-10 md:px-20 flex flex-col items-center justify-center pb-10'>
      <h2 className='text-[24px] uppercase font-bold mb-4 pb-7 text-gray flex gap-2'>
      <PiCrownSimpleThin className='w-6 h-9 text-accent dark:text-accentDark' />
        Najprodavaniji 
        <span className='text-accent'>proizvodi</span>
        </h2>
      {productList.length > 0 ? (
        <BestSellersCarousel productList={productList} />
      ) : (
        <div>Učitavam proizvode...</div>
      )}
    </div>
  );
};

export default BestSellers;
