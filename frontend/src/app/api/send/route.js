import { EmailTemplate } from '@/components/email/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request) {
  try {
    const requestData = await request.json();
    console.log('Request data:', requestData);

    const { firstName, lastName, email, phoneNumber, billingAddress, shippingAddress, totalAmount, paymentMethod, products } = requestData;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email, 'admin@example.com'], // send to user and admin
      subject: 'Order Confirmation',
      react: EmailTemplate({ firstName, lastName, email, phoneNumber, billingAddress, shippingAddress, totalAmount, paymentMethod, products }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json({ error }, { status: 500 });
  }
}
