import Bank from '@/components/payment/Bank'
import React from 'react'

export async function generateMetadata() {
  return {
    title: "Bankarska transakcija",
    description: "Platite putem bankarske transakcije",
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

const BankTransfer = () => {
  return (
    <>
    <Bank />
    </>
  )
}

export default BankTransfer