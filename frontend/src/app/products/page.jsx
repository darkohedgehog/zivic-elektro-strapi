"use client";

import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/utils/GlobalApi';
import AllProducts from '@/components/product/AllProducts';

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
    <div className='px-10 md:px-20 flex flex-col items-center justify-center pb-10'>
      <h2 className='text-[24px] uppercase font-bold mb-4 pb-7'>Svi Proizvodi</h2>
      {productList.length > 0 ? (
        <AllProducts initialProductList={productList} />
      ) : (
        <div>Učitavam proizvode...</div>
      )}
    </div>
  );
};

export default Products;
