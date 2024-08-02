import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// SHIPPING PAGE
const Shipping = () => {
    const styleforprogress = {
        "role":"progressbar",
        "width": "25%",
        'color':'yellow',
    }
    const navigate = useNavigate();
    const[doorNo , setDoorNo] = useState("")
    const[State , setState] = useState("")
    const[StreetName , setStreetName] = useState("")
    const[ZipCode , setZipCode] = useState("")
    const[SD , setSD] = useState("")
    
    //PREVENTING REFRESH TO STOP DATA FROM GETTING LOST AND PASSING AND NAVIGATING TO NEXT PAGE

    const handleProp=(e)=>{
        e.preventDefault("Inside ship to pay",doorNo,
            State,
            StreetName,
            ZipCode,
            SD)
        console.log()
        navigate("/checkout");
    }

    
  return (
    <>

        <div className="d-flex justify-content-evenly">
            <p className="text-warning fs-5 fw-semibold">Shipping Details:</p>
            <p>Order Summary</p>
            <p>Payment</p>
        </div>
      <div className="progress">
        <div
          className="progress-bar bg-warning"
          style={styleforprogress}
        ></div>
      </div>
      <div className="container d-flex justify-content-center w-100">
        <form className="d-flex justify-content-center flex-column w-100" onSubmit={(e)=>handleProp(e)}>
          <div class="form-group mb-3">
            <label htmlFor="exampleInputEmail1">STATE:</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"

              placeholder="Enter State"
              required
              onChange={(e)=>setState(e.target.value)}
            />
          </div>
          <div class="form-group mb-3">
            <label htmlFor="exampleInputPassword1">StreetName:</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              placeholder=" "
              onChange={(e)=>setStreetName(e.target.value)}
              required
            />
          </div>
          <div class="form-group mb-3">
            <label htmlFor="exampleInputPassword3">DoorNumber:</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword3"
              placeholder=" "
              required
              onChange={(e)=>setDoorNo(e.target.value)}
            />
          </div>
          <div class="form-group mb-3">
            <label htmlFor="exampleInputPassword4">ZipCode Or PostalCode:</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword4"
              placeholder=" "
              required
              onChange={(e)=>setZipCode(e.target.value)}
            />
          </div>

          <div class="form-group mb-3">
            <label htmlFor="exampleInputPassword5">Add Specific Details if possible:</label>
            <textarea
              type="text"
              class="form-control"
              id="exampleInputPassword5"
              onChange={(e)=>setSD(e.target.value)}
              placeholder=" "
              
            />
          </div>
          {/**DISABLING TO GO NEXT PAGE IF ALL REQUIRED DETAILS ARE NOT ENTERED */}
          {
                (doorNo && State && StreetName && ZipCode) ? (
                <Link to={"/checkout"} type="submit" className="btn btn-warning mb-3 w-auto" state={{doorNo:doorNo ,  State:State, StreetName:StreetName, ZipCode:ZipCode, SD:SD }}>
                        Proceed 
                        </Link>
                ) : (
                     <button className="btn btn-danger mb-3 w-auto " disabled>Proceed</button>
                )
            }
            
        </form>
        
      </div>
    </>
  );
};

export default Shipping;
