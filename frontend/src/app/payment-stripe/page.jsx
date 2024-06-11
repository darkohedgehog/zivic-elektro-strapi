"use client";
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContent';
import GlobalApi from '@/app/utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';
import CustomerForm from '../../components/checkout/CostumerForm';

// Load Stripe outside of a component’s render to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Dynamically import CheckoutForm to ensure it only renders on the client
const StripeCheckoutForm = dynamic(() => import('@/components/checkout/StripeCheckoutForm'), { ssr: false });

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
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
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const fetchCartItems = async () => {
    if (user && user.primaryEmailAddress) {
      try {
        const response = await GlobalApi.getUserCartItems(user.primaryEmailAddress.emailAddress);
        setCart(response.data.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  useEffect(() => {
    if (user) {
      setOrderData(prevState => ({
        ...prevState,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        phoneNumber: user.primaryPhoneNumber ? user.primaryPhoneNumber.phoneNumber : ''
      }));
    }
  }, [user]);

  useEffect(() => {
    let total = 0;
    const productDetails = cart.map(item => {
      const productData = item?.attributes?.products?.data[0];
      const price = parseFloat(productData?.attributes?.price) || 0;
      const quantity = item?.attributes?.quantity || 1;
      total += price * quantity;
      return {
        product: productData?.id,
        title: productData?.attributes?.title || "Unknown Product",
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
            phoneNumber: orderData.phoneNumber
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

  useEffect(() => {
    // Ensure this component is only rendered on the client
    setIsClient(true);
  }, []);

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
  
      await sendConfirmationEmail(updatedOrderData); // Email se šalje nakon uspešnog kreiranja narudžbe
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
        <form>
       <CustomerForm orderData={orderData} handleChange={handleChange} />
        </form>
        {clientSecret && isClient && (
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
