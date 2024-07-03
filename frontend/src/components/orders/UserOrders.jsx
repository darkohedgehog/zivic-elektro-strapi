"use client"
import React, { memo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import GlobalApi from '@/app/utils/GlobalApi';
import OrderList from '@/components/orders/OrderList';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
const GiShoppingCart = dynamic(() => import('react-icons/gi').then((mod) => mod.GiShoppingCart), { ssr: false });

const UserOrders = memo (() => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      GlobalApi.getUserOrders(user.primaryEmailAddress.emailAddress).then(resp => {
        setOrders(resp.data.data);
      }).catch(error => {
        console.error("Error fetching user orders:", error);
      });
    }
  }, [user]);

  return (
    <div className='px-10 md:px-20 flex flex-col items-center justify-center pb-10 mt-28'>
      <h2 className='text-[24px] uppercase font-bold mb-4 pb-7 text-accent dark:text-accentDark'>
        Vaše narudžbe
        </h2>
      {orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <div>Učitavam narudžbe...</div>
      )}
      <div className='flex items-center justify-center py-8'>
              <Link href={'/shop'} className="button uppercase text-sm mt-6">
              <span className='text-accent dark:text-accentDark flex gap-2'>
                <GiShoppingCart className='w-4 h-5' />
                Trgovina
              </span>
            </Link>
      </div>
    </div>
  );
});

export default UserOrders;
