import express from "express"
import categoriesController from "../controllers/categoriesController.js";
const categoryRouter = express.Router()

categoryRouter.get("/",categoriesController.getAllCategories)
categoryRouter.get("/:id",categoriesController.getCategoriesByID)
categoryRouter.post("/",categoriesController.addCategory)
categoryRouter.delete("/:id",categoriesController.deleteCategoryByID)

export default categoryRouter