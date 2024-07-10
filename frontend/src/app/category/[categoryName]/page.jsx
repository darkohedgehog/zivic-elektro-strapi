"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import GlobalApi from '@/app/utils/GlobalApi';
import FilteredProductList from '@/components/home/FilteredProductList';
import SubCategoryList from '@/components/home/SubCategoryList';
import { TiArrowBackOutline } from "react-icons/ti";

const CategoryPage = () => {
  const params = useParams(); // Using useParams to get params from URL
  const categoryName = params.categoryName; // Extracting categoryName from params
  const [productList, setProductList] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log("categoryName:", categoryName); // Logovanje za potvrdu categoryName
    if (categoryName === "Kombo") {
      //console.log(`Fetching subcategories for category name: ${categoryName}`);
      GlobalApi.getSubCategoriesByCategory(categoryName).then(resp => {
        const subCategoriesData = resp.data.data;
        //console.log("Fetched SubCategories:", subCategoriesData);
        setSubCategories(subCategoriesData);
      }).catch(error => {
        console.error("Error fetching subcategories by category:", error);
      });
    } else if (categoryName) {
      //console.log(`Fetching products for category name: ${categoryName}`);
      GlobalApi.getProductListByCategoryName(categoryName).then(resp => {
        //console.log("API Response:", resp); 
       // console.log("Fetched Products:", resp.data.data); 
        setProductList(resp.data.data);
      }).catch(error => {
        console.error("Error fetching product list by category:", error);
      });
    }
  }, [categoryName]);

  return (
    <div className='py-28'>
      <h2 className='text-2xl uppercase font-semibold flex items-center justify-center mb-10 text-accent'>
        {categoryName === "Kombo" ? "Modularni program Kombo" : "Proizvodi po kategoriji"}
      </h2>
      
        {categoryName === "Kombo" && subCategories.length > 0 ? (
          <SubCategoryList subCategories={subCategories} categoryName={categoryName} />
        ) : productList.length > 0 ? (
          <FilteredProductList productList={productList} />
        ) : (
          <div>Učitavam proizvode...</div>
        )}
      <div className='flex items-center justify-center my-8'>
        <button className='button'
        onClick={() => router.back()}>
          <span className='text-accent dark:text-accentDark uppercase text-sm flex items-center justify-center gap-2'>
          <TiArrowBackOutline className='w-5 h-5' />
            Nazad
            </span>
        </button>  
      </div>
    </div>
  );
};

export default CategoryPage;
