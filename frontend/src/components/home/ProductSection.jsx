"use client"
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList';
import GlobalApi from '@/app/utils/GlobalApi';
import Link from 'next/link';




const ProductSection = () => {

    const [productList, setProductList] = useState([]);

    useEffect( () => {
       getLatestProducts_();
    }, []);

    const getLatestProducts_ = () => {
        GlobalApi.getLatestProducts().then(resp => {
            console.log(resp.data.data);
            setProductList(resp.data.data)
        })
    }

  return productList&&(
    <div className='px-10 md:px-20 flex flex-col items-center justify-center pb-10'>
      <Link href={'/products'}>
      <h2 className='text-[24px] uppercase font-bold mb-4 pb-7'>Najnovije u <span className='text-accent animate-pulse duration-300'>ponudi</span> </h2>
      </Link>
        <ProductList productList = {productList} />
    </div>
  )
}

export default ProductSection;