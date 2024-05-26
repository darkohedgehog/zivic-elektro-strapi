import {PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Potvrdi</button>
    </form>
  );
};

export default CheckoutForm;