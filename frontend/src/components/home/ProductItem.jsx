import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PiArrowSquareRightThin } from "react-icons/pi";

const ProductItem = ({ product }) => {

    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const imageUrl = apiUrl + (product?.attributes?.gallery?.data[0]?.attributes?.url || '');


  return (
    <Link 
    href={`/products/${product.attributes.slug}`}>
      <div className='flex justify-center items-center flex-col'>
        <Image
          src={imageUrl}
          alt='banner'
          width={400}
          height={350}
          priority= {true}
          className='w-48 h-48 rounded-lg shadow-lg object-cover'
        />
        <div className='flex flex-col mx-auto'>
        <div className='p-3'>
          <h2 className='text-[14px] font-medium line-clamp-1 text-gray'>{product?.attributes?.title}</h2>
          {product?.attributes?.category&& 
          <h2 className='text-[12px] text-accent flex gap-2 mt-2'>
            <PiArrowSquareRightThin className='w-5 h-5' />
            {product?.attributes?.category}
            </h2>}
        </div>
        <h2 className='text-[12px] ml-3 font-bold text-gray'>€{product?.attributes?.price}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
