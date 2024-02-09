import express from "express"
import categoriesController from "../controllers/categoriesController.js";
const categoryRouter = express.Router()

categoryRouter.get("/",categoriesController.getAllCategories)
categoryRouter.get("/:id",categoriesController.getCategoriesByID)
categoryRouter.post("/",categoriesController.addCategory)

export default categoryRouter