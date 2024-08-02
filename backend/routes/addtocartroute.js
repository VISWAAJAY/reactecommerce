const addcartModel = require("../main/models/addtocartmodel");


const addtocartroute = async(req,res)=>{
    try{ //ERROR HANDLING
        const {product_id ,quantity} = req.body 

        const user = req.user.id


        //FINDING BASED ON ID OF PRODUCT AND SENDING MESSAGE IF ALREADY EXISTS
        const cartproduct = await addcartModel.findOne({product:product_id});
        console.log( "Incartprodut", cartproduct)

        if(cartproduct){
            return(
                res.status(200).json({message:"Already exists in cart"})
            )   
        }
       
       
        //IF NOT EXIST ADDING TO CART

        const payload = {
            quantity:1,
            product : product_id,
            user : user,
            quantity:quantity,
        }
            console.log("insidepayload",payload)
            const addedtocart = new addcartModel(payload);
            const saved = await addedtocart.save();
            console.log(saved)
            console.log(saved)
            res.status(200).json({
                data:saved,
                message:"Added to cart",
                
            })
        
        
    }

    catch(err){
        console.log(err);
        res.status(500).json({error:"Something's wrong"})
    }
}

module.exports = addtocartroute