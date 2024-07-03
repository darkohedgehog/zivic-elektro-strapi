import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';
import ButtonStyle from './ButtonStyle';

const PiCrownSimpleThin = dynamic(() => import("react-icons/pi").then((mod) => mod.PiCrownSimpleThin), { ssr: false });
const PiShootingStar = dynamic(() => import("react-icons/pi").then((mod) => mod.PiShootingStar), { ssr: false });


const images = [
    'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1720037827/cleaning_djoafi.webp',
    'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1720037923/vacumbag_ii5nh3.webp',
    'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1720037827/vacumcleaner_ahamib.webp'
];

const BannerThree = memo(() => {
    return (
      <section className="overflow-hidden py-20">
        <h2 className='text-xl uppercase mb-1 lg:mb-8 text-accent font-bold text-center flex items-center justify-center gap-1'>
        <PiCrownSimpleThin className='w-6 h-6 text-accent dark:text-accentDark' />
          Otjerajte dosadnu prašinu
        </h2>
        <h3 className='text-gray flex items-center justify-center text-center text-xl uppercase font-semibold my-1 gap-2'>
          Neka vaš usisivač dobije novu snagu
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
            Vrećice za usisivače
          </h3>
          <h3 className='text-lg font-medium text-accent dark:text-accentDark uppercase flex items-center justify-center gap-2 my-4 text-center'>
           Za sve popularne brendove usisvača 
          </h3>
          <h3 className='text-lg font-medium text-accent dark:text-accentDark uppercase flex items-center justify-center gap-2 my-7 text-center'>
            Provjerite našu ponudu
          </h3>
          <div className='mt-8'>
            <Link href={'/category/Vrećice za usisivače'}>
          <ButtonStyle />
            </Link>
         </div>
        </div>
      </section>
    );
  });

export default BannerThree;
