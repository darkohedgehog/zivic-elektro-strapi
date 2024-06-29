"use client";
import React, { useEffect, useState, memo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { PiCrownSimpleThin } from "react-icons/pi";
import GlobalApi from '@/app/utils/GlobalApi';

// Lazy load CategoryList component
const CategoryList = dynamic(() => import('./CategoryList'), { ssr: false });

const CategorySection = memo(() => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getLatestCategories_();
  }, []);

  const getLatestCategories_ = async () => {
    try {
      const resp = await GlobalApi.getLatestCategories();
      console.log(resp.data.data);
      setCategoryList(resp.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  return categoryList && (
    <div className='px-10 md:px-20 flex flex-col items-center justify-center pb-10'>
      <Link href={'/shop'}>
        <h2 className='text-[24px] uppercase font-bold mb-4 pb-7 text-gray flex gap-2'>
          <PiCrownSimpleThin className='w-6 h-9 text-accent dark:text-accentDark' />
          Istražite
          <span className='text-accent'>kategorije</span>
        </h2>
      </Link>
      <p className='my-8 uppercase text-gray font-semibold text-xl text-center'>
        Uživajte u bogatoj ponudi
      </p>
      <CategoryList categoryList={categoryList} />
    </div>
  );
});

export default CategorySection;
