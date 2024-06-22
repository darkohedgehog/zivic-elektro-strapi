import Image from 'next/image';
import React from 'react';

const OrderList = ({ orders }) => {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4 my-6'>
      {orders.map((order, index) => (
        <div key={index} className='mt-5 block w-full h-[350px] sm:w-[300px] border-y-2 border-accent dark:border-accentDark rounded-lg shadow-2xl shadow-slate-500 dark:shadow-gray overflow-scroll'>
          <h3 className='text-[16px] font-bold text-accent dark:text-accentDark mx-5 mt-4'>
            Narudžba broj: {order.id}
            </h3>
          <p className='text-sm text-darkpurple mx-5 mt-2'>
            Datum: {new Date(order?.attributes?.createdAt).toLocaleDateString()}
            </p>
          <p className='text-sm text-darkpurple mx-5 mt-2'>
            Način plaćanja: {order?.attributes?.paymentMethod}
            </p>
          <p className='text-sm text-darkpurple mx-5 mt-2'>
            Ukupno sa dostavom: €{order?.attributes?.totalAmount.toFixed(2)}
            </p>
          <p className='text-md text-accent dark:text-accentDark mx-5 my-3 font-semibold'>
            Proizvodi:
            </p>
            <ul className='text-sm text-darkpurple mx-5 mt-2 mb-5'>
            {order?.attributes?.products?.data?.length > 0 ? (
              order.attributes.products.data.map((product, idx) => {
                const imageUrl = apiUrl + product?.attributes?.gallery?.data?.[0]?.attributes?.url;
                const productQuantity = order?.attributes?.productQuantities?.find(pq => pq.product.data.id === product.id)?.Quantity || 0;
                return (
                  <li key={idx} className='text-sm text-darkpurple mx-5 mt-2 flex gap-2'>
                    {imageUrl && (
                      <Image 
                      src={imageUrl} 
                      alt={product?.attributes?.title}
                      width={40}
                      height={40} 
                      priority={false}
                      className="w-10 h-10 object-cover mr-4 rounded-md mt-2" />
                    )}
                    <div>
                    {product?.attributes?.title} - {productQuantity} kom x {product?.attributes?.price.toFixed(2)}€
                    </div>
                  </li>
                );
              })
            ) : (
              <li>Nema dostupnih proizvoda</li>
            )}
          </ul>

        </div>
      ))}
    </div>
  );
};

export default OrderList;
