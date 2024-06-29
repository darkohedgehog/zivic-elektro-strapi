import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';

const PiCrownSimpleThin = dynamic(() => import("react-icons/pi").then((mod) => mod.PiCrownSimpleThin), { ssr: false });
const PiShootingStar = dynamic(() => import("react-icons/pi").then((mod) => mod.PiShootingStar), { ssr: false });
const IoNewspaperOutline = dynamic(() => import("react-icons/io5").then((mod) => mod.IoNewspaperOutline), { ssr: false });

const BlogSection = memo(() => {
  return (
    <article className="overflow-hidden py-20">
      <h2 className='text-xl uppercase mb-8 text-accent font-bold text-center flex items-center justify-center gap-1'>
        Otkrijte Svijet električnih instalacija
      </h2>
      <h3 className='text-gray flex items-center justify-center text-center text-xl uppercase font-semibold my-6 gap-2'>
        <PiCrownSimpleThin className='w-6 h-6 text-accent dark:text-accentDark' />
        Posjetite naš
        <span className='text-accent'>blog</span>
      </h3>
      <Image
        alt="blog"
        src="https://res.cloudinary.com/dhkmlqg4o/image/upload/v1719674889/blog1_lbien8.webp"
        width={1920}
        height={1080}
        className="h-full w-full px-2 flex items-center justify-center object-center object-contain"
        loading="lazy"
      />

      <div className="p-4 sm:p-6">
        <h3 className="text-xl text-accent dark:text-accentDark uppercase flex items-center justify-center gap-1 my-7 text-center">
          <PiShootingStar className='w-6 h-6 inline-flex' />
          Posjetite Naš Blog i Otkrijte Više
        </h3>
        <h3 className='text-lg font-medium text-accent dark:text-accentDark uppercase flex items-center justify-center gap-2 my-7 text-center'>
          Tražite korisne savjete i detaljna uputstva o našim proizvodima?
        </h3>
        <h3 className='text-lg font-medium text-accent dark:text-accentDark uppercase flex items-center justify-center gap-2 my-7 text-center'>
          Na pravom ste mjestu!
        </h3>

        <p className="mt-2 line-clamp-3 text-lg text-gray">
          Na našem blogu možete pronaći sve što vam je potrebno za sigurno i efikasno korištenje naših proizvoda. Od detaljnih šema za povezivanje prekidača i utičnica do stručnih savjeta za izbor i upotrebu elektroinstalacijskog pribora, naš blog je vaša destinacija za sve informacije i inspiraciju. Ne propustite priliku da unaprijedite svoje znanje i vještine! Kliknite ovdje i istražite najnovije članke, vodiče i savjete koje smo pripremili za vas. Vaš sledeći projekat čeka na vas!
        </p>
        <Link href={'/blog'} className='flex items-center justify-center mt-12'>
          <button className='button gap-2 uppercase flex items-center'>
            <IoNewspaperOutline className='w-5 h-5 text-accent dark:text-accentDark' />
            <span className='text-accent dark:text-accentDark'>Blog</span>
          </button>
        </Link>
      </div>
    </article>
  );
});

export default BlogSection;
