import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid  bg-dark position-relative">
      <div className="row mt-auto mb-0 container mx-auto">
        <div className="col-lg-3 mb-3 col-sm-12 " id="ftrwomen">
          <h5 className="mt-2 text-primary ms-3">Women</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link">
                Dresses
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link ">
                Pants
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link ">
                Skirts
              </a>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 mb-3 col-sm-12 " id="ftrmen">
          <h5 className="text-primary mt-2 ms-3">Men</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link ">
                Shirts
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link ">
                Pants
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link ">
                Hoodies
              </a>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 mb-3 col-sm-12" id="ftrkids">
          <h5 className="text-primary mt-2 ms-3">Kids</h5>
        </div>

        <div className="col-lg-3 mb-3 col-sm-12" id="ftrlinks">
          <h5 className="text-primary mt-2 ms-3">Links</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="/" className="nav-link ">
                Home
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/login" className="nav-link ">
                Login
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link ">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="container" id="ftrdivider"></div>
        <p className="afterdiv">copyright &copy Ecommerce & 2022-2024</p>
      </div>
    </div>
  );
};

export default Footer;
