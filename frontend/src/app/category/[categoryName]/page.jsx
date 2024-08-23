"use client";

import { useEffect, useState, useCallback } from 'react';
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Praćenje da li ima više proizvoda
  const router = useRouter();

  const loadProducts = useCallback(async () => {
    if (!hasMore || loading) return; // Ako nema više proizvoda ili već učitava, prekini

    setLoading(true);
    try {
      const start = (page - 1) * 24;
      const response = await GlobalApi.getProductListByCategoryName(categoryName, 24, start);
      const newProducts = response.data.data;

      setProductList(prevProducts => [...prevProducts, ...newProducts]);

      if (newProducts.length < 24) {
        setHasMore(false); // Ako je broj vraćenih proizvoda manji od limita, prestani sa učitavanjem
      }

      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error("Error fetching product list by category:", error);
    }
    setLoading(false);
  }, [categoryName, page, hasMore, loading]);

  useEffect(() => {
    setPage(1); // Resetovanje page na 1 kada se kategorija promeni
    setProductList([]); // Resetovanje liste proizvoda kada se kategorija promeni
    setHasMore(true); // Ponovno omogućavanje učitavanja kada se kategorija promeni
  }, [categoryName]);

  useEffect(() => {
    if (categoryName) {
      loadProducts(); // Učitavanje početnih proizvoda
    }
  }, [categoryName, loadProducts]);

  // Lazy loading on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
        loadProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadProducts]);

  useEffect(() => {
    if (categoryName === "Kombo") {
      GlobalApi.getSubCategoriesByCategory(categoryName).then(resp => {
        const subCategoriesData = resp.data.data;
        setSubCategories(subCategoriesData);
      }).catch(error => {
        console.error("Error fetching subcategories by category:", error);
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
      {loading && <div className='flex items-center justify-center text-gray'>Učitavam...</div>}
      {!hasMore && <div className='flex items-center justify-center text-gray mt-8'>Nema više proizvoda</div>}
      <div className='flex items-center justify-center my-8'>
        <button className='button' onClick={() => router.back()}>
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
