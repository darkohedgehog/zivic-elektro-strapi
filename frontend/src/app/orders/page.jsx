"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/app/utils/GlobalApi';
import OrderList from '@/components/orders/OrderList';

const UserOrders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      getUserOrders_();
    }
  }, [user]);

  const getUserOrders_ = async () => {
    try {
      const response = await GlobalApi.getUserOrders();
      console.log(response.data.data); // Dodajte ovo za debagovanje
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  return (
    <div className='px-10 md:px-20 flex flex-col items-center justify-center pb-10'>
      <h2 className='text-[24px] uppercase font-bold mb-4 pb-7'>Moje narudžbe</h2>
      {orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <div>Nemate narudžbi</div>
      )}
    </div>
  );
};

export default UserOrders;
