import Banner from "@/components/home/Banner";
import CategorySection from "@/components/home/CategorySection";
import GsapTextBanner from "@/components/home/GsapTextBanner";
import ImageCarousel from "@/components/home/ImageCarousel";
import ProductSection from "@/components/home/ProductSection";



export default function Home() {
  return (
    <>
    <Banner />
    <GsapTextBanner />
    <ImageCarousel />
    <ProductSection />
    <CategorySection />
    </>
  );
}
