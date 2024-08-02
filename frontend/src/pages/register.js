import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import "./login.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const[showvisbile,setshowvisible]= useState(true);


  /*Setting default values for form */
  const [data, setdata] = useState({
    fullName: "",
    phoneNumber: "",
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
  const navigate = useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const apidata = await fetch("http://localhost:5000/api/signUp",{
      method:'post',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })

    const returneddata = await apidata.json()
    
    /**returning proper messages to user  */
    if(returneddata.error){
      toast.error(returneddata.error);
    }
    if(returneddata.result){
      toast.success(returneddata.result);
      navigate('/login');
    }
    }
  return (
      //Registration form



    <div className=" d-flex container card d-flex shadow-lg mt-5 mt-lg-5 rounded mx-auto w-lg-50 w-100 logincard ">
      <div className="card-title">
        <h2 className=" text-capitalize justify-content-center align-content-center mx-auto d-flex ">
          Register
        </h2>
      </div>
      <div className="card-body p-o  float-md-end d-flex justify-content-center align-content-center mx-5">
        <form className=" justify-content-around d-flex flex-column h-100 w-100 align-content-stretch" onSubmit={handleSubmit}>
          <div className="mb-3 border-black">

            {/**FullName */}
            <label htmlFor="exampleInputEmail0" className="form-label">
              FullName
            </label>
            <input
              type="Text"
              className="form-control  "
              id="exampleInputEmail0"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3  border-black">

             {/**PHONE NUMBER*/}
            <label htmlFor="exampleInputEmail2" className="form-label">
              PhoneNumber
            </label>
            <input
              type="Text"
              className="form-control  "
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3  border-black ">
             {/*EMAIL  */}
            <label htmlFor="exampleInputEmail3" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control  "
              id="exampleInputEmail3"
              aria-describedby="emailHelp"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-1">

             {/**PASSWORD */}
            <label htmlFor="exampleInputPassword1" className="form-label w-100">
              Password
            </label>
            <div className="d-flex">
              <input
                type={showvisbile ? "password" : "text"}
                className="form-control border-end-0"
                id="exampleInputPassword1"
                onChange={handleChange}
                name="password"
                value={data.password}
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
          <div className="mb-3 w-50 d-flex me-auto ">
             {/* LOGIN PAGE IF ALREADY HAVE AN ACCOUNT*/}
            <a
              href="/login"
              className=" text-decoration-none w-100  float-end position-relative disabled "
            >
              ALready have an account <span>Login?</span>
            </a>
          </div>
          <button
            type="submit"
            className="btn btn-primary  d-flex justify-content-center mx-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
