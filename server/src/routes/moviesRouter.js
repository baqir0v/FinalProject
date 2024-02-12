import express from "express"
import moviesController from "../controllers/moviesController.js"
const moviesRouter = express.Router()

moviesRouter.get("/",moviesController.getAllMovies)
moviesRouter.get("/:id",moviesController.getMoviesByID)
moviesRouter.post("/",moviesController.addMovie)
moviesRouter.delete("/:id",moviesController.deleteMovieByID)
moviesRouter.put("/:id",moviesController.updateMovieByID)

export default moviesRouter