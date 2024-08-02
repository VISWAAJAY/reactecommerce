const mongoose = require('mongoose');
//schema for add to cart 
const addcartSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'productModel'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'usermodel'
    },
    quantity:{
        type:Number,
        required:false
    },
})

const addcartModel =  mongoose.model("addcartModel", addcartSchema)

module.exports = addcartModel