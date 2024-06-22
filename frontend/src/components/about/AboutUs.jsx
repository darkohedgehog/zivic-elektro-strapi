import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoCallOutline } from "react-icons/io5";


const images ='https://res.cloudinary.com/dhkmlqg4o/image/upload/v1710274217/home1.webp';

const AboutUs = () => {
  return (
    <>
    <section>
  <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
      <div className="relative z-10 lg:py-16">
        <div className="relative h-64 sm:h-80 lg:h-full">
          <Image
            alt="O nama"
            src={images}
            width={300}
            height={300}
            priority={false}
            className="absolute inset-0 h-full w-full object-cover rounded-md shadow-lg shadow-accent dark:shadow-gray"
          />
        </div>
      </div>
      <div className="relative flex items-center bg-gray-100">
        <span
          className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"
        ></span>
        <div className="p-8 sm:p-16 lg:p-24">
          <h2 className="text-2xl font-bold sm:text-3xl text-accent dark:text-accentDark mb-8">
          Preporučujemo se u vašem budućem snabdjevanju!
          </h2>
          <p className="my-6 text-gray">
          Živić elektro  je tvrtka za trgovinu i usluge u privatnom vlasništvu osnovana 1998 godine u Hrvatskoj. Na tržištu Republike Hrvatske nastupamo kao generalni distributeri i uvoznici proizvoda Metalke Majur, lidera u proizvodnji elektro galanterije u ovom dijelu Europe.
          </p>
          <p className="my-6 text-gray">
          U našoj prodajnoj ponudi možete pronaći proizvode iz asortimana firmi Nopallux, Tehnoelektro i Elid koji svojom tradicijom kvaliteta garantiraju sigurnost, pouzdanost, ljepotu i stil svojih proizvoda. 
          </p>
          <p className="my-6 text-gray">
          U svojoj ponudi vam predstavljamo široku lepezu proizvoda, kao što su: utičnice, sklopke, tipkala, utikači i elektro instalacijski pribor.
          </p>
          <p className="my-6 text-gray">
          Svoju djelatnost ostvarujemo kroz maloprodaju i veleprodaju.
          </p>
         
          <Link
            href={'/contact'}
            className="button uppercase text-sm"
          >
            <span className='text-accent dark:text-accentDark flex gap-2'>
            <IoCallOutline className='w-4 h-5' />
            Kontakt
            </span>
          </Link>
        </div>
      </div>
    </div>
    <div className='flex flex-col'>
    <h3 className="my-6 text-accent dark:text-accentDark">
          ŽIVIĆ-ELEKTRO j.d.o.o.
          </h3>
          <p className="my-2 text-gray">
          Sjedište: 204. Vukovarske brigade 39, 32000 Vukovar
          </p>
          <p className="my-1 text-gray">
          MB: 2945894
          </p>
          <p className="my-1 text-gray">
          OIB: 90344764519
          </p>
          <p className="my-1 text-gray">
          IBAN: HR09 2500 0091 1013 8698 0
          </p>
          <p className="my-1 text-gray"> 
          Upisan u Trgovačkom sudu u Osijeku, MBS: 030125449.
          </p>
          <p className="my-1 text-gray">
          Temeljni kapital 10,00 kn i uplaćen je u cjelosti.
          </p>
         <p className="my-1 text-gray">
         Pravno ustrojbeni oblik: jednostavno društvo sa ograničenom odgovornošću.
         </p>
         <p className="my-1 text-gray">
         Brojčana oznaka: 49
         </p>
         <p className="my-1 text-gray">
         Djelatnost: brojčana oznaka razreda 4759
         </p>
    </div>
  </div>
</section>
    </>
  )
}

export default AboutUs