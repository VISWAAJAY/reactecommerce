const productModel = require("../main/models/productModel");


const getCategoryPage = async(req,res)=>{
    try{
        //GETTING PRODUCTS BASED ON CATEGORY
    const {category} = req?.body || req?.query
    const productPage = await productModel.find({category})

    res.status(200).json({data:productPage})
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Unable to fetch"})
    }
}

module.exports = getCategoryPage;