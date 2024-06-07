"use client";
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GlobalApi from '@/app/utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { CartContext } from '@/app/context/CartContent';


const Cart = () => {
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:1337';
  const defaultImageUrl = '/logo.png'; // zameni sa validnom URL vrednošću

  const fetchCartItems = async () => {
    if (user && user.primaryEmailAddress && user.primaryEmailAddress.emailAddress) {
      try {
        const response = await GlobalApi.getUserCartItems(user?.primaryEmailAddress?.emailAddress);
        const cartItems = response.data.data.map(item => {
          const productData = item?.attributes?.products?.data[0];
          const imageUrl = productData?.attributes?.gallery?.data[0]?.attributes?.url ? baseUrl + productData?.attributes?.gallery?.data[0]?.attributes?.url : defaultImageUrl;
          return { ...item, imageUrl, productData };
        });
        setCart(cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user, baseUrl]);
  
  useEffect(() => {
    console.log('Cart items with images:', cart);
  }, [cart]);

  return (
    <div className='h-[350px] w-[300px] bg-gray/75 z-10 rounded-md absolute mx-auto top-14 p-5 border shadow-sm overflow-auto text-darkblue dark:text-accentDark'>
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart.map((item, index) => {
            const productData = item?.productData;
            const imageProduct = item?.imageUrl || defaultImageUrl;

            return (
              <li key={index} className="flex items-center gap-4">
                <Image
                  src={imageProduct}
                  alt={productData?.attributes?.title || 'Product Image'}
                  width={350}
                  height={350}
                  className="size-16 rounded object-cover"
                />
                <div>
                  <h3 className="text-sm text-gray-900 line-clamp-1">{productData?.attributes?.title || 'No Title'}</h3>
                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">{productData?.attributes?.category || 'No Category'}</dt>
                    </div>
                    <div>
                      <dt className="inline">€{productData?.attributes?.price || 'N/A'}</dt>
                    </div>
                  </dl>
                </div>
              </li>
            );
          })}
        </ul>
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
