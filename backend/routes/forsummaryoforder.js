const History = require("../main/models/orderhistorymodel");

const getRecentOrders = async(req,res)=>{
    try {
        //GETTING RECENT ORDERS FOR USER
        const userid = req.user.id
        const latestorder = await History.find({user:userid}).sort({createdAt:-1}).limit(1).populate({path:'product' , model:'productModel'});
        res.status(200).json({data:latestorder});
    } catch (error) {
        console.log(error?.message)
        res.status(400).json({error:"Something wrong"})
    }
}
module.exports = getRecentOrders