import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import "./index.scss"
import { Link } from 'react-router-dom';

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      // Payment successful
      console.log("Payment successful");
    }
  };

  return (
    <form id='paymentform'>
      <CardElement />
      <button type="submit" class="button-29" role="button" disabled={!stripe}>PAY</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default PaymentForm;
