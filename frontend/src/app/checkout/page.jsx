"use client";
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContent';
import GlobalApi from '@/app/utils/GlobalApi';
import { useRouter } from 'next/navigation';  // Import useRouter for navigation

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
    totalAmount: 0,
    orderDetails: [],
    paymentMethod: '' // Add paymentMethod
  });

  const router = useRouter();  // Initialize useRouter
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:1337';
  const defaultImageUrl = '/logo.png'; // zameni sa validnom URL vrednošću

  useEffect(() => {
    let total = 0;
    const details = cart.map(item => {
      const productData = item?.attributes?.products?.data[0];
      const price = parseFloat(productData?.attributes?.price) || 0;
      const quantity = item?.attributes?.quantity || 1;
      const imageUrl = productData?.attributes?.gallery?.data[0]?.attributes?.url ? baseUrl + productData?.attributes?.gallery?.data[0]?.attributes?.url : defaultImageUrl;
      total += price * quantity;
      return {
        product: productData?.id, // Ensure we are using the product ID
        productTitle: productData?.attributes?.title || 'Unknown Product', // Add product title
        quantity,
        price,
        imageUrl // Add image URL
      };
    });
    total += 4.00; // Troškovi dostave
    setOrderData(prevState => ({
      ...prevState,
      totalAmount: total,
      orderDetails: details
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
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      console.log('Confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  const handlePayment = async (paymentMethod) => {
    try {
      const updatedOrderData = { ...orderData, paymentMethod }; // Include paymentMethod
      console.log('Order data before sending:', updatedOrderData);

      const response = await GlobalApi.createOrder(updatedOrderData);
      console.log('Order created:', response.data);
      await GlobalApi.clearCart(); // Clear the cart in the backend
      setCart([]); // Clear the cart in the frontend

      // Send confirmation email
      await sendConfirmationEmail(updatedOrderData);

      // Redirect based on payment method
      if (paymentMethod === 'Card') {
        router.push('/payment-stripe'); // Redirect to Stripe payment page
      } else if (paymentMethod === 'Bank Transfer') {
        router.push('/payment-banktransfer'); // Redirect to Bank Transfer page
      } else {
        router.push('/order-success'); // Redirect to Success page for Cash On Delivery
      }
    } catch (error) {
      console.error('Error creating order:', error);
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" name="firstName" value={orderData.firstName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" name="lastName" value={orderData.lastName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={orderData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="text" name="phoneNumber" value={orderData.phoneNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Billing Address</label>
            <input type="text" name="billingAddress" value={orderData.billingAddress} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
            <input type="text" name="shippingAddress" value={orderData.shippingAddress} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name (Optional)</label>
            <input type="text" name="companyName" value={orderData.companyName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tax ID (Optional)</label>
            <input type="text" name="taxID" value={orderData.taxID} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
        </div>
        <div className="mt-6">
          <button type="button" className="bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700" onClick={() => handlePayment('Cash On Delivery')}>
            Cash On Delivery
          </button>
          <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 ml-4" onClick={() => handlePayment('Card')}>
            Card (Stripe)
          </button>
          <button type="button" className="bg-yellow-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-yellow-700 ml-4" onClick={() => handlePayment('Bank Transfer')}>
            Bank Transfer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
