import mongoose from "mongoose";

const moviesModel = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    lang: { type: String, required: true },
    year: { type: Number, required: true },
    category: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
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
        {
            castName: { type: String, required: true },
            // image: { type: String, required: true },
        }
    ]
},{timestamps:true})

export default mongoose.model("Movies",moviesModel)