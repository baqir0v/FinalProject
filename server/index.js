import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./src/routes/UserRouter.js"

const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()
const port = process.env.PORT
const password = process.env.PASSWORD
const url = process.env.CONNECTION_URL.replace("<password>",password)

app.use("/api/users",userRouter)

mongoose.connect(url).then(res=>console.log("DB connected")).catch(err=>console.log(err))

app.listen(port,()=>{
    console.log("Server Connected");
})