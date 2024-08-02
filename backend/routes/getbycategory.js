const productModel = require("../main/models/productModel")


const getbyCatergory = async(req,res)=>{
try{
    //GETTING ONE CATEGORY FROM EACH CATEGORY
    const productcategories = await productModel.distinct("category");
    const productByCategory = [];


    for(const category of productcategories){
        const product = await productModel.findOne({category})


        if(product){
            productByCategory.push(product);
        }
    }
    res.status(200).json({data:productByCategory})

}catch(err){
res.status(500).json({error:"something wrong"})
}
}

module.exports = getbyCatergory;