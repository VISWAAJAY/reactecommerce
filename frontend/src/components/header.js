import React, { useContext, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import userContext from "../context/context";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  console.log("header", user);
  
  
  
  //LOGGINF OUT API CALL
  const handleLogout = async () => {
    const logout = await fetch("http://localhost:5000/api/logout", {
      method: "GET",
      credentials: "include",
    });

    const data = await logout.json();

    //NAVIGATING TO HOME PAGE IF USER LOGSOUT

    if (data.result) {
      toast.success(data.result);
      dispatch(setUser(null));
      navigate("/");
    }
    if (data.err) {
      toast.error(data.err);
    }
  };

  //SEARCH QUERIES LEADS TO SEARCH PAGE
  const searchFunc=(e)=>{
      e?.preventDefault()
    const{value} = e.target
    if(value){
      navigate(`/search?q=${value}`)
    }

  }

  return (
    <div className="container-fluid bg-dark justify-content-between shadow ">
      <div className="container ">
        <nav className="navbar navbar-expand-md d-flex ">
          <a className=" navbar-brand fw-bold fs-2 fst-italic text-warning cursivefont " href="/">
            Amazona
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-warning"></span>
          </button>
          <div
            className="collapse navbar-collapse navhead "
            id="navbarSupportedContent"
          >{/**value for search query */}
            <form className="form w-100 d-flex forsmall forsmalsearch justify-content-center flex-grow-1rounded">
              <input
                className="search form-control-md  rounded-start-2  rounded-end-0 inputsearch w-50 "
                placeholder="search for items" 
                onChange={(e)=>searchFunc(e)}
              ></input>
              <button className="btn btn-outline-warning rounded-end-2 rounded-start-0">
                Search
              </button>
            </form>
            <div className="d-flex me-0 forsmall">
              {/**userprofile */}
              {
                user?(
                  <>
                  <div className="dropdown d-flex ">
                <button
                  className="btn btn-subtle dropdown-toggle logos rounded-pill text-primary fs-5 text-warning" 
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                    <FaUserAlt />
                </button>
                <ul className="dropdown-menu text-bg-warning">
                  {
                    user.role==='admin'?(
                      <li>
                    <a href="/adminPanel"  className="dropdown-item">
                      AdminPanel
                    </a>
                  </li>
                    ):(<></>)
                  }
                  <li>
                    <Link to= "/orderhistory" className="dropdown-item" href="/orderhistory">
                      OrderHistory
                    </Link>
                  </li>
                  <li>
                    <Link to="/userdetails" className="dropdown-item" href="/userdetails">
                      User
                    </Link>
                  </li>
                </ul>
              </div>

                <Link to="/cart" className="ms-2 fs-4 me-4 logos my-auto text-warning ">
              <FaShoppingCart />
              </Link>
              </>
                ):(<></>)
              }
              
              {/**userprofile */}

              
                
              
              
              
              
              <div>
                {user?._id ? (
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-warning rounded my-auto mt-2"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/Login"
                    className="btn btn-outline-warning rounded my-auto mt-2"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
