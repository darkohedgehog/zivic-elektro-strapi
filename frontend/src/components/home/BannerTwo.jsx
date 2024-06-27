import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GiShoppingCart } from "react-icons/gi";

const images = 'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1713901252/kombo_asliwa.png';

const BannerTwo = () => {
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-2xl px-4 py-11 mt-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
            <div className="relative z-10 lg:py-16 order-last lg:order-first">
              <div className="relative h-64 sm:h-80 lg:h-full">
                <Image
                  alt="BannerTwo"
                  src={images}
                  width={300}
                  height={300}
                  priority={false}
                  className="absolute inset-0 h-full w-full object-cover rounded-md shadow-lg shadow-accent dark:shadow-gray"
                />
              </div>
            </div>
            <div className="relative flex flex-col items-center lg:items-start lg:py-16 bg-gray-100 p-4 sm:p-6 lg:p-8">
              <h1 className="text-2xl font-bold sm:text-3xl text-accent dark:text-accentDark mb-4 lg:mb-8">
                Ukrasite svoj dom našim proizvodima!
              </h1>
              <p className="my-4 lg:my-6 text-gray">
              U potrazi ste za visokokvalitetnim prekidačima, utičnicama, kućnim zvonima, spojkama ili utikačima?
              </p>
              <p className='my-2 lg:my-2“ text-xl text-accent dark:text-accentDark'>
              Ne tražite dalje!
              </p>
                <p className="my-2 text-gray">
                Naša web trgovina nudi širok asortiman proizvoda koji kombinuju funkcionalnost i stil, zadovoljavajući sve vaše potrebe za elektro galanterijom.
                </p>
                <p className="my-2 text-gray">
                🔲 Prekidači i utičnice: Od modernog dizajna do klasičnih rješenja, naši proizvodi unose eleganciju i praktičnost u svaki kutak vašeg doma.
                </p>
                <p className="my-2 text-gray">
                🔔 Kućna Zvona: Neka vaša ulazna vrata dobiju zasluženi pažnju sa našim vrhunskim kućnim zvonima. Zvuk koji nećete propustiti!
                </p>
                <p className="my-2 text-gray">
                🔗 Spojke i utikači: Sigurnost i pouzdanost su naša garancija. Naši spojni elementi osiguravaju besprekornu vezu između svih vaših uređaja.
                </p>
                <p className="my-2 text-gray">
                Iskoristite naše povoljne cijene i odlične ponude! Istražite našu trgovinu i otkrijte savršene proizvode za vaš dom. Kupovina nikada nije bila lakša i sigurnija. Pridružite se zadovoljnim kupcima koji su već unapredili svoje domove uz pomoć naše elektro galanterije.
                </p>
                <p className="my-2 text-gray">
                🔋 Brza dostava | 🛠️ Visok kvalitet | 💡 Izvanredna podrška
                </p> 
                <p className="my-4 text-gray">
                Posjetite nas sada i osvijetlite svoj dom s našim vrhunskim proizvodima!
                </p>
              <Link href={'/contact'} className="button uppercase text-sm mt-6">
                <span className='text-accent dark:text-accentDark flex gap-2'>
                  <GiShoppingCart className='w-4 h-5' />
                  Istraži
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerTwo;
