import StripeCheckout from 'react-stripe-checkout';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import "./index.scss"
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async"
import { toast, ToastContainer } from "react-toastify"

function StripePage() {
  const { darkmode } = useContext(DarkmodeContext);
  const navigate = useNavigate()
  const publishableKey =
    'pk_test_51OkmhqJa2gK3aeyUR1iJQhnfdrIzGoI7F8EwaozDIgnO35V3hLDODQXv16aRsn32mJC4BDNR9QVf7oKWEl3AUoJh00RkOy5Vae';
  const [product, setProduct] = useState({
    name: 'Headphone',
    price: 50,
  });
  const priceForStripe = product.price * 100;


  const payNow = async token => {
    try {
      const response = await axios({
        url: 'http://localhost:5500/payment',
        method: 'post',
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        toast.success('Payment completed successfully');
        // alert("Purchase has been completed")
      }
      navigate("/login")
    }
    catch (error) {
      console.log(error);
      // alert("Failure while purchase")
      toast.error("Payment failed");
    }
  };

  return (
    <div className={`payNow ${darkmode ? "darkpayNow" : "lightpayNow"}`}>
      <Helmet>
        <title>
          Payment
        </title>
      </Helmet>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="div">
        <h2>Subscribe to see movies</h2>
        <p>
          <span>Price: </span>${product.price}
        </p>
        <div className="salamtagi">
          {/* <p>
          <span>Product: </span>
          {product.name}
        </p> */}

          <StripeCheckout
            stripeKey={publishableKey}
            label="Pay Now"
            name="Pay With Credit Card"
            billingAddress
            shippingAddress
            amount={priceForStripe}
            description={`Your total is $${product.price}`}
            token={payNow}
          />
        </div>
      </div>
    </div>
  );
}

export default StripePage;
