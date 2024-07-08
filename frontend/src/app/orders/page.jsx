import UserOrders from '@/components/orders/UserOrders';
import React from 'react'

export async function generateMetadata() {
  return {
    title: "Vaše narudžbe",
    description: "Ovdje možete vidjeti vaše narudžbe",
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

const OrdersPage = () => {
  return (
    <>
    <UserOrders />;
    </>
  )
};

export default OrdersPage;
