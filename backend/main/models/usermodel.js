const mongoose = require('mongoose');
const productModel = require('./productModel');
const{ObjectId} = mongoose.Schema.Types


const userSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:Number,
            required:true
        },
       email:{
        type:String,
        unique:true,
        required:true
       },
        password:{
        type:String,
        required:true
       },
       role:{
        type:String
       },
       products:{
        type:ObjectId,
        ref:productModel
       },
    }
)

const userModel = mongoose.model("usermodel",userSchema)

module.exports = userModel