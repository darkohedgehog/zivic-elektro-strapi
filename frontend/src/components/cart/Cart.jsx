"use client";
import React from 'react';
import Link from 'next/link';
import CartPreview from './CartPreview';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className='h-[350px] w-[300px] bg-gray/80 z-10 rounded-md absolute mx-auto top-14 mt-12 lg:mt-4 p-5 border shadow-sm overflow-auto text-darkblue dark:text-accent'>
      <div className="mt-4 space-y-6">
        <CartPreview />
      </div>
      <div className="space-y-4 text-center mt-5">
        <Link
          href="/cart"
          className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
        >
          Vidi košaricu ({cart?.length})
        </Link>
        <Link
          href="/shop"
          className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
        >
          Nastavi kupovati
        </Link>
      </div>
    </div>
  );
};

export default Cart;
