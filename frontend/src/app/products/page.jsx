"use client";

import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/utils/GlobalApi';
import AllProducts from '@/components/product/AllProducts';
import ButtonStyle from '@/components/home/ButtonStyle';
import Link from 'next/link';

const Products = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getAllProducts_();
  }, []);

  const getAllProducts_ = () => {
    GlobalApi.getLatestProducts().then(resp => {
      console.log(resp.data.data);
      setProductList(resp.data.data);
    });
  };

  return (
    <div className='px-10 md:px-20 flex flex-col items-center justify-center py-28'>
      <h2 className='text-[24px] uppercase font-bold mb-4 pb-7 text-accent dark:text-accentDark'>
        Izdvojeni Proizvodi
        </h2>
      {productList.length > 0 ? (
        <AllProducts initialProductList={productList} />
      ) : (
        <div>Učitavam proizvode...</div>
      )}
      <div className='mt-8'>
        <div className='text-accent dark:text-accentDark font-semibold text-sm my-5'>
          Pogledaj sve naše proizvode
        </div>
            <Link href={'/shop'}>
          <ButtonStyle />
            </Link>
         </div>
    </div>
  );
};

export default Products;
