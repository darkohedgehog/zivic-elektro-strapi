"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ProductBanner = ({ product }) => {
  const [imageProduct, setImageProduct] = useState('');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchImageProduct = async () => {
      if (product) {
        const imageUrl = baseUrl + (product?.attributes?.gallery?.data[0]?.attributes?.url || '');
        setImageProduct(imageUrl);
      }
    };

    fetchImageProduct();
  }, [baseUrl, product]);

  return (
    <div className='w-full'>
      {product && imageProduct ? (
        <Image
          src={imageProduct}
          alt='Product Image'
          width={350}
          height={350}
          priority={true}
          className='rounded-lg object-cover shadow-md w-80 h-80'
        />
      ) : (
        <div className='h-[300px] w-[320px] bg-slate-200 dark:bg-slate-500 animate-pulse flex items-center justify-center text-accent dark:text-accentDark rounded-lg'>
          Učitavam ...
        </div>
      )}
    </div>
  );
};

export default ProductBanner;
