import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./src/routes/UserRouter.js"
import categoryRouter from "./src/routes/categoriesRouter.js"
import moviesRouter from "./src/routes/moviesRouter.js"
import paymentRoutes from "./src/routes/paymentRoutes.js"
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import swiperRouter from "./src/routes/swiperRouter.js"

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.options('*', cors());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

dotenv.config()
const port = process.env.PORT
const password = process.env.PASSWORD
const url = process.env.CONNECTION_URL.replace("<password>", password)

app.use("/api/users", userRouter)
app.use(
  '/src/uploads',
  express.static(
    `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/`
  )
)
app.use("/api/categories", categoryRouter)
app.use("/api/movies", moviesRouter)
app.use("/api/payments", paymentRoutes);
app.use("/api/swiper", swiperRouter);

app.post('/payment', async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    status = 'success';
  } catch (error) {
    console.log(error);
    status = 'Failure';
  }
  res.json({ error, status });
});

mongoose.connect(url).then(res => console.log("DB connected")).catch(err => console.log(err))

app.listen(port, () => {
  console.log("Server Connected");
})