import BlogSection from "@/components/blog/BlogSection";
import Banner from "@/components/home/Banner";
import BannerTwo from "@/components/home/BannerTwo";
import BestSellers from "@/components/home/BestSellers";
import CategorySection from "@/components/home/CategorySection";
import GsapTextBanner from "@/components/home/GsapTextBanner";
import ImageCarousel from "@/components/home/ImageCarousel";
import ProductSection from "@/components/home/ProductSection";



export default function Home() {
  return (
    <>
    <Banner />
    <BannerTwo />
    <GsapTextBanner />
    <ImageCarousel />
    <ProductSection />
    <CategorySection />
    <BestSellers />
    <BlogSection />
    </>
  );
}
