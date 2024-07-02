import React, { Suspense, lazy } from 'react';

const BlogSection = lazy(() => import('@/components/blog/BlogSection'));
const Banner = lazy(() => import('@/components/home/Banner'));
const BannerTwo = lazy(() => import('@/components/home/BannerTwo'));
const BestSellers = lazy(() => import('@/components/home/BestSellers'));
const CategorySection = lazy(() => import('@/components/home/CategorySection'));
const GsapTextBanner = lazy(() => import('@/components/home/GsapTextBanner'));
const ImageCarousel = lazy(() => import('@/components/home/ImageCarousel'));
const ProductSection = lazy(() => import('@/components/home/ProductSection'));
const BannerThree = lazy(() => import('@/components/home/BannerThree'));
const CardSection = lazy(() => import('@/components/home/CardSection'));

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Banner />
      <BannerTwo />
      <GsapTextBanner />
      <ImageCarousel />
      <ProductSection />
      <BannerThree />
      <CategorySection />
      <BestSellers />
      <CardSection />
      <BlogSection />
    </Suspense>
  );
}
