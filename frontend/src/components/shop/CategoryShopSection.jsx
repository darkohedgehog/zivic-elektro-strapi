"use client"
import React, { useEffect, useState } from 'react'
import CategoryShopList from './CategoryShopList';
import GlobalApi from '@/app/utils/GlobalApi';




const CategoryShopSection = () => {

    const [categoryShopList, setCategoryShopList] = useState([]);

    useEffect( () => {
       getLatestCategories_();
    }, []);

    const getLatestCategories_= () => {
        GlobalApi.getLatestCategories().then(resp => {
            console.log(resp.data.data);
            setCategoryShopList(resp.data.data)
        })
    }

  return categoryShopList&&(
    <div className='px-10 md:px-20 pb-10'>
      <h2 className='text-[24px] uppercase font-bold mb-4 pb-7 flex gap-2 items-center justify-center'>
        Istražite 
        <span className='text-accent'>kategorije</span> 
        </h2>
        <CategoryShopList categoryShopList = {categoryShopList} />
    </div>
  )
}

export default CategoryShopSection;