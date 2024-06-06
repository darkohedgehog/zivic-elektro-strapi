"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Import from next/navigation
import GlobalApi from '@/app/utils/GlobalApi';
import FilteredProductList from '@/components/home/FilteredProductList';

const CategoryPage = () => {
  const params = useParams(); // Using useParams to get params from URL
  const categoryName = params.categoryName; // Extracting categoryName from params
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    console.log("categoryName:", categoryName); // Logovanje za potvrdu categoryName
    if (categoryName) {
      console.log(`Fetching products for category name: ${categoryName}`); // Log za debagovanje
      GlobalApi.getProductListByCategoryName(categoryName).then(resp => {
        console.log("API Response:", resp); // Log za debagovanje API odgovora
        console.log("Fetched Products:", resp.data.data); // Log za debagovanje
        setProductList(resp.data.data);
      }).catch(error => {
        console.error("Error fetching product list by category:", error);
      });
    }
  }, [categoryName]);

  return (
    <div className='px-10 md:px-20 flex flex-col items-center justify-center pb-10'>
      <h2 className='text-[24px] uppercase font-bold mb-4 pb-7'>Proizvodi po kategoriji</h2>
      {productList.length > 0 ? (
        <FilteredProductList productList={productList} />
      ) : (
        <div>Učitavam proizvode...</div>
      )}
    </div>
  );
};

export default CategoryPage;
