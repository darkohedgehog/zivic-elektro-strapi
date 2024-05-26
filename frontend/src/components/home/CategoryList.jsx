import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import CategoryItem from './CategoryItem';

const CategoryList = ({ categoryList }) => {
   

    if (!categoryList) {
        return <div>Učitavam proizvode...</div>; // Or handle the undefined state appropriately
    }

    return (
        <Carousel opts={{ align: "center" }} className="w-full max-w-4xl">
            <CarouselContent className="flex">
                {categoryList.map((item, index) => (
                    <CarouselItem key={index} className="flex-none md:basis-1/3 lg:basis-1/3 basis-full p-2">
                        <CategoryItem category={item} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default CategoryList;
