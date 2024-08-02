const addcartModel = require("../main/models/addtocartmodel")



const countproductsinCart = async(req,res)=>{
    try{
        const userid = req.user.id
        const allcart = await addcartModel.find()
        const count  = await addcartModel.countDocuments({
            user:userid
        })
        res.json({
            data:{
                count:count
            }
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = countproductsinCart