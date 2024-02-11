import mongoose from "mongoose";

const castModel = new mongoose.Schema({
    castName: { type: String },
    image: { type: String }
})

const moviesModel = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    lang: { type: String, required: true },
    year: { type: Number, required: true },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    image: {
        type: String,
        // required: true
    },
    video: {
        type: String,
        // required: true
    },
    cast: [
        castModel
    ]
}, { timestamps: true })

export default mongoose.model("Movies", moviesModel)