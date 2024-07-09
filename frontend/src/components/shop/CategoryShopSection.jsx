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
            //console.log(resp.data.data);
            setCategoryShopList(resp.data.data)
        })
    }

  return categoryShopList&&(
    <div className='px-10 md:px-20 pb-10'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
      <h2 className='text-[24px] uppercase text-gray font-bold'>
        Pogledajte našu
        </h2>
        <span className='text-accent text-[24px] uppercase font-bold'>ponudu</span> 
        </div>
        <CategoryIntro />
        <CategoryShopList categoryShopList = {categoryShopList} />
    </div>
  )
}

export default CategoryShopSection;