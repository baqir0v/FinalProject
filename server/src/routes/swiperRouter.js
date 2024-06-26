import express from "express";
import swiperController from "../controllers/swiperController.js";
const swiperRouter = express.Router()

swiperRouter.get("/",swiperController.getAll)
swiperRouter.get("/:id",swiperController.getByID)
swiperRouter.post("/",swiperController.createNew)
swiperRouter.delete("/:id",swiperController.deleteByID)

export default swiperRouter