import mongoose from "mongoose";

const castModel = new mongoose.Schema({
    castName: { type: String },
    image: { type: String }
})

const ratingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    rating:{type:Number,default:0}
})

const moviesModel = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    lang: { type: String, required: true },
    year: { type: Number, required: true },
    ageLimit:{ type:Number},
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    image: {
        // required: true
    },
    detailImage: {
        type: String,
    },
    video: {
        type: String,
    },
    cast: [
        castModel
    ],
    ratings:[ratingSchema]
}, { timestamps: true })

export default mongoose.model("Movies", moviesModel)