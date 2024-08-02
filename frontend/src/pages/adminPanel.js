import React from "react";
import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import "./adminPanel.css";

const AdminPanel = () => {
  const user = useSelector((state) => state.user?.user);

  return (
    //card to display about user
    <div className="container-fluid">
      <div className="container adminpanel d-md-flex mt-4 ms-3 mb-5 h-100  border-0">
        <div className="w-25 h-100 bg-subtle card shadow-lg bg-light-subtle">
          <p className="justify-content-center align-content-center mt-3 d-flex text-secondary text-capitalize fw-semibold text-decoration-underline">
            ADMIN-DETAILS
          </p>
          <p className="justify-content-center align-content-center mt-3 d-flex text-secondary">
            USER PROFILE
          </p>
          <h5 className="justify-content-center align-content-center d-flex mt-1 mb-5 fs-1 ">
            <FaUserAlt />
          </h5>
          <p className="justify-content-center align-content-center d-flex mt-2  fs-5 text-capitalize fw-bold">
            <span className="fw-medium"> NAME:</span>
            {user?.fullName}
          </p>
          <p className="justify-content-center align-content-center d-flex fs-5 mb-5 text-capitalize fw-bolder">
            <span className="fw-medium">ROLE:</span>
            {user?.role}
          </p>
          <div>
            <nav>
              {/**Links to other panels */}
              <Link
                to={"allUsers"}
                className="justify-content-center align-content-center d-flex mt-2 mb-2 fs-5 text-capitalize text-secondary font-monospace text-decoration-none hoverchanges "
              >
                All users
              </Link>
              <Link
                to={"uploadProduct"}
                className="justify-content-center align-content-center d-flex mt-2 mb-2 fs-5 text-capitalize text-secondary font-monospace text-decoration-none hoverchanges "
              >
                Upload Product
              </Link>
              <Link
                to={"tableproducts"}
                className="justify-content-center align-content-center d-flex mt-2 mb-2 fs-5 text-capitalize text-secondary font-monospace text-decoration-none hoverchanges "
              >
                AllProducts
              </Link>
              <Link
                to={"allorders"}
                className="justify-content-center align-content-center d-flex mt-2 mb-2 fs-5 text-capitalize text-secondary font-monospace text-decoration-none hoverchanges "
              >
                All Orders
              </Link>
            </nav>
          </div>
        </div>
        <div className="adminpaneloutlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
