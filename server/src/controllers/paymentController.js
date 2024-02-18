// import stripe from 'stripe';
// import dotenv from 'dotenv';

// dotenv.config();

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// const stripeInstance = stripe(stripeSecretKey);

// export const getCheckoutPage = (req, res) => {
//   res.render('paymentForm');
// };

// export const processPayment = async (req, res) => {
//   const { amount, currency, paymentMethod } = req.body;

//   try {
//     const paymentIntent = await stripeInstance.paymentIntents.create({
//       amount,
//       currency,
//       payment_method: paymentMethod,
//       confirm: true,
//     });

//     res.status(200).send({ success: true, paymentIntent });
//   } catch (error) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// };

import stripePackage from 'stripe';
import stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeInstance = stripePackage(stripeSecretKey);

export const getCheckoutPage = (req, res) => {
  res.render('paymentForm');
};

export const processPayment = async (req, res) => {
  const { amount, currency, paymentMethod } = req.body;

  try {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethod,
      confirm: true,
    });

    res.status(200).send({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
