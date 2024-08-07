"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, setCart } from '@/reducers/CartSlice';
import GlobalApi from '@/app/utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import jsPDF from 'jspdf';
import bwipjs from 'bwip-js';
import CustomerForm from '@/components/checkout/CostumerForm';
import CartPreview from '@/components/cart/CartPreview';
import { VscFilePdf } from "react-icons/vsc";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Bank = () => {
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
    paymentMethod: 'Bank Transfer',
    totalAmount: 0,
    products: [],
    productQuantities: [],
    quantity: 0,
    price: 0,
  });

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
      productQuantities: productDetails.map(detail => ({ product: detail.product, Quantity: detail.quantity })),
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

  const generateUniqueReference = () => {
    return Math.random().toString(36).substring(2,9).toUpperCase(); // Generisanje nasumičnog alfanumeričkog stringa
  };
  
  const generateBarcodeData = (orderData) => {
    const LF = '\n';
    const uniqueReference = generateUniqueReference();
  
    const fields = [
      { name: 'header', length: 8, value: 'HUB3A' }, // Zaglavlje
      { name: 'currency', length: 3, value: 'EUR' }, // Valuta
      { name: 'amount', length: 15, value: orderData.totalAmount.toFixed(2).replace('.', '').padStart(15, '0') }, // Iznos
      { name: 'payer', length: 30, value: `${orderData.firstName} ${orderData.lastName}`.slice(0, 30) }, // Platitelj
      { name: 'payerAddress1', length: 27, value: orderData.billingAddress.split(',')[0].slice(0, 27) }, // Adresa platitelja
      { name: 'payerAddress2', length: 27, value: orderData.billingAddress.split(',').slice(1).join(',').slice(0, 27) }, // Adresa platitelja
      { name: 'payee', length: 25, value: 'Živić-Elektro j.d.o.o.'.slice(0, 25) }, // Primatelj
      { name: 'payeeAddress1', length: 25, value: '204.vuk. brigade 39'.slice(0, 25) }, // Adresa primatelja
      { name: 'payeeAddress2', length: 27, value: '32000 Vukovar'.slice(0, 27) }, // Adresa primatelja
      { name: 'payeeIBAN', length: 21, value: 'HR0925000091101386980'.slice(0, 21) }, // Broj računa primatelja
      { name: 'model', length: 4, value: 'HR00' }, // Model kontrole poziva
      { name: 'reference', length: 22, value: uniqueReference }, // Poziv na broj primatelja
      { name: 'purposeCode', length: 4, value: 'OTHR' }, // Šifra namjene
      { name: 'paymentDescription', length: 35, value: `Plaćanje po ${uniqueReference}`.slice(0, 35) }, // Opis plaćanja
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

      // Fetch the font as an array buffer
    const fontUrl = '/fonts/CourierPrime-Regular.ttf';
    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());

    // Convert the array buffer to a binary string
    const binaryString = String.fromCharCode.apply(null, new Uint8Array(fontBytes));

    // Convert the binary string to a base64 string
    const base64String = btoa(binaryString);

    // Add the font to the jsPDF instance
    doc.addFileToVFS('CourierPrime-Regular.ttf', base64String);
    doc.addFont('CourierPrime-Regular.ttf', 'CourierPrime', 'normal');
    doc.setFont('CourierPrime', 'normal');

       // Set the style for the document
    doc.setDrawColor(255, 165, 0); // Orange color for the borders and text
    doc.setLineWidth(0.5);

    // Draw the main structure
    // Top section
    doc.rect(10, 10, 190, 20); // Main outer border
    doc.text('NALOG ZA PLAĆANJE', 60, 20);
    
    // Add labels
    doc.setFontSize(10);
    doc.text('PLATITELJ (naziv/ime i adresa):', 12, 35);
    doc.text('IBAN i broj računa platitelja:', 12, 45);
    doc.text('Model:', 12, 55);
    doc.text('Poziv na broj platitelja:', 50, 55);

    doc.text('PRIMATELJ (naziv/ime i adresa):', 12, 75);
    doc.text('IBAN i broj računa primatelja:', 12, 85);
    doc.text('Model:', 12, 95);
    doc.text('Poziv na broj primatelja:', 50, 95);
    doc.text('Šifra namjene:', 12, 105);
    doc.text('Opis plaćanja:', 50, 105);
    doc.text('Datum izvršenja:', 150, 105);

    // Add user data
    doc.setFontSize(12);
    doc.text(`${orderData.firstName} ${orderData.lastName}`, 12, 40);
    doc.text(orderData.billingAddress, 12, 50);
    doc.text('HR0925000091101386980', 12, 90);
    doc.text('HR00', 12, 100);
    doc.text('Poziv na broj primatelja', 50, 100); // You can replace this with actual call number
    doc.text('OTHR', 12, 110);
    doc.text('Uplata za naručenu robu', 50, 110); // You can replace this with actual payment description


     //Create a 2D Barcode for payments 
      const barcodeData = generateBarcodeData(orderData);
      console.log('Barcode Data:', barcodeData);
      const barcodeImgData = await generateBarcode(barcodeData);
      
      console.log('Barcode Image Data:', barcodeImgData);
      doc.addImage(barcodeImgData, 'PNG', 20, 130, 58, 26); // Set the size of the image
      // Additional styling to mimic a real payment slip
      doc.setFontSize(10);
      doc.text('Primatelj:', 20, 180);
      doc.setFontSize(12);
      doc.text('Živić-Elektro j.d.o.o.', 20, 185);
      doc.text('204.vuk. brigade 39', 20, 190);
      doc.text('32000 Vukovar', 20, 195);
      doc.text('HR0925000091101386980', 20, 200);

      doc.setFontSize(10);
      doc.text('Platitelj:', 20, 210);
      doc.setFontSize(12);
      doc.text(`${orderData.firstName} ${orderData.lastName}`, 20, 215);
      doc.text(orderData.billingAddress, 20, 220);

      doc.setFontSize(10);
      doc.text('Iznos:', 20, 230);
      doc.setFontSize(12);
      doc.text(`${orderData.totalAmount.toFixed(2)} EUR`, 20, 235);
      doc.save('uplatnica.pdf');
      console.log('PDF generated and saved.');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handlePayment = async () => {
    try {
      const updatedOrderData = { ...orderData, paymentMethod: 'Bank Transfer' };
      //console.log('Order data before sending:', updatedOrderData);
  
      const response = await GlobalApi.createOrder(updatedOrderData);
     // console.log('Order created:', response.data);
      await GlobalApi.clearCart();
      dispatch(clearCart());
  
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
    <div className="container mx-auto p-28">
      <h1 
      className="text-2xl font-bold mb-6 flex justify-center items-center text-accent dark:text-accentDark uppercase">
        Plaćanje
        </h1>
      <h2 className='text-xl font-semibold mb-6 flex justify-center items-center text-accent dark:text-accentDark uppercase'
      >Molimo popunite Vaše podatke
      </h2>
      <form>
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
      <div className="mt-6">
        <div className='flex flex-col my-20 h-full w-full sm:w-[500px] border-y-2 border-accent dark:border-accentDark rounded-lg shadow-xl shadow-slate-500 dark:shadow-gray z-20 mx-auto text-accent dark:text-accentDark'>
        <h2 className="text-xl font-semibold mx-auto my-4">Podaci za uplatu:</h2>
        <p className='mx-3 text-sm mb-3'>Molimo da uplatite iznos sa Vaše narudžbe na:</p>
        <ul className="list-disc mx-5">
          <li className='mx-auto my-2'>Živić-Elektro j.d.o.o.</li>
          <li className='mx-auto my-2'>204. vukovarske brigade 39, Vukovar</li>
          <li className='mx-auto my-2'>Banka: Addiko Bank d.d.</li>
          <li className='mx-auto my-2 text-wrap'>IBAN: HR0925000 091101386980</li>
          <li>Ukupan iznos za uplatu: <span>{orderData.totalAmount.toFixed(2)}€</span></li>
        </ul>
        </div>
        <div className='flex flex-col my-20 h-full w-full sm:w-[500px] border-y-2 border-accent dark:border-accentDark rounded-lg shadow-xl shadow-slate-500 dark:shadow-gray z-20 mx-auto text-accent dark:text-accentDark'>
        <div className="mt-6">
          <div className='mx-3 text-sm mb-3'>
            Ili jednostavno generišite PDF uplatnicu i skenirajte kod vašom aplikacijom za internet bankarstvo
          </div>
        </div>
        <div className='my-6 mx-auto'>
          <button type="button" className="button" onClick={generatePDF}>
            <span className='mx-auto font-light uppercase flex gap-2'>
              <VscFilePdf className='h-5 w-5' />
              Uplatnica</span>
          </button>
          </div>
        <div className='my-6 mx-auto'>
        <button type="button" className="button" onClick={handlePayment}>
            <span className='mx-auto font-light uppercase flex gap-2'>
            <AiOutlineShoppingCart className='h-5 w-5' />
              Naručite</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Bank;
