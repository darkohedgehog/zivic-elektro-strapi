"use client";
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContent';
import GlobalApi from '@/app/utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import CostumerForm from '@/components/checkout/CostumerForm';
import CartPreview from '@/components/cart/CartPreview';
import { AiOutlineShoppingCart } from "react-icons/ai";

const CashOnDelivery = () => {
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
    paymentMethod: 'Cash On Delivery',
    totalAmount: 0,
    products: [],
    quantity: 0,
    price: 0,
  });

  const router = useRouter();

  const fetchCartItems = async () => {
    if (user && user.primaryEmailAddress) {
      try {
        const response = await GlobalApi.getUserCartItems(user?.primaryEmailAddress?.emailAddress);
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

    setOrderData(prevState => ({
      ...prevState,
      totalAmount: total + 4.00,
      products: productDetails.map(detail => ({ id: detail.product, title: detail.title })),
      quantity: productDetails.reduce((sum, detail) => sum + detail.quantity, 0),
      price: total
    }));
  }, [cart]);

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
      const updatedOrderData = { ...orderData, paymentMethod: 'Cash On Delivery' };
      console.log('Order data before sending:', updatedOrderData);
  
      const response = await GlobalApi.createOrder(updatedOrderData);
      console.log('Order created:', response.data);
      await GlobalApi.clearCart();
      setCart([]);
  
      await sendConfirmationEmail(updatedOrderData);
      router.push('/order-success');
    } catch (error) {
      console.error('Error creating order:', error);
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
      }
    }
  };

  
  return (
    <div className="container mx-auto p-28">
     <h1 
      className="text-2xl font-bold mb-6 flex justify-center items-center text-accent dark:text-accentDark uppercase">
        Plaćanje
        </h1>
      <h2 className='text-xl font-semibold mb-6 flex justify-center items-center text-accent dark:text-accentDark uppercase'
      >Molimo popunite Vaše podatke
      </h2>
      <form>
      <CostumerForm orderData={orderData} handleChange={handleChange} />
      </form>
      <div className='flex flex-col my-20 h-[300px] w-full sm:w-[500px] border-y-2 border-accent dark:border-accentDark rounded-lg shadow-xl shadow-slate-500 dark:shadow-gray z-20 mx-auto'>
         <div className='mx-3 mt-4 overflow-auto'>
        <h3 className='mx-auto my-6 font-semibold text-accent dark:text-accentDark'>
          Podsjetite se šta ste kupili
        </h3>
       <CartPreview />
        </div>
       </div>
      <div className="mt-6">
        
        <div className='flex flex-col my-20 h-full w-full sm:w-[500px] border-y-2 border-accent dark:border-accentDark rounded-lg shadow-xl shadow-slate-500 dark:shadow-gray z-20 mx-auto text-accent dark:text-accentDark'>
        <div className='my-6 mx-auto flex flex-col items-center justify-center'>
          <div className='flex mb-7 mx-auto justify-center items-center uppercase'>
            Plaćanje prilikom preuzimanja
            </div>
        <button type="button" className="button" onClick={handlePayment}>
            <span className='mx-auto font-light uppercase flex gap-2 justify-center items-center'>
            <AiOutlineShoppingCart className='h-5 w-5' />
              Naručite</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CashOnDelivery;
