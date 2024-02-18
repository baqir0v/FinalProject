// import React, { useState, useEffect, useContext } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import "./index.scss"
// import { DarkmodeContext } from '../../Context/darkmodeContext';
// import { PaymentForm } from "../../components/PaymentForm"

// const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

// const PaymentPage = () => {
//   const [clientSecret, setClientSecret] = useState('');
//   const { darkmode } = useContext(DarkmodeContext)

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       try {
//         const { data: { clientSecret } } = await axios.post('http://localhost:5500/payments/process-payment', {
//           amount: 1000, // Amount in cents
//           currency: 'usd',
//         });
//         setClientSecret(clientSecret);
//       } catch (error) {
//         console.error('Error fetching client secret:', error);
//       }
//     };

//     fetchClientSecret();
//   }, []);

//   return (
//     <div id='paymentpage' className={darkmode ? "darkpayment" : "lightpayment"}>
//       <div className="payment">
//         <h1>Stripe Payment Example</h1>
//         <Elements stripe={stripePromise}>
//           <PaymentForm clientSecret={clientSecret} />
//         </Elements>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;



import React, { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import "./index.scss"
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51OkmhqJa2gK3aeyUR1iJQhnfdrIzGoI7F8EwaozDIgnO35V3hLDODQXv16aRsn32mJC4BDNR9QVf7oKWEl3AUoJh00RkOy5Vae');

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { darkmode } = useContext(DarkmodeContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { data: { clientSecret } } = await axios.post('http://localhost:5500/api/payments/process-payment', {
          amount: 1000, // Amount in cents
          currency: 'usd',
        });
        setClientSecret(clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
        setError('Error fetching client secret');
      }
    };

    fetchClientSecret();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const elements = useElements();

    const result = await elements.getElement(CardElement).confirmCardPayment(clientSecret);

    if (result.error) {
      setError(result.error.message);
    } else {
      // Payment successful
      console.log("Payment successful");
    }
  };

  return (
    <div id='paymentpage' className={darkmode ? "darkpayment" : "lightpayment"}>
      <div className="payment">
        <h1>Stripe Payment Example</h1>
        <Elements stripe={stripePromise}>
          <form id='paymentform' 
          // onSubmit={handleSubmit}
          >
            <CardElement />
            <button type="submit" className="button-29" role="button">
              
              <Link to={"/home"}>PAY</Link>
              </button>
            {/* {error && <p>{error}</p>} */}
          </form>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;

// import React, { useState, useEffect, useContext } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, useElements, CardElement } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import "./index.scss"
// import { DarkmodeContext } from '../../Context/darkmodeContext';
// import { Link } from 'react-router-dom';

// const stripePromise = loadStripe('pk_test_51OkmhqJa2gK3aeyUR1iJQhnfdrIzGoI7F8EwaozDIgnO35V3hLDODQXv16aRsn32mJC4BDNR9QVf7oKWEl3AUoJh00RkOy5Vae');

// const PaymentPage = () => {
//   const [clientSecret, setClientSecret] = useState('');
//   const { darkmode } = useContext(DarkmodeContext);
//   const [error, setError] = useState(null);

//   const elements = useElements(); // Move it outside useEffect

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       try {
//         const { data: { clientSecret } } = await axios.post('http://localhost:5500/api/payments/process-payment', {
//           amount: 1000, // Amount in cents
//           currency: 'usd',
//         });
//         setClientSecret(clientSecret);
//       } catch (error) {
//         console.error('Error fetching client secret:', error);
//         setError('Error fetching client secret');
//       }
//     };

//     fetchClientSecret();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await elements.getElement(CardElement).confirmCardPayment(clientSecret);

//     if (result.error) {
//       setError(result.error.message);
//     } else {
//       // Payment successful
//       console.log("Payment successful");
//     }
//   };

//   return (
//     <div id='paymentpage' className={darkmode ? "darkpayment" : "lightpayment"}>
//       <div className="payment">
//         <h1>Stripe Payment Example</h1>
//         <Elements stripe={stripePromise}>
//           <form id='paymentform' onSubmit={handleSubmit}>
//             <CardElement />
//             <button type="submit" className="button-29" role="button">
//               <Link to={"/home"}>PAY</Link>
//             </button>
//             {error && <p>{error}</p>}
//           </form>
//         </Elements>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;



