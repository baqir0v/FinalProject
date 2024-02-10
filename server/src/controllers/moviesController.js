import mongoose from "mongoose";
import upload from "../middleware/multer.js";
import moviesModel from "../models/moviesModel.js";
import cloudinary from "../utils/cloudinary.js";
import categoriesModel from "../models/categoriesModel.js";

const moviesController = {
    getAllMovies: async (req, res) => {
        try {
            const allmovies = await moviesModel.find({}).populate("category")
            res.send(allmovies)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getMoviesByID: async (req, res) => {
        try {
            const getByID = await moviesModel.findById(req.params.id).populate("category")
            res.send(getByID)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    addMovie: async (req, res) => {
        try {
            upload.fields([{ name: "image" },{ name: "video"}])(req, res, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json({ message: err.message });
                }
    
                const { name, desc, lang, year, category, cast } = req.body;
                console.log(category);
                console.log(typeof category);
    
                const imageResult = req.files["image"][0];
                const imageUpload = cloudinary.uploader.upload(imageResult.path,{
                    folder: "movies"
                })

                const videoResult = req.files["video"][0]
                const videoUpload = cloudinary.uploader.upload(videoResult.path,{
                    folder: "movies",
                    resource_type: "video"
                })

                const [imageResponse,videoResponse] = await Promise.all([imageUpload,videoUpload])
                // const cloudinaryResult = await cloudinary.uploader.upload(imageResult.path, {
                //     folder: "movies",
                // });
    
                // Find ObjectIds for the given category names
                const categoryObjects = await categoriesModel.find({ categoryname: { $in: category } });
    
                // Extract ObjectIds from the found categories
                const categoryIds = categoryObjects.map((categoryObj) => categoryObj._id);
    
                const newMovie = new moviesModel({
                    name,
                    desc,
                    lang,
                    year,
                    category: categoryIds,
                    cast,
                    image: imageResponse.secure_url,
                    video: videoResponse.secure_url,
                });
    
                await newMovie.save();
    
                // Update the associated categories with the new movie
                await categoriesModel.updateMany(
                    { _id: { $in: categoryIds } },
                    { $push: { movies: newMovie._id } }
                );
    
                res.send(newMovie);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },
    
    deleteMovieByID: async (req, res) => {
        try {
            const deleteByID = await moviesModel.findByIdAndDelete(req.params.id)
            res.send(`${deleteByID.name} deleted`)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}

export default moviesController