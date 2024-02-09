import moviesModel from "../models/moviesModel.js";

const moviesController = {
    getAllMovies:async (req,res)=>{
        try {
            const allmovies = await moviesModel.find({}).populate("category")
            res.send(allmovies)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getMoviesByID:async (req,res)=>{
        try {
            const getByID = await moviesModel.findById(req.params.id).populate("category")
            res.send(getByID)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    addMovie:async (req,res)=>{
        try {
            const {name,desc,lang,year,category,cast} = req.body

            const newMovie = new moviesModel({
                name,
                desc,
                lang,
                year,
                category,
                cast
            })
            await newMovie.save()
            res.send(newMovie)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    deleteMovieByID:async (req,res)=>{
        try {
            const deleteByID = await moviesModel.findByIdAndDelete(req.params.id)
            res.send(`${deleteByID.name} deleted`)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}

export default moviesController