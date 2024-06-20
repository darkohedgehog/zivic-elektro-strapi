import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div className='w-full'>
      {orders.map((order, index) => (
        <div key={index} className='border p-4 mb-4'>
          <h3 className='text-[16px] font-bold'>Narudžba #{order.id}</h3>
          <p>Datum: {new Date(order?.attributes?.createdAt).toLocaleDateString()}</p>
          <p>Status: {order?.attributes?.status}</p>
          <p>Ukupno: €{order?.attributes?.totalAmount.toFixed(2)}</p>
          <p>Proizvodi:</p>
          <ul>
            {Array.isArray(order?.attributes?.products?.data) && order.attributes.products.data.length > 0 ? (
              order.attributes.products.data.map((product, idx) => (
                <li key={idx}>
                  {product?.attributes?.title} - {product?.attributes?.quantity} x €{product?.attributes?.price.toFixed(2)}
                </li>
              ))
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
