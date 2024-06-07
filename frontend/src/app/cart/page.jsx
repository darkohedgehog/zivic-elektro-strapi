"use client";
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { CiTrash } from 'react-icons/ci';
import Link from 'next/link';
import GlobalApi from '@/app/utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { GiPayMoney } from "react-icons/gi";
import { TbTransactionEuro } from "react-icons/tb";
import { CartContext } from '../context/CartContent';


const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  const [quantities, setQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVat] = useState(0);
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(4.00);
  const [discountCode, setDiscountCode] = useState('');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:1337/';

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
  }, [user, baseUrl]);

  useEffect(() => {
    const initialQuantities = {};
    cart.forEach(item => {
      initialQuantities[item.id] = item?.attributes?.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  useEffect(() => {
    let newSubtotal = 0;
    cart.forEach(item => {
      const productData = item?.attributes?.products?.data[0];
      const quantity = quantities[item.id] || 1;
      const price = parseFloat(productData?.attributes?.price) || 0;
      newSubtotal += (price / 1.25) * quantity;
    });
    setSubtotal(newSubtotal);
    setVat(newSubtotal * 0.25);
    setTotal(newSubtotal + newSubtotal * 0.25 - discount + shipping);
  }, [cart, quantities, discount, shipping]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));
    try {
      await GlobalApi.updateCartItem(itemId, { quantity: newQuantity });
      await fetchCartItems(); // Osveži korpu nakon ažuriranja količine
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await GlobalApi.deleteCartItem(itemId);
      await fetchCartItems(); // Osveži korpu nakon brisanja stavke
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscount = () => {
    if (discountCode === 'akcija10') {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };


  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 text-darkblue dark:text-darkpurple">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-darkblue dark:text-accentDark sm:text-3xl pt-10">Vaša košarica</h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {cart.map((item, index) => {
                  const productData = item?.attributes?.products?.data[0];
                  const imagePath = productData?.attributes?.gallery?.data[0]?.attributes?.url;
                  const imageProduct = imagePath ? `${baseUrl}${imagePath}` : '';
                  const quantity = quantities[item.id] || 1;

                  return (
                    <li
                      className="flex items-center gap-4"
                      key={index}>
                    {imageProduct ? (
                  <Image
                    src={imageProduct}
                    alt={productData?.attributes?.title || 'Product Image'}
                    width={200}
                    height={200}
                    className="size-16 rounded object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 flex items-center justify-center">
                    <span>Loading...</span>
                  </div>
                )}

                      <div>
                        <h3 className="text-sm text-gray-900">{productData?.attributes?.title}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">{productData?.attributes?.category}</dt>
                          </div>

                          <div>
                            <dt className="inline">€{productData?.attributes?.price}</dt>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <button
                          className="text-gray-600 transition hover:text-green-600"
                          onClick={() => handleQuantityChange(item.id, quantity + 1)}
                        >
                          <AiOutlinePlus />
                        </button>

                        <label htmlFor={`quantity-${item.id}`} className="sr-only"> Količina </label>

                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          id={`quantity-${item.id}`}
                          className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-accent dark:text-accentDark [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        />

                        <button
                          className="text-gray-600 transition hover:text-red-600"
                          onClick={() => handleQuantityChange(item.id, quantity > 1 ? quantity - 1 : 1)}
                        >
                          <AiOutlineMinus />
                        </button>

                        <button
                          className="text-accent dark:text-accentDark transition hover:text-red-600"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <span className="sr-only">Ukloni</span>
                          <CiTrash />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Međusuma</dt>
                      <dd>€{subtotal.toFixed(2)}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>PDV</dt>
                      <dd>€{vat.toFixed(2)}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Popust</dt>
                      <dd>-€{discount.toFixed(2)}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Dostava</dt>
                      <dd>€{shipping.toFixed(2)}</dd>
                    </div>

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Ukupno</dt>
                      <dd>€{total.toFixed(2)}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end gap-x-3">
                    <input
                      type="text"
                      placeholder="Unesi promo kod"
                      value={discountCode}
                      onChange={handleDiscountCodeChange}
                      className="rounded border border-accent dark:border-accentDark p-2 text-sm text-gray-700 shadow-md"
                    />
                    <button
                      className="text-[#F7F7F7] bg-accent hover:bg-[#C9A0DC] focus:ring-4 
                      focus:outline-none focus:ring-[#9A4EAE] font-medium rounded-lg 
                      text-sm px-4 py-2 text-center dark:bg-accent dark:hover:bg-[#C9A0DC] dark:focus:ring-blue-800 transition ml-2 shadow-lg"
                      onClick={applyDiscount}
                    >
                      Primjeni
                    </button>
                  </div>
                  <div className='flex justify-end mt-10 pt-10 text-md uppercase'>
                    Odaberite način plaćanja
                  </div>

                  <div className="flex justify-end mt-10 pt-10 gap-x-3">
                    <Link
                      href="/payment-cash"
                      className="text-[#F7F7F7] bg-accent hover:bg-[#C9A0DC] focus:ring-4 
                      focus:outline-none focus:ring-[#9A4EAE] font-medium rounded-lg 
                      text-[12px] px-4 py-2 text-center dark:bg-accent dark:hover:bg-[#C9A0DC] dark:focus:ring-blue-800 transition ml-2 shadow-lg flex gap-x-2 justify-center items-center"
                    ><GiPayMoney className='w-6 h-6' />
                      Plaćanje pouzećem
                    </Link>
                    <Link
                      href="/payment-banktransfer"
                      className="text-[#F7F7F7] bg-accent hover:bg-[#C9A0DC] focus:ring-4 
                      focus:outline-none focus:ring-[#9A4EAE] font-medium rounded-lg 
                      text-[12px] px-4 py-2 text-center dark:bg-accent dark:hover:bg-[#C9A0DC] dark:focus:ring-blue-800 transition ml-2 shadow-lg flex gap-x-2 justify-center items-center"
                    ><TbTransactionEuro className='w-6 h-6' />
                      Bankarska transakcija
                    </Link>
                    <Link
                      href="/payment-stripe"
                      className="text-[#F7F7F7] bg-accent hover:bg-[#C9A0DC] focus:ring-4 
                      focus:outline-none focus:ring-[#9A4EAE] font-medium rounded-lg 
                      text-[12px] px-4 py-2 text-center dark:bg-accent dark:hover:bg-[#C9A0DC] dark:focus:ring-blue-800 transition ml-2 shadow-lg flex gap-x-2 justify-center items-center"
                    ><TbTransactionEuro className='w-6 h-6' />
                      Plaćanje karticom
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
