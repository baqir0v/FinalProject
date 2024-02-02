import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    nickname:{type:String,unique:true,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true,minlength:6},
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    isAdmin:{type:Boolean,default:false},
},{timestamps:true})

export default mongoose.model("Users",UserModel)