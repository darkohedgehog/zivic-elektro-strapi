"use client";
import { useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const InfoBanner = dynamic(() => import('./InfoBanner'), { ssr: false });

const images = [
  'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1710274217/home1.webp',
  'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1710274209/home2.webp',
  'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1710274202/home3.webp',
  'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1710274188/home4.webp'
];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(".banner-content", { opacity: 0, duration: 0.5, ease: "power1.out" })
      .to(".banner-content", { opacity: 1, duration: 0.5, ease: "power1.in" });

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mb-7">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="text-center banner-content">
          <h1 className="text-4xl font-bold text-accent mb-3 uppercase">Najbolji elektromaterijal na dohvat ruke</h1>
          <p className="text-3xl text-[#fef5ef] font-bold text-pretty">
            Sve što vam treba za profesionalne ili kućne elektroinstalacije
          </p>
        </div>
      </div>
      <Image
        width={1920}
        height={1080}
        src={images[currentImage]}
        className="w-full h-[calc(100vh-4rem)] object-cover object-center transition-opacity duration-1000 ease-linear" 
        alt="Elektromaterijali"
        priority={true}
      />
      <InfoBanner />
    </div>
  );
};

export default Banner;
