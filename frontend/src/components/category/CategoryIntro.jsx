import Image from 'next/image';
import React from 'react'



const images ='https://res.cloudinary.com/dhkmlqg4o/image/upload/v1719335048/CategoryBanner_vvkidd.png';

const CategoryIntro = () => {
  return (
    <>   
  <div className="mx-auto max-w-screen-2xl px-4 mb-6 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
      <div className="relative z-10 lg:pt-36">
        <div className="relative h-64 lg:h-[500px]">
          <Image
            alt="O nama"
            src={images}
            width={300}
            height={300}
            priority={false}
            className="absolute inset-0 h-full w-full object-cover rounded-md shadow-lg shadow-accentDark dark:shadow-gray"
          />
        </div>
      </div>
      <div className="relative flex items-center">
        <div className="p-8 sm:p-16 lg:p-24">
          <h2 className="text-2xl font-bold sm:text-3xl text-accent dark:text-accentDark">
          Mnogo više mogućnosti!
          </h2>
          <p className="my-6 text-gray">
          💡 Otkrijte Kombo – modularni program sklopki i priključnica vrhunskog kvaliteta i modernog dizajna, koji vam omogućava potpunu autonomiju u izboru opreme i boja, uz dugotrajan komfor i uštedu prostora.
          </p>
          <p className="my-6 text-gray">
          🔲 🔲 🔲 Program Status osmišljen je kao program oštrih linija i suvremenog dizajna, a kvaliteta je utemeljena i bazirana na dugogodišnjem iskustvu razvojnog tima Metalke Majur, kao i veoma detaljnom proučavanju europskih standarda.
          </p>
          <p className="my-6 text-gray">
          🔘 Premijer + prepoznatljivi obli dizajn tipkala našao je svoju primjenu prvenstveno u prvoj ugradnji, kao definitivno najbolji spoj kvalitete, asortimana i dizajna.
         </p>
         <p className="my-6 text-gray"> 
         🔲 Emporio je u prvom redu namjenjen klijentima koji žele nešto drugačiji, ali vrlo suvremen dizajn. Lako se uklapa kako u standardne prostore, tako i u objekte više klase.
         </p>
         <p className="my-6 text-gray">
         ☀️ Program Happy dizajniran je sa namjerom da dječije sobe, vrtiće, škole i druge prostore u kojima borave djeca učini zabavnijim i interesantnijim.
         </p>
        </div>
      </div>
    </div>
    <h3 className='my-10 flex items-center justify-center text-center text-accentDark text-2xl uppercase font-semibold'>
        Koja je vaša kombinacija?
      </h3>
  </div>
    </>
  )
}

export default CategoryIntro