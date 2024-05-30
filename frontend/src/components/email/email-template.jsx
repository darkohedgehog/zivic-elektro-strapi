import * as React from 'react';

export const EmailTemplate = ({ firstName, lastName, email, phoneNumber, billingAddress, shippingAddress, totalAmount, paymentMethod, products }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', padding: '20px' }}>
    <h1 style={{ color: '#4CAF50' }}>Potvrda narudžbe</h1>
    <p>Pozdrav {firstName} {lastName},</p>
    <p>Hvala Vam na narudžbi! ☺️ Ovo su detalji Vaše narudžbe: </p>

    <h2>Podaci o kupcu</h2>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Broj mobitela:</strong> {phoneNumber}</p>
    <p><strong>Adresa za naplatu:</strong> {billingAddress}</p>
    <p><strong>Adresa za dostavu:</strong> {shippingAddress}</p>
    <p><strong>Način plaćanja:</strong> {paymentMethod}</p>

    <h2>Detalji narudžbe:</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Proizvod</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Količina</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cijena</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Slika</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.productTitle}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.quantity}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>€{item.price.toFixed(2)}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <img src={item.imageUrl} alt={item.productTitle} style={{ width: '50px', height: '50px' }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h3>Ukupan iznos sa dostavom: €{totalAmount.toFixed(2)}</h3>
    <p>Ukoliko imate bilo kakvih upita u vezi narudžbe, kontaktiraje nas na email: prodaja@zivic-elektro.com</p>

    <p>Lijep pozdrav!</p>
    <p>Zivić Elektro</p>
  </div>
);
