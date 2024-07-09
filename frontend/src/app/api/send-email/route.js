import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import OrderConfirmationEmail from '@/components/email/OrderConfirmationEmail';




// Konfiguracija SMTP transporta
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req) {
  try {
    const { orderData } = await req.json();

    // Renderuj komponentu u HTML string
    const emailHtml = render(<OrderConfirmationEmail orderData={orderData} />);

    const mailOptionsPrimary = {
      from: process.env.SMTP_USER,
      to: orderData.email,
      subject: 'Potvrda narudžbe',
      html: emailHtml,
    };

    const mailOptionsSecondary = {
      from: process.env.SMTP_USER,
      to: 'prodaja@zivic-elektro.com',
      subject: 'Nova narudžba',
      html: emailHtml,
    };

    // Slanje na primarnu adresu
    await transporter.sendMail(mailOptionsPrimary);
    console.log('Email sent to primary address');

    // Slanje na sekundarnu adresu
    await transporter.sendMail(mailOptionsSecondary);
    console.log('Email sent to secondary address');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
