import mongoose from "mongoose";

const categoriesModel = new mongoose.Schema({
    categoryname: { type: String, required: true },
    movies: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movies"
    }]
})

export default mongoose.model("Category", categoriesModel)