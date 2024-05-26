"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const BankTransfer = () => {
  const router = useRouter();

  const handleConfirmPayment = () => {
    // Simulate confirming the payment
    router.push('/order-success');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Bank Transfer Payment</h1>
      <p>Please transfer the total amount to the following bank account:</p>
      <ul>
        <li>Account Name: Your Company Name</li>
        <li>Account Number: 123456789</li>
        <li>Bank Name: Your Bank</li>
        <li>IBAN: XX00 XXXX 0000 0000 0000 0000</li>
        <li>SWIFT/BIC: XXXXXXXX</li>
      </ul>
      <button onClick={handleConfirmPayment} className="bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 mt-4">
        Confirm Payment
      </button>
    </div>
  );
};

export default BankTransfer;
