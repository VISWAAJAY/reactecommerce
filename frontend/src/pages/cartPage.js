import React, { useEffect, useState } from "react";

import { FaRupeeSign } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "./cartPage.css";
import { Link } from "react-router-dom";






const CartPage = ({name=""}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  //GETTING CART PAGE DATA
  const fetchdata = async () => {
    const response = await fetch("http://localhost:5000/api/cartpagepro", {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const productdata = await response.json();
    const products = productdata.data.map((item) => ({
      ...item.product,
      quantity: 1,
    }));
//SETTING PRODUCTS
    setData(products);
    calculateTotal(products);
  };
  
//DELETING CART PRODUCT
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
    if(res.ok){
      fetchdata();
    }
  }
//FETCHING ALL PRODUCTS
  useEffect(() => {
    fetchdata();
  }, []);
//DECREASING AND UPDATING
  const decrease = (id) => {
    const updatedData = data.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setData(updatedData);
    calculateTotal(updatedData);
  };
  //INCREASING AND UPDATING
  const increase = (id) => {
    const updatedData = data.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setData(updatedData);
    calculateTotal(updatedData);
  };
//CALCULATING TOTAL PRICE
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

  return (
    <div>
      {/**DISPLAYING PRODUCTS */}
      {loading && data.length === 0 ? (
        <div className="container card w-100 d-flex h-100 align-self-center mt-5 bg-gradient shadow-lg ">
          <p className="text-center align-self-center h-100 fs-3 text-uppercase my-auto ">
            Add products to display in cart
          </p>
        </div>
      ) : (
        <div className="h-100 card shadow-lg evenbigcart">
          <div className="biggercart d-flex">
            <div className="mt-3">
              {data.map((product, i) => {
                return (
                  <div key={i} className="d-flex">
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
            {data.length !== 0 ? (
              <>
                <div className="card shadow  mt-3 col-sm-4 h-25 end-0 d-flex w-25 h-auto">
                  <h2 className="card-title d-flex w-100 justify-content-around text-capitalize">
                    {" "}
                    Summary
                  </h2>

                  <div className="summary2ndpart">
                    <p className="justify-content-between border-bottom-black">
                      Price:
                      <span>
                        <span>
                          <FaRupeeSign />
                        </span>
                        {total}
                      </span>
                    </p>
                    <p className="justify-content-between">
                      Tax:
                      <span>
                        <span>
                          <FaRupeeSign />
                        </span>
                        {tax}
                      </span>
                    </p>
                    <p className="justify-content-between">
                      TotalPrice:
                      <span>
                        <span>
                          <FaRupeeSign />
                        </span>
                        {totalCost}
                      </span>
                    </p>
                  </div>
                  <div className="card-footer shadow justify-content-center w-100 d-flex">
                    <Link to={"/Shipping"} className="btn btn-warning justify-content-center">

                      <span>
                      <span>
                      <span className="me-3">CheckOut</span>
                        <span>
                          <FaRupeeSign />
                        </span>
                        {totalCost}
                      </span>
                        
                       
                      </span>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
