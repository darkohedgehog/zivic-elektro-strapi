"use client"
import React from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';

const images = [
  'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1713901252/kombo_asliwa.png',
  'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1713901222/happy_usiuzb.png',
  'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1713901328/emorio_pqhljz.png',
  'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1713901293/setq_vohn9o.png'
];

const ImageCarousel = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".carousel-img",
      { x: -300, opacity: 0 }, // Početna pozicija
      {
        duration: 2,
        x: 0, // Krajnje stanje (originalna pozicija)
        opacity: 1,
        stagger: 0.2,
        ease: "expo.out",
        repeat: -1,
        
      }
    );
  })
  return (
    <div className="flex gap-x-10 overflow-hidden items-center justify-center my-10 py-10 mx-auto">
      {images.map((src, index) => (
        <Image 
        key={index} 
        src={src} 
        width={52}
        height={52}
        alt={`Carousel image ${index + 1}`} 
        className="carousel-img w-52 h-52 object-cover rounded-2xl" />
      ))}
    </div>
  );
};

export default ImageCarousel;
