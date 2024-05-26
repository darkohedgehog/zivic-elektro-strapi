"use client";
import GlobalApi from '@/app/utils/GlobalApi';
import ProductList from '@/components/home/ProductList';
import BreadCrump from '@/components/product/BreadCrump';
import ProductBanner from '@/components/product/ProductBanner';
import ProductInfo from '@/components/product/ProductInfo';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProductDetail = ({ params }) => {
  const path = usePathname();
  const [productDetail, setProductDetail] = useState(null);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    console.log("Product Path", path);
    getProductById_();
  }, [params.productId]); // Make sure to include params.productId as a dependency

  const getProductById_ = async () => {
    try {
      const resp = await GlobalApi.getProductById(params.productId);
      const productData = resp.data.data;
      setProductDetail(productData);
      getProductListByCategory(productData.attributes.category);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const getProductListByCategory = async (category) => {
    try {
      const resp = await GlobalApi.getProductListByCategory(category);
      setProductList(resp.data.data);
    } catch (error) {
      console.error("Error fetching product list by category:", error);
    }
  };

  return (
    <div className='p-5 py-20 px-10 md:px-28'>
      <BreadCrump path={path} />
      {productDetail ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 mt-10 gap-5 sm:gap-5 justify-evenly'>
          <ProductBanner product={productDetail} />
          <ProductInfo product={productDetail} />
        </div>
      ) : (
        <div>Učitavam...</div>
      )}
      <h2 className='py-10 my-10 font-medium text-accent text-[18px] flex items-center justify-center'>
        Povezani proizvodi
      </h2>
      {productList.length > 0 && (
        <div className='mt-20 items-center justify-center flex'>
          <ProductList productList={productList} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
