import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./src/routes/UserRouter.js"
import categoryRouter from "./src/routes/categoriesRouter.js"
import moviesRouter from "./src/routes/moviesRouter.js"

const app = express()

app.use(express.json())
app.use(cors())

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
app.use("/api/movies",moviesRouter)

mongoose.connect(url).then(res => console.log("DB connected")).catch(err => console.log(err))

app.listen(port, () => {
  console.log("Server Connected");
})