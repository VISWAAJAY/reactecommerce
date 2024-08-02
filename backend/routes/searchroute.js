const productModel = require("../main/models/productModel");

const SearchByName = async(req,res)=>{
    try{
        //FOR GETTING PRODUCTS BASED ON QUERY CASEINSENSITIVE AND GLOBAL FINDS PRODUCTS THAT HAS RELATIVE TITLE OR CATEGORY
        const val = req.query.q;

        const regex = new RegExp(val , 'i' , 'g');
        const findProduct = await productModel.find({
            "$or":[
                {
                    productTitle : regex
                },
                {
                    category : regex
                },

            ]
        })

        //SENDING TO FRONTEND
        res.status(200).json({data : findProduct})
        console.log("Query",req.query.q,val)

    }catch(err){
        res.status(500).json({error:"Something wrong"})
    }
}

module.exports = SearchByName;