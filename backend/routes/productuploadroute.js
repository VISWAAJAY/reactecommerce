const express = require('express');
const router = express.Router();
const productModel = require('../main/models/productModel')
const authtoken = require('../main/middleware/authtoken');
const getbyCatergory = require('./getbycategory');
const getCategoryPage = require('./categorypagebe');
const getOneproductDetails = require('./getOneProductdetails');
const addtocartroute = require('./addtocartroute');
const forCartPage = require('./forcartpage');
const SearchByName = require('./searchroute');
const removefromcart = require('./removefromcart');
const orderhistory = require('./orderhistory');
const getOrderhistory = require('./getorderhistory');
const getOrderByUserid = require('./getOrdersofUser');
const getRecentOrders = require('./forsummaryoforder');






//CREATING PRODUCT
router.post("/api/createProduct",authtoken , (req,res)=>{
  console.log(req.body)
    const{productTitle , productBrand , description , sellingPrice, category} = req.body.data
    const{productImage} = req.body

    console.log(productImage)
    
    if(!productTitle || !productBrand || !description || !sellingPrice || !category || !productImage){
      return res.status(400).json({error:"one or more mandatory fields are empty"});
    }
    const product = new productModel({    productTitle:productTitle,
                                          productBrand:productBrand,
                                          description:description,
                                          sellingPrice:sellingPrice,
                                          category:category,
                                          productImage:productImage
                                      });
    product.save()
    .then((newProduct)=>{
      return res.status(200).json({result:"product added Successfully"})
    })
    .catch((err)=>{
      res.status(400).json({error:"Something wrong"})
      console.log(err)
    })
  })

  //REMAINING ROUTES
router.get("/api/category" , getbyCatergory);
router.post("/api/categoryPage" , getCategoryPage)
router.post("/api/productDetails",getOneproductDetails);
router.post("/api/addtocart",authtoken,addtocartroute);
router.get("/api/cartpagepro",authtoken,forCartPage);
router.get("/api/search",SearchByName);
router.post("/api/deletefromcart",authtoken,removefromcart);
router.post("/api/createOrder",authtoken,orderhistory);
router.get("/api/allorders",authtoken,getOrderhistory);
router.get("/api/getOrdersById",authtoken,getOrderByUserid);
router.get("/api/getlatest",authtoken,getRecentOrders)
module.exports = router;