import OrderConfirmationEmail from '@/components/email/OrderConfirmationEmail';
import { Resend } from 'resend';


const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req) {
  try {
    const { orderData } = await req.json();

    const emailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: orderData.email,
      subject: 'Order Confirmation',
      react: <OrderConfirmationEmail orderData={orderData} />,
    });

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
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
