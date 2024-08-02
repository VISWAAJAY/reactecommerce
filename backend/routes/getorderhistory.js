const History = require("../main/models/orderhistorymodel");

const  getOrderhistory = async(req,res)=>{
    try{
        //GETTING ORDER HISTORY OF ALL USERS
        const user_id = req.user_id;
        const records = await History.find().populate('user').populate({path:'product' , model:'productModel'})
        console.log(records)
        res.status(200).json({data:records})
    }catch(err){
        console.log("YES",err?.message)
        res.status(400).json({message:"Something wrong"})
    }
    
}

module.exports = getOrderhistory