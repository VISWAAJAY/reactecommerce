const mongoose = require('mongoose');
const History = require("../main/models/orderhistorymodel")

const getOrderByUserid = async(req,res)=>{
    try {
        //GETTING ORDERS OF SPECIFIC USER
        const userid = req.user.id
        console.log("Id to get",userid)
        const orders = await History.find({user: userid}).populate('user').populate({path:'product' , model:'productModel'})
        console.log(orders);
        res.status(200).json({data:orders});
    } catch (err) {
        console.log(err?.message)
        res.status(400).json({error:"Something Wrong"})
    }
   
}

module.exports = getOrderByUserid