"use client";
import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import GlobalApi from '@/app/utils/GlobalApi';
import FilteredProductList from '@/components/home/FilteredProductList';
import SubCategoryList from '@/components/home/SubCategoryList';
import { TiArrowBackOutline } from "react-icons/ti";

const CategoryPage = () => {
  const params = useParams(); 
  const categoryName = params.categoryName; 
  const [productList, setProductList] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 24;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  // Funkcija za učitavanje proizvoda
  const loadProducts = useCallback(async (reset = false) => {
    if (loading || !hasMore) return; // Sprečavanje ponovnog učitavanja ako više nema proizvoda ili ako je već u toku

    setLoading(true);
    try {
      const start = reset ? 0 : productList.length;
      const response = await GlobalApi.getProductListByCategoryName(categoryName, productsPerPage, start);
      const newProducts = response.data.data;

      // Resetovanje ili dodavanje novih proizvoda
      setProductList(prevProducts => reset ? newProducts : [...prevProducts, ...newProducts]);

      // Provera da li je kraj liste dostignut
      if (newProducts.length < productsPerPage) {
        setHasMore(false);
      } else {
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  }, [categoryName, productList.length, hasMore, loading]);

  // Učitavanje proizvoda na osnovu promene kategorije
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadProducts(true); // Resetovanje liste proizvoda prilikom promene kategorije
  }, [categoryName, loadProducts]);

  // Lazy loading prilikom skrolovanja
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
        loadProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadProducts]);

  // Učitavanje subkategorija ako je kategorija "Kombo"
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
