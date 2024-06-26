"use client";
import React, { useEffect, memo } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const images = [
  'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1706903635/kombo_metalka_pvmgdt.jpg',
  'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1706903556/emporio_metalka_r79yje.jpg',
  'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1706903880/status_metalka_rdkauy.jpg',
  'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1706903597/set_q_og_metalka_a36uwz.jpg'
];

const ImageCarousel = memo(() => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.fromTo(
      ".carousel-img",
      { x: -300, opacity: 0 }, // Početna pozicija
      {
        duration: 2,
        x: 0, // Krajnje stanje (originalna pozicija)
        opacity: 1,
        stagger: 0.2,
        ease: "expo.out",
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex gap-x-10 overflow-hidden items-center justify-center my-10 py-10 mx-auto">
      {images.map((src, index) => (
        <Image 
          key={index} 
          src={src} 
          width={208}
          height={208}
          alt={`Carousel image ${index + 1}`} 
          className="carousel-img w-52 h-52 object-cover rounded-2xl"
          loading="lazy" 
        />
      ))}
    </div>
  );
});

export default ImageCarousel;
