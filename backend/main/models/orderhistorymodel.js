const mongoose  = require('mongoose');
const productModel = require('./productModel');
const usermodel = require('./usermodel')

const historySchema = new mongoose.Schema({
    product: [{
        type: mongoose.Schema.Types.ObjectId,       //can store array of product ids
        ref: 'productmodel'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,       //storing user ids
        ref: 'usermodel' 
    },
    address:{
        type:String,                                //address
        required:true
    },
    quantity:{
        type:Number,                                  //quantity
        required:true
    },
    price:{
        type:Number,                                //Total price
        required:true
    }
},{
    timestamps:true
})

const History = new mongoose.model('history' , historySchema);
module.exports = History;