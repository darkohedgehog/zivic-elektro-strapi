import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div className='w-full'>
      {orders.map((order, index) => (
        <div key={index} className='border p-4 mb-4'>
          <h3 className='text-[16px] font-bold'>Narudžba broj: {order.id}</h3>
          <p>Datum: {new Date(order?.attributes?.createdAt).toLocaleDateString()}</p>
          <p>Način plaćanja: {order?.attributes?.paymentMethod}</p>
          <p>Ukupno sa dostavom: €{order?.attributes?.totalAmount.toFixed(2)}</p>
          <p>Proizvodi:</p>
          <ul>
            {order?.attributes?.products?.data?.length > 0 ? (
              order.attributes.products.data.map((product, idx) => {
                const productQuantity = order?.attributes?.productQuantities?.find(pq => pq.product.data.id === product.id)?.Quantity || 0;
                return (
                  <li key={idx}>
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
