import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="dark:bg-dark rounded-lg shadow m-4 bottom-0 w-full mx-0">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <Image 
                src="/logo.png" 
                className="h-8 w-auto" 
                alt="Logo" 
                width={80}
                height={40}
                priority={true}/>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-accentDark"></span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-accentDark">
                <li>
                    <Link href="/about" className="hover:underline me-4 md:me-6">O nama</Link>
                </li>
                <li>
                    <Link href="/terms" className="hover:underline me-4 md:me-6">Uvjeti korištenja</Link>
                </li>
                <li>
                    <Link href="#" className="hover:underline me-4 md:me-6">Licensing</Link>
                </li>
                <li>
                    <Link href="/contact" className="hover:underline">Kontakt</Link>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-accentDark"> © {new Date().getFullYear()} Živić-Elektro. Sva prava zadržana. <Link href="/" className="hover:underline"></Link> </span>
    </div>
</footer>


    </>
  )
}

export default Footer