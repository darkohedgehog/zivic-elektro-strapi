"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, clearCart } from '@/reducers/CartSlice';
import GlobalApi from '@/app/utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';
import CustomerForm from '../../components/checkout/CostumerForm';
import CartPreview from '@/components/cart/CartPreview';

// Load Stripe outside of a component’s render to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Dynamically import CheckoutForm to ensure it only renders on the client
const StripeCheckoutForm = dynamic(() => import('@/components/checkout/StripeCheckoutForm'), { ssr: false });

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
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
    productQuantities: [],
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
        dispatch(setCart(response.data.data));
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
      totalAmount: total + 4.00,
      products: productDetails.map(detail => ({ id: detail.product, title: detail.title })),
      productQuantities: productDetails.map(detail => ({ product: detail.product, Quantity: detail.quantity })),
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
      dispatch(clearCart());
  
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
      <h1 className="text-2xl font-bold mt-20 flex items-center justify-center text-accent dark:text-accentDark uppercase">Plaćanje
      </h1>
      <h2 className='text-xl font-semibold my-6 flex justify-center items-center text-accent dark:text-accentDark uppercase'
      >Molimo popunite Vaše podatke
      </h2>
      <div>
        <form className='p-8 my-8'>
       <CustomerForm orderData={orderData} handleChange={handleChange} />
        </form>
        <div className='flex flex-col my-20 h-[300px] w-full sm:w-[500px] border-y-2 border-accent dark:border-accentDark rounded-lg shadow-xl shadow-slate-500 dark:shadow-gray z-20 mx-auto'>
         <div className='mx-3 mt-4 overflow-auto'>
        <h3 className='mx-auto my-6 font-semibold text-accent dark:text-accentDark'>
          Podsjetite se šta ste kupili
        </h3>
       <CartPreview />
        </div>
       </div>
      <div className="flex flex-col my-20 h-full w-full sm:w-[500px] border-y-2 border-accent dark:border-accentDark rounded-lg shadow-xl shadow-slate-500 dark:shadow-gray z-20 mx-auto">
        {clientSecret && isClient && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripeCheckoutForm orderData={orderData} handlePayment={handlePayment} setError={setError} />
          </Elements>
        )}
        </div>
      </div>
      {error && <p className="text-red-500 my-8 flex items-center justify-center">{error}</p>}
      {success && <p className="text-green-500 my-8 flex items-center justify-center">Plaćanje uspješno!</p>}
    </div>
  );
};

export default Checkout;
