const addcartModel = require("../main/models/addtocartmodel")

const forCartPage = async(req,res)=>{
    try{
        //FINDING PRODUCTS IN CART BASED ON USER
        const user = req.user.id
        
        const allProducts = await addcartModel.find({
            user:user
        }).populate('product')
        if(allProducts){
            res.status(200).json({data:allProducts});
        }
            
        

    }catch(err){
        res.status(500).json({error:"something Happened"+err})
    }
}

module.exports = forCartPage