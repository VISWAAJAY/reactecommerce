const productModel = require("../main/models/productModel");


const getOneproductDetails = async(req,res)=>{

    try{
        //GETTING PRODUCT DETAILS FOR SPECIFIC PRODUCT
        const{product_id} = req.body

        const productDetails =await productModel.findById(product_id);

        if(!productDetails){
            res.status(400).json({error:"Product does not exist"})
        }
        res.status(200).json({data:productDetails})
    }catch(err){
 
            res.status(500).json({error:"Unable to fetch"})

    }

}
module.exports = getOneproductDetails;