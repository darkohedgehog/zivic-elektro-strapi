"use client"
import React, { useEffect, useState } from 'react'
import CategoryList from './CategoryList';
import GlobalApi from '@/app/utils/GlobalApi';
import { PiCrownSimpleThin } from "react-icons/pi";
import Link from 'next/link';




const CategorySection = () => {

    const [categoryList, setCategoryList] = useState([]);

    useEffect( () => {
       getLatestCategories_();
    }, []);

    const getLatestCategories_= () => {
        GlobalApi.getLatestCategories().then(resp => {
            console.log(resp.data.data);
            setCategoryList(resp.data.data)
        })
    }

  return categoryList&&(
    <div className='px-10 md:px-20 flex flex-col items-center justify-center pb-10'>
      <Link href={'/shop'}>
      <h2 className='text-[24px] uppercase font-bold mb-4 pb-7 text-gray flex gap-2'>
      <PiCrownSimpleThin className='w-6 h-9 text-accent dark:text-accentDark' />
        Istražite 
        <span className='text-accent'>kategorije</span> 
        </h2>
      </Link>
        <CategoryList categoryList = {categoryList} />
    </div>
  )
}

export default CategorySection;