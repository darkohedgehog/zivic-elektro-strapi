import Link from 'next/link'
import React from 'react'
import Logo from './Logo'
import { FiFacebook } from "react-icons/fi";
import { RiMessengerLine, RiLinkedinBoxFill, RiNextjsFill } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { SiStrapi } from "react-icons/si";
import { GiHedgehog } from "react-icons/gi";

const Footer = () => {
  return (
    <>
      <footer className="dark:bg-dark rounded-lg shadow m-4 bottom-0 w-full mx-0">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link href={"/"} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <Logo />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-accentDark"></span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-accentDark">
                <li>
                    <Link href={"/terms"} className="hover:underline me-4 md:me-6">Uvjeti korištenja</Link>
                </li>
                <li>
                    <Link href={"/privacy"} className="hover:underline me-4 md:me-6">Pravila privatnosti</Link>
                </li>
                <li>
                    <Link href={"/complaint"} className="hover:underline me-4 md:me-6">Prigovor & Reklamacije</Link>
                </li>
                <li>
                    <Link href={"/contact"} className="hover:underline">Kontakt</Link>
                </li>
            </ul>  
        </div>
        <div className='flex items-center justify-center my-16 flex-col'>
            <h3 className='text-accent dark:text-accentDark text-sm mb-4 font-semibold'>
                Budimo u kontaktu
                </h3>
        <span className="inline-flex mx-4">
                  <Link 
                  className="text-blue-500" 
                  href={'https://www.facebook.com/?locale=hr_HR'} target='blank'>
                  <FiFacebook className='h-6 w-6' />
                  </Link>
                  <Link 
                  className="text-blue-500 mx-2" 
                  href={'https://business.facebook.com/latest/inbox/messenger?asset_id=137597493551735&business_id=1133499703746344'}
                  target='blank'>
                  <RiMessengerLine className='h-6 w-6' />
                  </Link>
                  <Link 
                  className="mx-2 text-blue-500" 
                  href={'mailto:prodaja@zivic-elektro.com'} target='blank'>
                  <MdOutlineAlternateEmail className='h-6 w-6' />
                  </Link>
                  <Link 
                  className="text-blue-500 mx-2" 
                  href={'https://www.linkedin.com/in/darko-%C5%BEivi%C4%87/'} target='blank'>
                  <RiLinkedinBoxFill className='h-6 w-6' />
                  </Link>
                </span>
                </div>
        <div className="flex items-center justify-center gap-2 my-3 text-sm text-gray-500 sm:text-center dark:text-accentDark"> 
         Powered by 
         <Link href={'https://nextjs.org/'} target='blank'>
         <RiNextjsFill className='w-6 h-6' />
         </Link>
         &
         <Link href={'https://strapi.io/'} target='blank'>
         <SiStrapi className='w-6 h-6' />
         </Link>
        </div>
        <div className="flex items-center justify-center gap-2 my-6 text-sm text-gray-500 sm:text-center dark:text-accentDark"> 
         Developed by Hedgehog
         <Link href={'https://darko-zivic-web-developer.vercel.app/'} target='blank'>
         <GiHedgehog className='w-6 h-6' />
         </Link>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-accentDark"> 
        © {new Date().getFullYear()} Živić-Elektro. Sva prava zadržana. 
        <Link href={"/"} className="hover:underline">
        </Link> 
        <div className="flex items-center justify-center gap-2 my-6 text-sm text-gray-500 sm:text-center dark:text-accentDark"> 
         <Link href={'/sitemap.xml'} target='blank'>
            sitemap.xml
         </Link>
        </div>
        </span>
    </div>
</footer>


    </>
  )
}

export default Footer