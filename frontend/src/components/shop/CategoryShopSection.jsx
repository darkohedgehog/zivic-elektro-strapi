"use client"
import React, { useEffect, useState } from 'react'
import CategoryShopList from './CategoryShopList';
import GlobalApi from '@/app/utils/GlobalApi';
import CategoryIntro from '../category/CategoryIntro';




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
      <h2 className='text-[24px] uppercase text-gray font-bold flex gap-2 items-center justify-center'>
        Pogledajte našu
        <span className='text-accent'>ponudu</span> 
        </h2>
        <CategoryIntro />
        <CategoryShopList categoryShopList = {categoryShopList} />
    </div>
  )
}

export default CategoryShopSection;