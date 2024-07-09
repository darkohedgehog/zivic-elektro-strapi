"use client";
import React, { useEffect, useState, memo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { PiCrownSimpleThin } from "react-icons/pi";
import GlobalApi from '@/app/utils/GlobalApi';
import ButtonStyle from './ButtonStyle';

// Lazy load ProductList component
const ProductList = dynamic(() => import('./ProductList'), { ssr: false });

const ProductSection = memo(() => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = async () => {
    try {
      const resp = await GlobalApi.getLatestProducts();
      //console.log(resp.data.data);
      setProductList(resp.data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return productList && (
    <div className='px-10 md:px-20 flex flex-col items-center justify-center pb-10'>
      <Link href={'/products'}>
        <h2 className='text-[24px] uppercase text-gray font-bold mb-4 pb-7 flex gap-2'>
          <PiCrownSimpleThin className='w-6 h-9 text-accent dark:text-accentDark' />
          Istražite
          <span className='text-accent'> proizvode</span>
        </h2>
      </Link>
      <p className='my-8 uppercase text-gray font-semibold text-xl text-center'>
        Ukrasite vaš dom sa našim proizvodima
      </p>
      <ProductList productList={productList} />
      <div className='mt-8'>
        <Link href={'/products'}>
      <ButtonStyle />
       </Link>
      </div>
    </div>
  );
});

export default ProductSection;
