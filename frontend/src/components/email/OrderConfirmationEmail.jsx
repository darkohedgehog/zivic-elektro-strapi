
import * as React from 'react';
import { Html, Head, Preview, Body, Container, Heading, Text, Img } from '@react-email/components';

const OrderConfirmationEmail = ({ orderData }) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    billingAddress,
    shippingAddress,
    companyName,
    taxID,
    paymentMethod,
    totalAmount,
    products,
    quantity,
    price,
  } = orderData;

  const logo = {
    margin: '0 auto',
  };

  return (
    <Html>
      <Head />
      <Preview>Potvrda narudžbe</Preview>
      <Body>
        <Container>
          <Img
            src='https://res.cloudinary.com/dhkmlqg4o/image/upload/v1717430480/logo_mugrlr.png'
            width={80}
            height={40}
            alt='logo'
            style={logo}
          />
          <Heading>Vaša narudžba je uspješno kreirana</Heading>
          <Text>Poštovani {firstName} {lastName},</Text>
          <Text>Hvala Vam na narudžbi! Ovo su detalji Vaše narudžbe:</Text>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Ime:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{firstName}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Prezime:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lastName}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Email:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{email}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Broj telefona:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{phoneNumber}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Adresa za naplatu:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{billingAddress}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Adresa za dostavu:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{shippingAddress}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Tvrtka:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{companyName}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>OIB tvrtke:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{taxID}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Način plaćanja:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{paymentMethod}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Ukupan iznos:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totalAmount.toFixed(2)} EUR</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Količina:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{quantity}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Cijena:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{price.toFixed(2)} EUR</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Proizvodi:</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {products.map((product, index) => (
                      <li key={index} style={{ borderBottom: '1px solid #ddd', padding: '4px 0' }}>{product.title}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <Text>Nadamo se da ste uživali u kupovini. Ukoliko imate bilo kakvih pitanja, slobodno nam se obratite na prodaja@zivic-elektro.com
          </Text>
          <Text>Lijep pozdrav!</Text>
          <Text>Živić-Elektro</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;
