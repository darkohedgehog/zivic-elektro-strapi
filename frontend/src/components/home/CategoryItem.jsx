import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CategoryItem = ({ category }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const cateThumbUrl = baseUrl + (category?.attributes?.gallery?.data[0]?.attributes?.url || '');

  return (
    <div>
      <div className='flex justify-center items-center flex-col'>
        <Link href={`/category/${category.attributes.cate}`}>
          <Image
            src={cateThumbUrl}
            alt='banner'
            width={400}
            height={350}
            priority={false}
            className='w-48 h-48 rounded-lg shadow-lg object-cover'
          />
        </Link>
        <div className='flex flex-col mx-auto'>
          <div className='p-3'>
            <h2 className='text-[14px] font-medium line-clamp-1'>{category.attributes.cate}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
