"use client"
import React from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const GsapTextBanner = () => {
    useGSAP(() => {
        gsap.to(
            ".stagger-text",
            {
                y: 250,
                ease: "power1.inOut",
                repeat:  -2,
                yoyo: true,

                stagger:{
                    amount: 1.5,
                    axis: "y",
                    grid:  [2, 1],
                    ease: "circ.inOut",
                    from: "center"
                },
            },
            0.5
        )
    })



  return (
    <div className='my-20 py-32 lg:flex items-center justify-center gap-x-24 text-3xl uppercase font-bold hidden'>
       <div className='stagger-text w-20 h-20 bg-transparent text-stone-500 dark:text-[#F7F7F7]'>MODERAN</div>
       <div className='stagger-text w-20 h-20 bg-transparent text-stone-500 dark:text-[#F7F7F7]'>IZGLED</div>
       <div className='stagger-text w-20 h-20 bg-transparent text-accent'>VAŠEG</div>
       <div className='stagger-text w-20 h-20 bg-transparent text-stone-500 dark:text-[#F7F7F7]'>DOMA</div>
       <div className='stagger-text w-20 h-20 bg-transparent text-stone-500 dark:text-[#F7F7F7]'></div>
    </div>
  )
}

export default GsapTextBanner