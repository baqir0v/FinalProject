import mongoose from "mongoose";

const SwiperModel = new mongoose.Schema({
    swipername:{type:String,required:true},
    swiperimage:{type:String}
})

export default mongoose.model("Swiper", SwiperModel)