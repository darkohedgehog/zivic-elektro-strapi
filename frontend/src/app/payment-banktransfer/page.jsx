"use client";
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContent';
import GlobalApi from '@/app/utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import jsPDF from 'jspdf';
import bwipjs from 'bwip-js';

const BankTransfer = () => {
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
    paymentMethod: 'Bank Transfer',
    totalAmount: 0,
    products: [],
    quantity: 0,
    price: 0,
  });

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
      totalAmount: total + 4.00, // Add shipping cost
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

  const generateBarcodeData = (orderData) => {
    const LF = '\n';
    const fields = [
      { name: 'header', length: 8, value: 'HUB3A' }, // Zaglavlje
      { name: 'currency', length: 3, value: 'EUR' }, // Valuta
      { name: 'amount', length: 15, value: orderData.totalAmount.toFixed(2).replace('.', '').padStart(15, '0') }, // Iznos
      { name: 'payer', length: 30, value: `${orderData.firstName} ${orderData.lastName}`.slice(0, 30) }, // Platitelj
      { name: 'payerAddress1', length: 27, value: orderData.billingAddress.split(',')[0].slice(0, 27) }, // Adresa platitelja
      { name: 'payerAddress2', length: 27, value: orderData.billingAddress.split(',').slice(1).join(',').slice(0, 27) }, // Adresa platitelja
      { name: 'payee', length: 25, value: 'Example Company'.slice(0, 25) }, // Primatelj
      { name: 'payeeAddress1', length: 25, value: 'Example Street 1'.slice(0, 25) }, // Adresa primatelja
      { name: 'payeeAddress2', length: 27, value: '10000 Zagreb'.slice(0, 27) }, // Adresa primatelja
      { name: 'payeeIBAN', length: 21, value: 'HR1234567890123456789'.slice(0, 21) }, // Broj računa primatelja
      { name: 'model', length: 4, value: 'HR00' }, // Model kontrole poziva
      { name: 'reference', length: 22, value: '1234567890123456789012'.slice(0, 22) }, // Poziv na broj primatelja
      { name: 'purposeCode', length: 4, value: 'OTHR' }, // Šifra namjene
      { name: 'paymentDescription', length: 35, value: 'Payment for invoice #123'.slice(0, 35) }, // Opis plaćanja
    ];

    return fields.map(field => field.value).join(LF) + LF;
  };

  const generateBarcode = async (data) => {
    console.log('Generating barcode with data:', data);
    const canvas = document.createElement('canvas');
    try {
      await bwipjs.toCanvas(canvas, {
        bcid: 'pdf417',
        text: data,
        scale: 3,
        height: 26 / 0.254, // Convert height to modules
        width: 58 / 0.254, // Convert width to modules
        includetext: true,
        textxalign: 'center',
        columns: 9,
        eclevel: 4,
        compaction: 'binary',
        includecheck: false,
      });
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error generating barcode:', error);
      throw error;
    }
  };

  const generatePDF = async () => {
    try {
      console.log('Generating PDF...');
      const doc = new jsPDF();
      doc.setFontSize(25);
      doc.text('Uplatnica', 20, 20);
      doc.setFontSize(12);
      doc.text(`First Name: ${orderData.firstName}`, 20, 40);
      doc.text(`Last Name: ${orderData.lastName}`, 20, 50);
      doc.text(`Email: ${orderData.email}`, 20, 60);
      doc.text(`Phone Number: ${orderData.phoneNumber}`, 20, 70);
      doc.text(`Billing Address: ${orderData.billingAddress}`, 20, 80);
      doc.text(`Shipping Address: ${orderData.shippingAddress}`, 20, 90);
      doc.text(`Company Name: ${orderData.companyName}`, 20, 100);
      doc.text(`Tax ID: ${orderData.taxID}`, 20, 110);
      doc.text(`Total Amount: ${orderData.totalAmount} EUR`, 20, 120);

      const barcodeData = generateBarcodeData(orderData);
      console.log('Barcode Data:', barcodeData);
      const barcodeImgData = await generateBarcode(barcodeData);
      
      console.log('Barcode Image Data:', barcodeImgData);
      doc.addImage(barcodeImgData, 'PNG', 20, 130, 58, 26); // Set the size of the image
      doc.save('uplatnica.pdf');
      console.log('PDF generated and saved.');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handlePayment = async () => {
    try {
      const updatedOrderData = { ...orderData, paymentMethod: 'Bank Transfer' };
      console.log('Order data before sending:', updatedOrderData);
  
      const response = await GlobalApi.createOrder(updatedOrderData);
      console.log('Order created:', response.data);
      await GlobalApi.clearCart();
      setCart([]);
  
      await sendConfirmationEmail(updatedOrderData);
      localStorage.setItem('orderId', response.data.id);
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
          <button type="button" className="bg-yellow-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-yellow-700" onClick={handlePayment}>
            Bank Transfer
          </button>
          <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 ml-4" onClick={generatePDF}>
            Generate Uplatnica PDF
          </button>
        </div>
      </form>
      <div className="mt-6">
        <h2 className="text-xl font-bold">Bank Transfer Details</h2>
        <p>Please transfer the total amount to the following account:</p>
        <ul className="list-disc pl-6">
          <li>Account Number: 1234567890123456</li>
          <li>Bank Name: Example Bank</li>
          <li>Account Holder: Example Company</li>
          <li>SWIFT Code: EXAMPLED</li>
          <li>IBAN: EX12345678901234567890</li>
        </ul>
        <p className="mt-4">Please use your Order ID as the payment reference.</p>
      </div>
    </div>
  );
};

export default BankTransfer;
