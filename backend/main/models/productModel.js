const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const productSchema = new mongoose.Schema({
    productTitle:{
        type:String,
        required:true
    },
    productBrand:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    comment:[commentSchema]
})

const productModel = mongoose.model("productModel",productSchema);
module.exports = productModel