const addcartModel = require("../main/models/addtocartmodel")

const removefromcart = async(req,res)=>{
    try{
        //REMOVING FROM CART 
        console.log("hereeeeeeee")
        const {id} = req.body
        const removed = await addcartModel.deleteOne({product:id})
        if(removed){
            res.status(200).json({data:removed})
        }
        
    }catch(err){
        res.status(500).json({error:"Something Wrong"})
    }
}

module.exports = removefromcart