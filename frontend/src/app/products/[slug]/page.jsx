"use client"
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import GlobalApi from '@/app/utils/GlobalApi';
import ProductInfo from '@/components/product/ProductInfo';
import BreadCrump from '@/components/product/BreadCrump';
import ProductBanner from '@/components/product/ProductBanner';
import ProductList from '@/components/home/ProductList';

const ProductPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const path = usePathname();
  const [productDetail, setProductDetail] = useState(null);
  const [productList, setProductList] = useState([]);


  useEffect(() => {
    console.log("Product Path", path);
    getProductBySlug_();
  }, [params.slug]); // Ensure params.slug is included as a dependency

  const getProductBySlug_ = async () => {
    try {
      const resp = await GlobalApi.getProductBySlug(params.slug);
      const productData = resp.data.data[0]; // Get the first product matching the slug
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

  if (!productDetail) {
    return <div>Učitavam...</div>;
  }


  return (
    <>
    <head>
       <title>{product?.attributes?.title} Živić-Elektro</title>
        <meta name="description" content={product?.attributes?.description} />
        <meta property="og:title" content={product?.attributes?.title} />
        <meta property="og:description" content={product?.attributes?.description} />
        <meta property="og:image" content={product?.attributes?.thumbnail?.data[0]?.attributes?.url} />
        <meta property="og:url" content={`https://zivic-elektro.hr/products/${product?.attributes?.slug}`} />
      </head>
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
    </>
  );
};

export default ProductPage;
