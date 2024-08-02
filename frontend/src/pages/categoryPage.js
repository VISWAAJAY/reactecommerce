import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import "./categoryPage.css";

import AddToCart from "../helpers/addtocart";

const CategoryPage = () => {
  const params = useParams();
    //GETTING CATEGORY NAME FROM PARAMS
  const category = params.category;

  const [productsDisplay, setProductsDisplay] = useState([]);
  //LOADING STATES
  const[loading , setLoading] = useState(false);

    //FETCHING PRODUCTS BASED ON THE CATEOGRY
  const fetchByCategory = async (category) => {
    setLoading(true)
    const response = await fetch("http://localhost:5000/api/categoryPage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
    });
    const categoryProduct = await response.json();
    setProductsDisplay(categoryProduct.data);
    setLoading(false)
  };
//FETCHING ONLY ONCE WHEN PAGE IS LOADED 
  useEffect(() => {
    fetchByCategory(category);
  }, []);
  return (
    <>
        <div className="container mb-3 border">
            {
                loading ? (
                    <>
                    {/**ANIMATIONS FOR WHEN LOADING */}
                        <h2 className="fw-bold">Loading...</h2>
                        <p>Finding <span className="fw-bold fs-5 placeholder-glow"></span> Products...</p>
                        <div className="d-flex gap-3 rounded">
                            {productsDisplay.map((product, i) => (
                                <div key={i} className="card customcardCategory overflow-hidden">
                                    <img
                                        className="card-img-top customcategorycard placeholder-glow"
                                        src='../'
                                        alt=""
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-truncate w-25 placeholder-glow"></h5>
                                        <p className="card-text text-truncate fw-bold text-dark text-capitalize"></p>
                                        <p className="card-text text-truncate placeholder-glow w-25"></p>
                                        <button href="#" className="btn btn-warning placeholder-glow">
                                            
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>  {/**DISPLAYING PRODUCTS */}
                        <h2 className="fw-bold">Top {params.category}</h2>
                        <p>Found <span className="fw-bold fs-5">{productsDisplay.length}</span> Products</p>
                        <div className="d-flex gap-3 rounded">
                            {productsDisplay.map((product, i) => (
                                <Link to={"productDetails/"+product._id} className="card customcardCategory overflow-hidden text-decoration-none">
                                    <img
                                        className="card-img-top customcategorycard imagehover"
                                        src={product.productImage}
                                        alt="Card image cap"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-truncate">{product.productTitle}</h5>
                                        <p className="card-text text-truncate fw-bold text-dark text-capitalize">{product.category}</p>
                                        <p className="card-text text-truncate">{product.description}</p>
                                        <p className="card-text text-truncate fs-6"><span className="fs-6"><FaRupeeSign /></span>{product.sellingPrice}</p>
                                        <button href="#" className="btn btn-warning" onClick={(e)=>AddToCart(e,product._id)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    </>
);
}
export default CategoryPage;
