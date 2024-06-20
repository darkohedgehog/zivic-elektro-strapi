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
    <div >
    <form onSubmit={handleSubmit}>
      <PaymentElement className="mx-10 my-4 flex items-center justify-center" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="button flex items-center justify-center my-10 mx-auto"
      >
        {loading ? 'U tijeku...' : 'Platite'}
      </button>
    </form>
    </div>
  );
};

export default StripeCheckoutForm;
