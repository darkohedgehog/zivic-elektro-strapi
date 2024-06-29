"use client";
import React, { useEffect, memo } from 'react';
import gsap from 'gsap';

const GsapTextBanner = memo(() => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.fromTo(
      ".stagger-text",
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
    <div className='my-8 py-12 md:my-18 md:py-26 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-3xl uppercase font-bold mx-auto'>
      <div className='stagger-text text-gray flex-none px-2'>MODERAN</div>
      <div className='stagger-text text-gray flex-none px-2'>IZGLED</div>
      <div className='stagger-text flex-none px-2 text-accent'>VAŠEG</div>
      <div className='stagger-text text-gray flex-none px-2'>DOMA</div>
    </div>
  );
});

export default GsapTextBanner;
