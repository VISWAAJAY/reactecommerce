import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './productDetails.css';
import { FaRupeeSign } from 'react-icons/fa';
import addToCart from '../helpers/addtocart';

const ProductDetails = () => {

    const[data  ,setData] = useState([])

    const[loading , setLoading] = useState(false);
//GETTING PRODUCTID
    const params = useParams();
//FETCHING PRODUCT
    const fetchProductDetails = async()=>{
        setLoading(true);
        try{
            const response = await fetch("http://localhost:5000/api/productDetails",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    product_id :params.id,
                })
            })
            const details = await response.json();
            setLoading(false);
            setData(details.data)
        }catch(err){
            console.log(err)
        }
        
    }
    useEffect(() => {
        fetchProductDetails();
    }, []);
    console.log("Separateee",data)
  return (
    loading?(
        <div className=' container-fluid col-12 h-100  w-100 mt-5 mb-3 placeholder-wave  '>
        
        {/**Product Image */}
        <div className='h-100 container d-flex customdetailscontainer bg-info-subtle rounded w-100 placeholder'>
            <div className='container h-100 col-6 mx-auto gap-2 d-flex card placeholder align-self-stretch mt-auto mb-auto w-50 p-3 customdetailscard1 '> 
                <h5 className='fs-1 text-success card-body h-100 '></h5>
                <img  className=' object-fit-fill card-body h-100 align-self-center '></img>
                   {/**Product Details */}
                
            </div>
            <div className='col-6 p-3 card bg-body-secondary w-50 customdetailscard1 '>
                    <h2 className=' text-danger mb-2 card-title text-center placeholder '></h2>
                    <div className='card-body gap-4 placeholder'>
                    <h6 className='mb-2 card-text placeholder'>Brand:<span className='fw-light'></span></h6>
                    <h6 className='mb-2 card-text placeholder'>Description: <span className='fw-light'></span></h6>
                    <h6 className='mb-2 card-text align-self-bottom placeholder'> Price:<span className="fs-6 fw-light placeholder"><FaRupeeSign /></span><span className='fw-light placeholder'></span></h6>


                    </div>
                    <div className='d-flex card-footer justify-content-between w-100 gap-2'>
                    <button className='btn btn-outline-danger w-50 placeholder '> </button>
                    <button className='btn btn-outline-danger w-50 placeholder'></button>
                    </div>
                </div>
        </div>
    </div>
    ):(
        <div className=' container-fluid col-12 h-100  w-100 mt-5 mb-3  '>

            <h2 className='text-center text-success text-decoration-underline mb-4'>PRODUCT DETAILS</h2>
        
        {/**Product Image */}
        <div className=' container d-flex customdetailscontainer bg-info-subtle rounded  w-100'>
            <div className='bg-info-subtle col-6 mx-auto d-flex text-center w-50 p-3 customdetailscard'> 
                <img src={data.productImage} className='card-body object-fit-scale customcardimage'></img>
                   {/**Product Details */}
                
            </div>
            <div className='col-6 p-3 card bg-body-secondary w-50 customdetailscard '>
                    <h2 className=' text-danger mb-2 card-title text-center '>{data.productTitle}</h2>
                    <div className='card-body gap-4'>
                    <h6 className='mb-2 card-text'>Brand:<span className='fw-light'>{data.productBrand}</span></h6>
                    <h6 className='mb-2 card-text'>Description: <span className='fw-light'>{data.description}</span></h6>
                    <h6 className='mb-2 card-text align-self-bottom'> Price:<span className="fs-6 fw-light"><FaRupeeSign /></span><span className='fw-light'>{data.sellingPrice}</span></h6>


                    </div>
                    <div className='d-flex card-footer justify-content-between w-100 gap-2'>
                    <button className='btn btn-outline-danger w-50 ' onClick={(e) => addToCart(e, data)}> Buy Now</button>
                    <button className='btn btn-outline-danger w-50'onClick={(e) => addToCart(e, data)}> Add To Cart</button>
                    </div>
                </div>
        </div>



     

        <div className='mx-auto mt-3 container d-flex flex-column justify-content-center align-content-center'>
            <h5 className='fw-bold'> </h5>
            <div className='d-flex w-100'>
            <input type='texarea' className=' w-75 form-control' placeholder='Add a comment' value={data.value}></input>
            <button className='btn btn-danger'>Add Comment</button>
            </div>
            
            
            <p className='fs-3 fw-bold text-wrap mt-4'>Comments:</p>
            <div className='container'>
                <p>Commented By:</p>
                <p className='mt-0'>not a good product</p>
            </div>
            
        </div>
    </div>
    )
  )
}

export default ProductDetails