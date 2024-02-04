import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';

const PaymentElementsComponent = ({clientKey}) => {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    console.log(clientKey);
  }, [clientKey]);

  const onPay = () => {
    if (!stripe || !elements || !clientKey) {
      return toast.error('Error while paying.')
    }
    stripe.confirmPayment({
      elements: elements,
      confirmParams: {
        return_url: 'http://localhost:3000/order',
      }
    });
  }

  return (
    <>
      {stripe && (
        <div>
          <PaymentElement />
          <button onClick={onPay}>Pay</button>
        </div>
      )}
    </>
  );
}

export default PaymentElementsComponent;