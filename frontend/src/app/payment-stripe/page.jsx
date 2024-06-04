"use client";
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContent';
import GlobalApi from '@/app/utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import dynamic from 'next/dynamic';


// Load Stripe outside of a component’s render to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Dynamically import CheckoutForm to ensure it only renders on the client
const StripeCheckoutForm = dynamic(() => import('@/components/checkout/StripeCheckoutForm'), { ssr: false });

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const [orderData, setOrderData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    billingAddress: '',
    shippingAddress: '',
    companyName: '',
    taxID: '',
    paymentMethod: 'Card',
    totalAmount: 0,
    products: [],
    quantity: 0,
    price: 0,
  });

  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [clientOnly, setClientOnly] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setClientOnly(true);  // Ensure this component is only rendered on the client
  }, []);

  useEffect(() => {
    let total = 0;
    const productDetails = cart.map(item => {
      const productData = item?.attributes?.products?.data[0];
      const price = parseFloat(productData?.attributes?.price) || 0;
      const quantity = item?.attributes?.quantity || 1;
      const title = productData?.attributes?.title || "Unknown Product";
      total += price * quantity;
      return {
        product: productData?.id,
        title,
        quantity,
        price
      };
    });

    const totalAmount = total + 4.00; // Add shipping cost

    setOrderData(prevState => ({
      ...prevState,
      totalAmount,
      products: productDetails.map(detail => ({ id: detail.product, title: detail.title })),
      quantity: productDetails.reduce((sum, detail) => sum + detail.quantity, 0),
      price: total
    }));

    if (orderData.email) { // Ensure we have an email before creating the payment intent
      // Create a PaymentIntent as soon as the page loads
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: totalAmount * 100, // Amount in cents
          customer: {
            email: orderData.email,
            firstName: orderData.firstName,
            lastName: orderData.lastName,
          }
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => {
          console.error('Error fetching client secret:', error);
          setError('Failed to initialize payment. Please try again.');
        });
    }

  }, [cart, orderData.email, orderData.firstName, orderData.lastName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const sendConfirmationEmail = async (orderData) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderData }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      console.log('Confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  const handlePayment = async () => {
    try {
      const updatedOrderData = { ...orderData, paymentMethod: 'Card' };
      console.log('Order data before sending:', updatedOrderData);
  
      const response = await GlobalApi.createOrder(updatedOrderData);
      console.log('Order created:', response.data);
      await GlobalApi.clearCart();
      setCart([]);
  
      await sendConfirmationEmail(updatedOrderData);  // Email se šalje nakon uspešnog kreiranja narudžbe
      setSuccess(true);
      router.push('/order-success');
    } catch (error) {
      console.error('Error creating order:', error);
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
      }
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" name="firstName" value={orderData.firstName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" name="lastName" value={orderData.lastName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={orderData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="text" name="phoneNumber" value={orderData.phoneNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
            <input type="text" name="billingAddress" value={orderData.billingAddress} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
            <input type="text" name="shippingAddress" value={orderData.shippingAddress} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
            <input type="text" name="companyName" value={orderData.companyName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID (Optional)</label>
            <input type="text" name="taxID" value={orderData.taxID} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
        </div>
        {clientSecret && clientOnly && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripeCheckoutForm orderData={orderData} handlePayment={handlePayment} setError={setError} />
          </Elements>
        )}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">Payment successful!</p>}
    </div>
  );
};


export default Checkout;