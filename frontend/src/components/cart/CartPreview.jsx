import { CartContext } from '@/app/context/CartContent';
import React, { useEffect, useContext, useState } from 'react';
import GlobalApi from '@/app/utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

const CartPreview = () => {
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:1337';
  const defaultImageUrl = '/logo.png'; // zameni sa validnom URL vrednošću

  const fetchCartItems = async () => {
    if (user && user.primaryEmailAddress && user.primaryEmailAddress.emailAddress) {
      try {
        const response = await GlobalApi.getUserCartItems(user?.primaryEmailAddress?.emailAddress);
        const cartItems = response.data.data.map(item => {
          const productData = item?.attributes?.products?.data[0];
          const imageUrl = productData?.attributes?.gallery?.data[0]?.attributes?.url ? baseUrl + productData?.attributes?.gallery?.data[0]?.attributes?.url : defaultImageUrl;
          return { ...item, imageUrl, productData };
        });
        setCart(cartItems);
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

  return (
    <>
      <ul className="space-y-4">
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
                  <div>
                    <dt className="inline">Količina: {quantity}</dt>
                  </div>
                </dl>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CartPreview;
