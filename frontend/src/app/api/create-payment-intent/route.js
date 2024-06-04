const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req, res) {
  const { amount, customer } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'eur',
      receipt_email: customer.email,
      metadata: {
        customerName: `${customer.firstName} ${customer.lastName}`,
        phone: customer.phoneNumber
      }
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
