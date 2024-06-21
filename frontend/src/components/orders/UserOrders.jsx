"use client"
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/utils/GlobalApi';
import OrderList from '@/components/orders/OrderList';
import { useUser } from '@clerk/nextjs';

const UserOrders = () => {
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
    </div>
  );
};

export default UserOrders;
