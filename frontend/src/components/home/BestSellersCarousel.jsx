import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import ProductItem from './ProductItem';

const BestSellersCarousel = ({ productList }) => {
    if (!productList) {
        return <div>Učitavam proizvode...</div>; // Handle the undefined state appropriately
    }

    return (
        <Carousel opts={{ align: "center" }} className="w-full max-w-4xl">
            <CarouselContent className="flex">
                {productList.map((item, index) => (
                    <CarouselItem key={index} className="flex-none md:basis-1/3 lg:basis-1/3 basis-full p-2">
                        <ProductItem product={item} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default BestSellersCarousel;
