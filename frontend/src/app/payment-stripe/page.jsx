import CardPayment from '@/components/payment/CardPayment'
import React from 'react'

export async function generateMetadata() {
  return {
    title: "Plaćanje karticom",
    description: "Platite karticom",
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

const CardCheckout = () => {
  return (
    <>
    <CardPayment />
    </>
  )
}

export default CardCheckout