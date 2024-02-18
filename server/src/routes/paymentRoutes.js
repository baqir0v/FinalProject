import express from 'express';
import { getCheckoutPage, processPayment } from '../controllers/paymentController.js';

const paymentRoutes = express.Router();

paymentRoutes.get('/checkout', getCheckoutPage);
paymentRoutes.post('/process-payment', processPayment);

export default paymentRoutes;
