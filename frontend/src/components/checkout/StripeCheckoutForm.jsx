"use client";
import React, { useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

const StripeCheckoutForm = ({ orderData, handlePayment, setError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success`,
        receipt_email: orderData.email,
      },
      redirect: 'if_required'
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      handlePayment();
    } else {
      setError('Unexpected state: ' + paymentIntent.status);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700"
      >
        {loading ? 'Processing...' : 'Pay with Card'}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
