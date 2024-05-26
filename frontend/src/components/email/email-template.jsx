import * as React from 'react';

export const EmailTemplate = ({ firstName, lastName, email, phoneNumber, billingAddress, shippingAddress, orderDetails, totalAmount, paymentMethod }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', padding: '20px' }}>
    <h1 style={{ color: '#4CAF50' }}>Order Confirmation</h1>
    <p>Hi {firstName} {lastName},</p>
    <p>Thank you for your order. Here are your order details:</p>

    <h2>Customer Information</h2>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Phone Number:</strong> {phoneNumber}</p>
    <p><strong>Billing Address:</strong> {billingAddress}</p>
    <p><strong>Shipping Address:</strong> {shippingAddress}</p>
    <p><strong>Payment Method:</strong> {paymentMethod}</p>

    <h2>Order Details</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
        </tr>
      </thead>
      <tbody>
        {orderDetails.map((item, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.productTitle}</td> {/* Use product title */}
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.quantity}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>${item.price.toFixed(2)}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <img src={item.imageUrl} alt={item.productTitle} style={{ width: '50px', height: '50px' }} /> {/* Use product title for alt */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
    <p>If you have any questions about your order, please contact us.</p>

    <p>Best regards,</p>
    <p>Your Company Name</p>
  </div>
);
