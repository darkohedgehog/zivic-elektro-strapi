"use client"
import React, { useEffect, useState } from 'react'
import CategoryList from './CategoryList';
import GlobalApi from '@/app/utils/GlobalApi';




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
      <h2 className='text-[24px] uppercase font-bold mb-4 pb-7'>Istražite <span className='text-accent animate-pulse duration-300'>kategorije</span> </h2>
        <CategoryList categoryList = {categoryList} />
    </div>
  )
}

export default CategorySection;