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
            upload.fields([
                { name: "image" },
                { name: "detailImage" },
                { name: "video" }
            ])(req, res, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json({ message: err.message });
                }
    
                const { name, desc, lang, year, category, cast } = req.body;
    
                if (!category || !category.length) {
                    return res.status(400).json({ message: "Categories are required." });
                }
    
                const imageResult = req.files["image"][0];
                const detailImageResult = req.files["detailImage"][0];
                const videoResult = req.files["video"][0];
    
                const [imageResponse, detailImageResponse, videoResponse] = await Promise.all([
                    cloudinary.uploader.upload(imageResult.path, { folder: "movies" }),
                    cloudinary.uploader.upload(detailImageResult.path, { folder: "movies" }),
                    cloudinary.uploader.upload(videoResult.path, { folder: "movies", resource_type: "video" })
                ]);
    
                const categoryObjects = await categoriesModel.find({ categoryname: { $in: category } });
    
                const categoryIds = categoryObjects.map((categoryObj) => categoryObj._id);
    
                const newMovie = new moviesModel({
                    name,
                    desc,
                    lang,
                    year,
                    category: categoryIds,
                    cast,
                    image: imageResponse.secure_url,
                    detailImage: detailImageResponse.secure_url,
                    video: videoResponse.secure_url,
                });
    
                await newMovie.save();
    
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
    },
    updateMovieByID : async (req, res) => {
        const { id } = req.params;
        const { ageLimit, cast } = req.body;
    
        try {
            const updatedMovie = await moviesModel.findByIdAndUpdate(
                id,
                { $set: { ageLimit, cast } },
                { new: true }
            );
    
            res.json(updatedMovie);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
}

export default moviesController