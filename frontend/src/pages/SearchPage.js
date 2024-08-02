import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import addToCart from '../helpers/addtocart';
import { FaRupeeSign } from "react-icons/fa";

const SearchPage = () => {
  const val = useLocation()
  const toSearchval = val.search;
  const[loading , setLoading] = useState(false);
  const[searchRes , setSearchRes] = useState([]);
  //SEARCHING PRODUCTS PAGE
  const toSearch = async()=>{
    setLoading(true);
    const response = await fetch(`http://localhost:5000/api/search${toSearchval}`,{
      method:'GET'
    })
    const datares = await response.json()
    setSearchRes(datares.data);
    setLoading(false);
  }

  //WHEN VALUE CHANGES CALL THE API AGAIN
  useEffect(()=>{
    toSearch()
  },[val])
  return (
    //LOADING ANIMATION
      <div className='container d-flex h-50 flex-wrap gap-4 justify-content-center align-content-center customgrid'>
        {
          loading && (
            <h3 className=' text-center placeholder-wave mt-3'>Loading.....</h3>
          )
        }
          <h3 className='d-flex w-100 ms-3'>SearchResults:{searchRes?.length}</h3>
        {
          !loading && searchRes?.length === 0 && (
            <h3 className=' text-center placeholder-wave mt-3'>No Data Found</h3>
          )
        }

        {
          //RESULTS 
          searchRes?.length>0 && !loading && (
            searchRes.map((product , i)=>{
              return(
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
                        onClick={(e) => addToCart(e, product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
              )
            })
          )
        }
      </div>
  )
}

export default SearchPage