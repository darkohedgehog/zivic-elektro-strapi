import Cash from '@/components/payment/Cash'
import React from 'react'

export async function generateMetadata() {
  return {
    title: "Plaćanje pouzećem",
    description: "Platite prilikom preuzimanja robe",
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

const CashOnDelivery = () => {
  return (
    <>
    <Cash/>
    </>
  )
}

export default CashOnDelivery