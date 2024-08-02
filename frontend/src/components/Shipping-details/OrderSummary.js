import React, { useEffect, useState } from "react";
import "./orderSummary.css";
const OrderSummary = () => {
  const [data, setData] = useState([]);
    const [address , setAddress] = useState('');
    const[date , setDate] = useState('');
  const addtax = (price) => {
    return Math.round((price + price * 0.18) * 100) / 100;
  };

  const add = []
  
  const styleforprogress = {
    role: "progressbar",
    width: "100%",
    color: "yellow",
  };
  //FORMATTING DATE USING LOCALEDATESTRING METHOD FOR MEANINGFUL DATE


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  //GETTING LATEST ORDER FROM BACKEND TO DISPLAY  AND SETTING DATE AND ADDRESS
  const getLatest = async () => {
    const response = await fetch("http://localhost:5000/api/getlatest", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    console.log(res.data[0].createdAt);
    setDate(res.data[0].createdAt)
    setAddress(res.data[0].address)
    setData(res.data);
  };
  //USEFFECT TO CALL FETCH WHEN RENDERED
  useEffect(() => {
    getLatest();
  }, []);
  return (
    <>
    <div className="d-flex justify-content-evenly mb-2">
        <p className="text-warning fs-5 fw-semibold">Shipping Details:</p>
        <p className="text-warning fs-5 fw-semibold">CheckOut:</p>
        <p className="text-warning fs-5 fw-semibold">OrderSummary:</p>
      </div>
    <div className="container shadow h-100">
      <div className="text-sm-center fs-1 mt-2 fw-semibold">OrderSummary</div>
      <hr className="aline"></hr>
      <div className="d-flex justify-content-evenly mt-3">
        <div>
          <p className="fw-semibold">OrderDate:</p>
          <p>{formatDate(date)}</p> {/**FORMATTING DATE */}
        </div>
        <div>
          <p className="fw-semibold">Payment:</p>
          <p>Paypal</p>
        </div>
        <div>
          <p className="fw-semibold w-auto overflow-auto">Address:</p>
            <p style={{ whiteSpace: 'wrap', overflow: 'hidden', textOverflow: 'ellipsis' , maxWidth:'300px' }}>{address}</p>
        </div>
      </div>
      <hr className="aline"></hr>
      <div className="d-flex justify-content-evenly mt-3">
         {/**MAPPING TO DISPLAY ORDERS  */}
        {data?.map((order, i) => (    
          <div key={i} className="w-100 mb-4 d-grid">
            <h3>Order {i + 1}</h3>
            {order.product.map((product, j) => (
              <div
                key={`${i}-${j}`}
                className="product-item border p-3 mb-3 row align-content-center my-auto mb-0 mt-auto"
              >
                <div className="col-4">
                  <img
                    src={product.productImage}
                    alt={product.productTitle}
                    style={{ width: "100px", height: "auto" }}
                  />
                </div>
                <div className="col-4">
                  <p className="fw-semibold d-flex flex-column">
                    Product Name:{" "}
                    <span className="fw-normal">{product.productTitle}</span>
                  </p>
                </div>
                <div className="col-4">
                  <p className="fw-semibold d-flex flex-column">
                    Price:{" "}
                    <span className="fw-normal">
                      {addtax(product.sellingPrice)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center text-success fs-3">Your Order Has been Created</div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default OrderSummary;
