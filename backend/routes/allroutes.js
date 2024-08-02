const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../main/dbconnection/config');
const authtoken = require("../main/middleware/authtoken");
const productModel = require("../main/models/productModel");
const app = express();
const userModel = mongoose.model("usermodel");


//signup api
router.post("/api/signUp", (req, res) => {
  const { fullName, phoneNumber, email, password } = req.body;  //getting all required details for signup
  if (!fullName) {
    throw new error("Fullname is required");  //giving appropriate messages if anything is not filled
  }
  if (!phoneNumber) {
    throw new error("Phonenumber is required");
  }
  if (!email) {
    throw new error("Email is required");
  }
  if (!password) {
    throw new error("Password is required");
  }
  userModel
    .findOne({ email: email }) //checking if user already exists in db
    .then((userfound) => {
      if (userfound) {   //if exists giving appropriate message
        res
          .status(500)
          .json({ error: `user with this ${email} already exists` });
      }
      bcrypt.hash(password, 16).then((hashedpassword) => { //else encrypting password and storing in database
        const user = new userModel({
          fullName,
          phoneNumber,
          email,
          password: hashedpassword,
          role: "general",
        });
        user
          .save()
          .then((newUser) => {
            res.status(201).json({ result: "User Signed up Successfully" }); //giving appropirate messages to user
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//login api
router.post("/api/login", (req, res) => {
  const { email, password } = req.body; //getting required details from frontend
  if (!email) {
    throw new error("Email is required"); //giving appropriatee messages if a field is not received
  }
  if (!password) {
    throw new error("Password is required");
  }
  userModel
    .findOne({ email: email }) //finding the user based on email
    .then((userfound) => {
      if (!userfound) {
        res.status(500).json({ error: "user does not exist" }); //error if not found
      }
      
      bcrypt.compare(password, userfound.password)
      .then((didmatch) => {
        if(!didmatch){
          res.status(400).json({error:"invalid credentials"}); //if password is incorrect appropriate error message is given
        }
        const userdata = {
          _id: userfound._id,
          email: userfound.email,
        };
        
        const token = jwt.sign({ userdata}, JWT_SECRET, {expiresIn: 60*60} ); //generating token and setting expiring time
        const option = {
          httpOnly: true,
          secure: true,
        };
        if (didmatch) {
          res.cookie("token" ,token, option).status(201).json({ result: "User Logged In successfully" }); //sending the cookie for verification purposes in future
        }
      }).catch((err)=>{
            console.log(err); //error handling
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


//userdetails api

router.get("/api/userdetails",authtoken,async(req,res)=>{ 
  try{
    const user = req.user.id;
    const alluserdata = await userModel.findById(user) //finding user using id sent from frontend
    res.status(200).json({data:alluserdata})
   console.log(alluserdata)
  }catch(err){
    console.log(err);
  }
   
})

//logout api
router.get("/api/logout",async(req,res)=>{
  try{
    res.clearCookie("token"); //clear cookie from cookies to ensure user is logged out and returning an empty data
    res.status(200).json({result:"Logged out Succesfully" , data:[]});
  }
  catch(err){
      res.status(500).json({err:"something is wrong"})
  }
})

/**All users API */
router.get("/api/allusers",authtoken,async(req,res)=>{
  //getting all users existing in database and verifying requested user's token using authtoken middleware
  try{
  const userid = req.user_id;

  const allUsers = await userModel.find(); //finding all users

  res.status(200).json({message:"All Users found" , data:allUsers})  //sending all users data to front end as an array 
  }
  catch(err){
    res.status(500).json({err:"Unable to fetch try again"});
  }
})


/**Update User role API */

  router.put("/api/updateUser",authtoken,async(req,res)=>{
   try{
    const {user_id , role} = req.body;  //getting user id and users role to be updated
    console.log("Updateeuser",req.body)
    const payload = { //setting payload to change role
      ...(role &&{role:role}),
    }
    const updateUser = await userModel.findByIdAndUpdate(user_id , payload ,{new:true}) //updating role by ID
    res.status(200).json({message:"UserUpdated Successfully",data:updateUser}) //sending appropriate messages to frontend
  }catch(err){ //error handling
    res.status(500).json({error:"An error occured try again"})
  }})

  /**Updating specific user details */

  router.put("/api/updateUserDetails",authtoken,async(req,res)=>{
    try {
      const {user_id, fullName, phoneNumber } = req.body;
       //  authtoken middleware 

      const payload = {};
      if (fullName) payload.fullName = fullName;
      if (phoneNumber) payload.phoneNumber = phoneNumber;


      // Updating user information
      const updateUser = await userModel.findByIdAndUpdate(user_id, payload, { new: true });

      console.log("Updated User:", updateUser); // Logging the updated user

      // Sending message to frontend
      res.status(200).json({ message: "User Updated Successfully", data: updateUser });
  } catch (err) { // Error handling
      console.error("Error occurred:", err); // Logging the error
      res.status(500).json({ error: "An error occurred, please try again" });
  }
});



  /**fetching all products */

  router.get("/api/allProducts",authtoken,async(req,res)=>{
    //getting all users existing in database and verifying requested user's token using authtoken middleware
    try{
    const userid = req.user_id;
  
    const allProducts = await productModel.find(); //finding all users
  
    res.status(200).json({message:"All Products found" , data:allProducts})  //sending all users data to front end as an array 
    }
    catch(err){
      res.status(500).json({err:"Unable to fetch try again"});
    }
  })
  
  /**Updating products */
  
module.exports = router;
