import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4 my-6'>
      {orders.map((order, index) => (
        <div key={index} className='mt-5 block w-full h-full sm:w-[300px] border-y-2 border-accent dark:border-accentDark rounded-lg shadow-2xl shadow-slate-500 dark:shadow-gray'>
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
          <p className='text-md text-accent dark:text-accentDark mx-5 mt-2 font-semibold'>
            Proizvodi:
            </p>
          <ul className='text-sm text-darkpurple mx-5 mt-2 mb-5'>
            {order?.attributes?.products?.data?.length > 0 ? (
              order.attributes.products.data.map((product, idx) => {
                const productQuantity = order?.attributes?.productQuantities?.find(pq => pq.product.data.id === product.id)?.Quantity || 0;
                return (
                  <li
                  className='text-sm text-darkpurple mx-5 mt-2' 
                  key={idx}>
                    {product?.attributes?.title} - {productQuantity} x €{product?.attributes?.price.toFixed(2)}
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
