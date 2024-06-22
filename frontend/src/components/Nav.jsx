"use client";
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './hooks/useThemeSwitch';
import { UserButton, useUser } from '@clerk/nextjs';
import { GiShoppingCart } from "react-icons/gi";
import GlobalApi from '@/app/utils/GlobalApi';
import dynamic from 'next/dynamic';
import Logo from './Logo';
import { CartContext } from '@/app/context/CartContent';
import { TbTruckDelivery } from "react-icons/tb";
import { IoHomeOutline, IoStorefrontOutline, IoCallOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice } from "react-icons/hi2";


const DynamicCart = dynamic(() => import('./cart/Cart'), { ssr: false });

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    if (user && user?.primaryEmailAddress && user?.primaryEmailAddress?.emailAddress) {
      getCartItem();
    }
  }, [user]);
  

  const getCartItem = async () => {
    try {
      const response = await GlobalApi.getUserCartItems(user?.primaryEmailAddress?.emailAddress);
      setCart(response.data.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return pathname === path;
  };

  useEffect(() => {
    if (!openCart) {
      getCartItem();
    }
  }, [openCart]);

  return (
    <nav className="bg-[#F7F7F7] dark:bg-dark fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 md:max-w-full sm:max-w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-[#F7F7F7]"></span>
        </Link>
        <div className="flex md:order-2 gap-x-5 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <>
              <div className='flex text-md gap-1 cursor-pointer' onClick={() => setOpenCart(!openCart)}>
                <GiShoppingCart className='text-accent dark:text-accentDark w-6 h-6' />
                <span className='text-yellow-400'>({cart?.length})</span>
              </div>
              <UserButton afterSignOutUrl='/' />
              {openCart && <DynamicCart />}
                <Link 
                href="/orders"
                className='flex text-md gap-2 cursor-pointer'>
                <TbTruckDelivery className='w-6 h-7 text-accent dark:text-accentDark' />
                <span className='text-[12px] flex items-center justify-center text-yellow-400'>
                  Narudžbe
                  </span>
                </Link>
            </>
          ) : (
            <>
              <Link href={'/sign-in'}
                type="button"
                className="text-[#F7F7F7] bg-accent hover:bg-[#C9A0DC] focus:ring-4 
                focus:outline-none focus:ring-[#9A4EAE] font-medium rounded-lg 
                text-sm px-4 py-2 text-center dark:bg-accent dark:hover:bg-[#C9A0DC] dark:focus:ring-blue-800">
                Prijava
              </Link>
              <Link href={'/sign-up'}
                type="button"
                className="text-[#F7F7F7] bg-accent hover:bg-[#C9A0DC] focus:ring-4 
                focus:outline-none focus:ring-[#9A4EAE] font-medium rounded-lg 
                text-sm px-4 py-2 text-center dark:bg-accent dark:hover:bg-[#C9A0DC] dark:focus:ring-blue-800">
                Registracija
              </Link>
              <button onClick={handleToggle}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded={isOpen}>
                <span className="sr-only">Izbornik</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </>
          )}
        </div>
        <div className='flex md:order-2 gap-x-5 md:space-x-0 rtl:space-x-reverse'>
          <ModeToggle />
        </div>
        <div
          className={`items-center justify-between ${isOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky">
          <ul
            className="flex flex-col p-4 mt-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#F7F7F7] dark:bg-dark md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/"
                className={`flex items-center justify-center gap-1 py-2 px-3 ${isActive('/') ? 'text-accent bg-transparent' : 'text-gray-900 dark:text-accentDark'} dark:bg-dark rounded md:bg-transparent md:p-0`} aria-current={isActive('/') ? 'page' : undefined}>
                  <IoHomeOutline className='w-3 h-4' />
                  <span className='text-[12px] uppercase'>
                    Naslovna
                    </span>
              </Link>
            </li>
            <li>
              <Link href="/about"
                className={`flex items-center justify-center gap-1 py-2 px-3 ${isActive('/about') ? 'text-accent bg-transparent' : 'text-gray-900 dark:text-accentDark'} dark:bg-dark rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0`} aria-current={isActive('/about') ? 'page' : undefined}>
                  <HiOutlineBuildingOffice className='w-3 h-4' />
                  <span className='text-[12px] uppercase'>
                    O nama
                    </span>
              </Link>
            </li>
            <li>
              <Link href="/shop"
                className={`flex items-center justify-center gap-1 py-2 px-3 ${isActive('/shop') ? 'text-accent bg-transparent' : 'text-gray-900 dark:text-accentDark'} rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0`} aria-current={isActive('/services') ? 'page' : undefined}>
                  <IoStorefrontOutline className='w-3 h-4' />
                  <span className='text-[12px] uppercase'>
                    Trgovina
                    </span>
              </Link>
            </li>
            <li>
              <Link href="/contact"
                className={`flex items-center justify-center gap-1 py-2 px-3 ${isActive('/contact') ? 'text-accent bg-transparent' : 'text-gray-900 dark:text-accentDark'} rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0`} aria-current={isActive('/contact') ? 'page' : undefined}>
                  <IoCallOutline className='w-3 h-4' />
                  <span className='text-[12px] uppercase'>
                    Kontakt
                    </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
