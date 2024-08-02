import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import Addtocart from "../helpers/addtocart";

const Featuredproducts = () => {
  const [featured, setFeatured] = useState([]);
  const [show, setShow] = useState(false);
  const loadarray = new Array(10).fill(null);
  const dispatch = useDispatch();

  //GETTING CATEGORY WISE PRODUCTS
  const fetchCategory = async () => {
    setShow(true);

    const response = await fetch("http://localhost:5000/api/category", {
      method: "GET",
    });
    const apiresponse = await response.json();
    setFeatured(apiresponse.data);
    setShow(false);
  };
  //TO CALL ONCE PAGE IS RENDERED
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
      <div className="container h-50 mt-3 mb-3 p-3 bg-info-subtle rounded">
        <h3 className=" text-center text-decoration-underline fs-1 mb-3">
          FeaturedProducts
        </h3>
        {/**ANIMATION WHEN PAGE IS LOADING */}
        <div className="d-flex h-50 flex-wrap gap-4 justify-content-center align-content-center customgrid">
          {show
            ? loadarray.map((product, i) => {
                return (
                  <div
                    key={i}
                    className="card customcardCategory overflow-hidden h-100 placeholder-wave align-content-center"
                  >
                    <p
                      className="card-img-top customcategorycard  placeholder text-center bg-info align-self-center"
                      alt=""
                    />
                    <div className="card-body">
                      <h5 className="card-title text-truncate text-capitalize placeholder w-100">
                        Loading...
                      </h5>
                      <p className="card-text text-truncate fw-bold text-dark text-capitalize "></p>
                      <p className="card-text text-truncate fw-semibold text-capitalize placeholder w-100">
                        Loading...
                      </p>
                      <p className="card-text text-truncate fs-6 placeholder w-100">
                        <span className="fs-6 placeholder"></span>Loading...
                      </p>
                      <p href="#" className=" placeholder w-100 h-100"></p>
                    </div>
                  </div>
                );
              })
            : featured.map((product, i) => {
                return ( //PRODUCTS DISPLAYING
                  <Link
                    to={"productDetails/" + product._id}
                    key={product._id}
                    className="card customcardCategory overflow-hidden h-50 text-decoration-none"
                  >
                    <img
                      className="card-img-top customcategorycard object-fit-contain imagehover"
                      src={product.productImage}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title text-truncate fw-light text-capitalize">
                        {product.productTitle}
                      </h5>
                      <p className="card-text text-truncate fw-lighter text-dark text-capitalize">
                        {product.category}
                      </p>
                      <p className="card-text text-truncate fw-normal text-capitalize">
                        {product.productBrand}
                      </p>
                      <p className="card-text text-truncate fs-6">
                        <span className="fs-6">
                          <FaRupeeSign />
                        </span>
                        {product.sellingPrice}
                      </p>
                      <button
                        className="btn btn-outline-danger"
                        onClick={(e) => Addtocart(e, product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                );
              })}

        </div>
      </div>
    </>
  );
};

export default Featuredproducts;
