import React, { useContext, useState } from "react";
import "./login.css";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userContext from "../context/context";

const Login = () => {
  {
    /*login page */
  }

  const[loading,setloading]=useState(true);
/*Setting default values for form */
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
   
/*handling data entered in form */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  /*handling submition of form*/
  const navigate = useNavigate()

  const {userdetails} = useContext(userContext);


  const handleSubmit = async(e)=>{
    setloading(false)
    e.preventDefault();
    const loginapi = await fetch("http://localhost:5000/api/login",{
      method:'post',
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const returnedlogin = await loginapi.json();
    console.log("returned",returnedlogin)
    if(returnedlogin.error){
      setloading(true);
      toast.error(returnedlogin.error);
      
    }
    if(returnedlogin.result){
      setloading(true);
      toast.success(returnedlogin.result);
      navigate('/');
      userdetails(); 
    }
  }
  {
    /*useState for showing typed password */
  }
  const [showvisbile, setshowvisible] = useState(true);
  {
    /*form for login page */
  }
  return (
    <div className=" d-flex container card d-flex shadow-lg mt-5 mt-lg-5 rounded mx-auto w-100 w-md-50 p-1 logincard">
      <div className="card-title">
        <h2 className=" text-capitalize justify-content-center align-content-center mx-auto d-flex ">
          Login
        </h2>
      </div>
      <div className="card-body p-o  float-md-end d-flex justify-content-center w-100 mx-sm-0 ">
        <form className=" justify-content-around d-flex flex-column h-100 w-100 align-content p-1 mx-sm-0" onSubmit={handleSubmit}>
          <div className="mb-3  border-black p-1 ">
             {/**EMAIL*/}
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control  "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInputPassword1" className="form-label w-100">
               {/**PASSWORD */}
              Password
            </label>
            <div className="d-flex">
              <input
                type={showvisbile ? "password" : "text"}
                className="form-control border-end-0"
                id="exampleInputPassword1"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
              <button className="btn border border-start-0">
                <span
                  className=" position-static ps-1 ms-auto"
                  onClick={() => setshowvisible((preve) => !preve)}
                >
                   {/**CONDITION TO DISPLAY DIFFERENT ICONS WITH STATE */}
                  {showvisbile ? <FaEyeSlash /> : <FaEye />}
                </span>
              </button>
            </div>
          </div>
          <div className="mb-3 w-100 d-flex justify-content-center align-items-lg-center">
             {/**FORGOT PASSWORD PAGE */}
            <a href="#" className=" text-decoration-none   position-relative">
              Forgot password?
            </a>
            <a
              href="/register"
              className=" text-decoration-none ms-auto position-relative"
            >
               {/**REGISTER PAGE */}
              Create an account ?
            </a>
          </div>

          {/**loading animation for frontend */}
          {
            loading?<button
            type="submit"
            className="btn btn-primary  d-flex justify-content-center mx-auto"
          >
            Submit
          </button>:<button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border text-primary" role="status" aria-hidden="true"></span>
                  please wait...
                  </button>
          }
          
        </form>
      </div>
    </div>
  );
};

export default Login;
