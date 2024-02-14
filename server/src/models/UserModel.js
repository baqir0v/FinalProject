import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    nickname:{type:String,unique:true,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true,minlength:6},
    image:{
        type:String
    },
    isAdmin:{type:Boolean,default:false},
    inWishList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Movies"
        }
    ]
},{timestamps:true})

export default mongoose.model("Users",UserModel)