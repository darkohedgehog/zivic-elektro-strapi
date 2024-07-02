import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';

const PiCrownSimpleThin = dynamic(() => import("react-icons/pi").then((mod) => mod.PiCrownSimpleThin), { ssr: false });
const PiShootingStar = dynamic(() => import("react-icons/pi").then((mod) => mod.PiShootingStar), { ssr: false });
const IoIosSearch = dynamic(() => import("react-icons/io").then((mod) => mod.IoIosSearch), { ssr: false });

const images = [
    'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1719864633/bannersection4_v7x7w5.webp',
    'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1713901222/happy_usiuzb.png',
    'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1719846842/septembar_-_devojcica_uxnfge.jpg'
];

const BannerThree = memo(() => {
    return (
      <section className="overflow-hidden py-20">
        <h2 className='text-xl uppercase mb-1 lg:mb-8 text-accent font-bold text-center flex items-center justify-center gap-1'>
        <PiCrownSimpleThin className='w-6 h-6 text-accent dark:text-accentDark' />
          Obradujte svoje najmlađe
        </h2>
        <h3 className='text-gray flex items-center justify-center text-center text-xl uppercase font-semibold my-1 gap-2'>
          Opremite sobu svog djeteta programom
          Happy
        </h3>
        <div className='flex items-center justify-center gap-8 mx-2 lg:mx-auto -my-20 lg:my-10'>
          {images.map((src, index) => (
            <div key={index} className="h-[400px] w-[450px] flex items-center justify-center">
              <Image
                alt={`Carousel image ${index + 1}`} 
                src={src}
                width={450}
                height={400}
                className="object-center object-contain lg:object-cover h-[400px] w-[450px] rounded-lg lg:shadow-lg lg:shadow-accentDark shake"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="p-1 sm:p-6">
          <h3 className="text-xl text-accent dark:text-accentDark uppercase flex items-center justify-center gap-1 text-center">
            <PiShootingStar className='w-6 h-6 inline-flex' />
            Birajte program Happy
          </h3>
          <h3 className='text-lg font-medium text-accent dark:text-accentDark uppercase flex items-center justify-center gap-2 my-4 text-center'>
            I ne brinite, svi proizvodi su sa zaštitom od dodira
          </h3>
          <h3 className='text-lg font-medium text-accent dark:text-accentDark uppercase flex items-center justify-center gap-2 my-7 text-center'>
            Uljepšajte djetetov kutak!
          </h3>
          <Link href={'/category/Happy'} className='flex items-center justify-center mt-12'>
            <button className='button gap-2 uppercase flex items-center'>
              <IoIosSearch className='w-5 h-5 text-accent dark:text-accentDark' />
              <span className='text-accent dark:text-accentDark text-sm'>Istraži</span>
            </button>
          </Link>
        </div>
      </section>
    );
  });

export default BannerThree;
