import React from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripeCheckoutForm = ({ orderData, handlePayment, setError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

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
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      handlePayment();
    } else {
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700">
        Pay Now
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
