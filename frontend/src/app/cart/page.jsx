import CartMain from '@/components/cart/CartMain'
import React from 'react'

export async function generateMetadata() {
  return {
    title: "Košarica",
    description: "Vaša korpa sa proizvodima.",
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

const CartPage = () => {
  return (
    <>
    <CartMain />
    </>
  )
}

export default CartPage