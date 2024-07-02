"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { CiTrash } from 'react-icons/ci';
import GlobalApi from '@/app/utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { useDispatch, useSelector } from 'react-redux';
import { setCart, setQuantities, setSubtotal, setDiscount, setVat, setTotal, setShipping, setDiscountCode, addToCart, removeFromCart } from '../../reducers/CartSlice';

const CartPreview = () => {
  const dispatch = useDispatch();
  const { cart, quantities, subtotal, discount, vat, total, shipping, discountCode } = useSelector((state) => state.cart);
  const { user } = useUser();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:1337/';

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
  }, [user, baseUrl]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(setQuantities({ ...quantities, [itemId]: newQuantity }));
    try {
      await GlobalApi.updateCartItem(itemId, { quantity: newQuantity });
      await fetchCartItems();
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await GlobalApi.deleteCartItem(itemId);
      await fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      {cart.map((item, index) => {
        const productData = item?.attributes?.products?.data[0];
        const imagePath = productData?.attributes?.gallery?.data[0]?.attributes?.url;
        const imageProduct = imagePath ? `${baseUrl}${imagePath}` : '';
        const quantity = quantities[item.id] || 1;

        return (
          <li className="flex items-center gap-4" key={index}>
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
    </div>
  );
};

export default CartPreview;
