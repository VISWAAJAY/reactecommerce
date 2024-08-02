import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import {  Link, useLocation } from "react-router-dom";
import './payment.css';
import PayPalButton from "../MockPayPal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Payment = () => {
  var user = useSelector((state) => state.user.user); //GETTING USER DETAILS FROM REDUX STORE
  const userid = user?._id
  //USE LOCATION TO GET PASSED DATA FROM PREVIOUS COMPONENT
  const location = useLocation();
  //PASSED DATA EXTRACTION
  const { doorNo, State, StreetName, ZipCode, SD } = location.state || {}
  //ADDING ADDRESS
  const address = `${doorNo} ${State} ${StreetName} ${ZipCode} ${SD}`;
  
  const [data, setData] = useState([]);
  
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalCost, setTotalCost] = useState(0);




  //FETCHING CART PRODUCTS DATA
  const fetchdata = async () => {
    const response = await fetch("http://localhost:5000/api/cartpagepro", {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const productdata = await response.json();
    //ADDING THEIR DEFAULT QUANTITY TO 1
    const products = productdata?.data.map((item) => ({
      ...item.product,
      quantity: 1,
    }));

    setData(products);
    
    calculateTotal(products);
  };



  //DELETING API CALL FOR THE PRODUCT IN CART PASSING ID OF PRODUCT
  const deleteCart = async(id)=>{
    const response = await fetch("http://localhost:5000/api/deletefromcart", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        id:id
      })
    });
    const res = await response.json();
    //FETCHING DATA AGAIN TO REFRESH
    if(res.message){
      fetchdata();
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  //DECREASING QUANTITY
  const decrease = (id) => {
    const updatedData = data?.map((item) =>
      item?._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    //SETTING UPDATED DATA
    setData(updatedData);
    calculateTotal(updatedData);
  };

  //INCRESING QUANTITY
  const increase = (id) => {
    const updatedData = data?.map((item) =>
      item?._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    //SETTING UPDATED DATA
    setData(updatedData);
    calculateTotal(updatedData);
  };


  //TO CALCULATE TOTAL AND ERROR HANDLING 
  const calculateTotal = (cartData) => {
    if (!Array.isArray(cartData)) {
      return;
    }
    const totalPrice = cartData.reduce((total, item) => {
      return total + item.quantity * item.sellingPrice;
    }, 0);
    const taz = Math.round((totalPrice * 0.18)*100)/100;
    const total = Math.round((totalPrice + taz)*100)/100;
    setTotalCost(total);
    setTax(taz);
    setTotal(totalPrice);
  };

  //CREATING ORDER HISTORY AND PASSING ALL REQUIRED DATA
  const createHistory = async(data , userid)=>{

    const proquan =[]
    const prices = []
    const productids = []
    data?.map((product , i)=>{
       prices.push(product.sellingPrice)
        productids.push(product?._id)
       proquan.push(product.quantity)
       console.log("quantity",product.quantity);
    })
    const sendingData = [{proquan, prices , productids}]
    const response = await fetch("http://localhost:5000/api/createOrder",{
      method:'POST',
      credentials:'include',
      headers:{
        'Content-Type':'Application/json'
      },
      body:JSON.stringify({
        data : sendingData,
        address : address,
        user_id : userid
        
      })
    })
    const res = await response.json()
    //APPROPRIATE MESSAGES FOR USER
    if(res.message){
      toast.success("Order Created");
    }else{
      toast.error("Something Wrong")
    }
    
    console.log("Testing porposes",sendingData)
  }

  //PROGRESS BAR
  const styleforprogress = {
    role: "progressbar",
    width: "50%",
    color: "yellow",
  };
  return (
    <>
    <div> {/**PROGRESS BARS */}
      <div className="d-flex justify-content-evenly">
        <p className="text-warning fs-5 fw-semibold">Shipping Details:</p>
        <p className="text-warning fs-5 fw-semibold">CheckOut:</p>
        <p>OrderSummary:</p>
      </div>
      <div className="progress">
        <div className="progress-bar bg-warning" style={styleforprogress}></div>
      </div>
      </div>

      {/**ENTERING ADDRESS  */}
      <div className="container d-grid customflex paymentw">
        <div className="row customflex">
        <div className="col-8 customflex">
          <div className="h-auto">
            <h4>ADDRESS:</h4>
          <form className="d-flex justify-content-center flex-column w-100">
          <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail1" className="fw-semibold">STATE:<span className="ms-2 fw-normal ">{State}</span></label>
            
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1" className="fw-semibold">StreetName:<span className="ms-2  fw-normal">{StreetName}</span></label>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword3" className=" fw-semibold">DoorNumber:<span className="ms-2  fw-normal">{doorNo}</span></label>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword4" className="fw-semibold">ZipCode Or PostalCode:<span className="ms-2  fw-normal">{ZipCode}</span></label>
            
          </div>
          {
            SD?(
              <div className="form-group mb-3">
                  <label htmlFor="exampleInputPassword5" className="fw-semibold">Add Specific Details if possible:<span className="ms-2 line-count fw-normal">{SD}</span></label>
              </div>
            ):(<></>)
          }
          
          </form>
          </div>
          {/**CART ITEMS TO SHOW */}
          <div className="h-auto">
          <div className="mt-3">
            <h5>ITEMS IN CART:</h5>
              {data.map((product, i) => {
                return (
                  <div key={i} className="d-flex mb-5">
                    <div
                      key={product?._id + i}
                      className="card mb-3 d-flex customcart"
                    >
                      <img
                        src={product?.productImage}
                        alt="product image"
                        className="h-100 w-50 p-4 rounded"
                      ></img>
                      
                      <div className="my-auto card-body custombody">
                        <p className="fw-bold">Brand:</p>
                        <p className="d-flex align-self-center">
                          {" "}
                          {product?.productBrand}
                        </p>
                        
                        <p className="align-self-center mt-2 text-wrap d-flex">
                          <span className="fw-bold">Price:</span>{" "}
                          <span>
                            <FaRupeeSign />
                          </span>
                          {product?.sellingPrice}
                        </p>
                        <div className="quantity">
                          <button
                            className="btn h-auto align-self-center btn-warning buttons"
                            onClick={(e) => increase(product._id)}
                          >
                            +
                          </button>
                          <span className="align-self-center operatrsbtw">
                            {product?.quantity}{" "}
                          </span>

                          <button
                            className="btn align-self-center btn-warning buttons"
                            onClick={(e) => decrease(product._id)}
                          >
                            -
                          </button>
                          
                        </div>
              
                        
                      </div>
                      <button
                            className="btn btn-danger float-end ms-4 h-25 mt-3"
                            onClick={(e)=>deleteCart(product?._id)}
                          >
                            <MdDeleteOutline />
                          </button>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-4">
        <div className="card  mt-3 col-sm-4 end-0 d-flex w-auto paymentw h-auto">
                  <h2 className="card-title d-flex w-100 justify-content-around text-capitalize">
                    {" "}
                    Summary
                    
                  </h2>
                  <span className=" border-bottom mb-2"></span>
                  <div className="summary2ndpart">
                    <p className="justify-content-around">
                      Price:
                      <span>
                        <span>
                          <FaRupeeSign />
                        </span>
                        {total}
                      </span>
                    </p>
                    <span className=" border-bottom mb-2"></span>
                    <p className="justify-content-around">
                      Tax:
                      <span>
                        <span>
                          <FaRupeeSign />
                        </span>
                        {tax}
                      </span>
                    </p>
                    <span className=" border-bottom mb-2"></span>
                    <p className="justify-content-around">
                      TotalPrice:
                      <span className="fw-bold">
                        <span>
                          <FaRupeeSign />
                        </span>
                        {totalCost}
                      </span>
                    </p>
                    <span className=" border-bottom mb-2"></span>
                  </div>
                  <div className="card-footer shadow justify-content-center w-100 d-flex flex-column">
                    <PayPalButton/> {/**paypal buttons */}
                    <Link to={"/orderSummary"}  className="btn btn-warning h-auto" onClick={(e)=>createHistory(data , userid)}>
                      Skip to summary
                    </Link>
                  </div>
                </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
