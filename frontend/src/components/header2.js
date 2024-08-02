import React, { useEffect, useState } from 'react'
import './header2.css'
import { Link } from 'react-router-dom';

const Header2 = () => {
    const[catergory , setCategory] = useState([])
    const[show , setShow] = useState(false);
    const loadarray = new Array(9).fill(null);
    //fetching based on category
    const fetchCategory = async()=>{
        setShow(true);

        const response = await fetch("http://localhost:5000/api/category" ,{
            method:'GET'
        })
        const apiresponse = await response.json();
        setCategory(apiresponse.data);
        setShow(false);
    }  
//fetching only once 
    useEffect(()=>{
        fetchCategory();
    },[])
  return (
    <div className='container d-flex mt-2 overflow-y-auto rounded hiddenscroll p-2'>
       <div className=' d-flex justify-content-center align-content-center w-100 '>
        {/**loading animation */}
        {
           show?(
            loadarray.map((load , i)=>{
                return(
                    <div className='customanimation placeholder-glow rounded-circle bg-info-subtle  rounded-circle me-3' key={load+i}>
                        <p className='placeholder rounded-circle align-self-center d-flex justify-content-center h-100 '></p>
                    </div>
                )
            })

            ):(//displaying product images
                catergory.map((product , i)=>{
                    console.log(product.category)
                    return(
                        
                        <Link to={"/category/"+product.category} key={product.category} className=' w-100 h-50  rounded-circle flex justify-content-center align-content-center text-decoration-none'>
                            <div className='ms-2 me-2 w-100 align-content-center rounded ' >
                                <img className='w-100 customimages' src={product.productImage} alt='productImage'/>
                                <p className='w-100 fs-6 text-center customfont fw-medium text-capitalize bg-info-subtle customheaderfont'>{product.category}</p>
                            </div>
                            
                        </Link>
                    )
                })
            
            )
            
        }
       </div>
    </div>
  )
}

export default Header2