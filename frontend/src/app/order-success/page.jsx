import LottieAnimation from '@/components/orders/LottieAnimation';
import Link from 'next/link';
import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";

const OrderSuccess = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mt-24 flex justify-center items-center text-accent dark:text-accentDark uppercase">
        Hvala Vam na narudžbi !
      </h1>
      <p className="text-lg text-accent dark:text-accentDark flex justify-center items-center my-10">
        Vaša narudžba je uspješno poslana !
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center w-full">
        <div className="w-full md:w-1/2 flex justify-center md:justify-end md:border-r-2 border-solid border-dark dark:border-light">
          <LottieAnimation />
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-start mt-4 md:mt-0">
          <p className="text-lg text-accent dark:text-accentDark text-center md:text-left ml-4">
            Vaša narudžba je uspješno kreirana i čeka prikup od strane dostavne službe!
            Ukoliko ste platili putem bankarske transakcije ili karticom, narudžba se pakira i šalje nakon proknjižene uplate.
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center mt-8'>
        <p className='text-lg text-accent dark:text-accentDark uppercase text-center'>
          Ovdje možete pogledati sve vaše narudžbe:
        </p>
        <Link 
          href={'/orders'}
          className='flex mt-8'>
          <button className='button'
          ><TbTruckDelivery className='w-6 h-7 text-accent dark:text-accentDark' />
           <span className='text-sm text-accent dark:text-accentDark uppercase'>
            Narudžbe
            </span> 
          </button>
        </Link>
      </div>
      <div className='flex flex-col items-center justify-center mt-8'>
        <p className='text-lg text-accent dark:text-accentDark uppercase text-center'>
          Ili nastavite uživati na našoj stranici:
        </p>
        <Link 
          href={'/'}
          className='flex mt-8'>
          <button className='button'
          ><IoHomeOutline className='w-6 h-7 text-accent dark:text-accentDark' />
           <span className='text-sm text-accent dark:text-accentDark uppercase'>
            Naslovna
            </span> 
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
