import React, { useState } from "react";
import Categories from "../products/products";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";


const UpdateProduct = (
  { 
  product,
   onClose,
  fetchProducts
}
) => {

  const[show , setShow] = useState(false);


  //setting initial state of input fields
  const initialdata = {
    productTitle: product.productTitle,
    productBrand: product.productBrand,
    category: product.category,
    description: product.description,
    sellingPrice: product.sellingPrice,
  };

  //initial state of products data
  const [data, setData] = useState(initialdata);


  const handleChange = (e) => {
    const { name, value } = e.target;
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
      
  };
  console.log(data);




  const productresponse = async (e) => {
     //preventing default behaviour
    e.preventDefault();
    
    
    const productImage = product.productImage

    console.log(productImage);

    //setting uploading button true 
    setShow(true);


    //server connection request and sending form data
    const updated = await
    fetch(
          "http://localhost:5000/api/updateProduct",
      {
      method:'put',
      credentials:'include',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        _id : product._id,
          data 
      })
    })


    // awaiting response from server
    const apiresponse = await updated.json();

    //if result then success and sending appropriate frontend message
    if (apiresponse.message) {
      setShow(false);
      fetchProducts();
      fetchProducts();
      toast.success(apiresponse.message);
      
    }

    //if any err occured sending appropriate message to user
    if (apiresponse.err) {
      toast.error(apiresponse.err);
    }
  };


  return (
    <div className=" position-fixed d-flex top-0 bottom-0 start-0 end-0 rounded z-3 overflow-y-auto ">
        <div className="mx-auto bg-light  w-50 h-auto my-auto mx-auto container rounded">
          <button
            className="btn btn-outline-none ms-auto d-flex fs-3"
            onClick={onClose}
          >
            <IoCloseOutline />
          </button>
          <h4 className="mx-auto d-flex w-100 justify-content-center font-monospace">
            Edit Product
          </h4>

          {/**form */}
          <form
            className="form ms-2 rounded h-100 w-100 me-2 align-content-center justify-content-center mx-auto"
            method="post"
           onSubmit={productresponse}
          >
            <label htmlFor="pt" className="font-monospace  mb-4">
              ProductTitle:
            </label>
            <input
              className="mx-auto d-flex w-100 mx-4 font-monospace rounded  form-control-sm bg-info-subtle"
              name="productTitle"
              value={data.productTitle}
              onChange={handleChange}
              placeholder="Enter Product Title"
              id="pt"
              required
            ></input>
            <label htmlFor="pb" className="font-monospace ms-2 mb-2 ">
              ProductBrand:
            </label>
            <input
              className="mx-auto d-flex w-100 mx-4 font-monospace rounded  form-control-sm bg-info-subtle"
              onChange={handleChange}
              name="productBrand"
              value={data.productBrand}
              placeholder="enter Brand"
              id="pb"
              required
            ></input>
            <label htmlFor="catergory" className="font-monospace ms-2">
              Choose a Catergory:
            </label>
            <select
              id="category"
              className="mx-auto d-flex w-100 mx-4 font-monospace rounded  form-control-sm bg-info-subtle"
              name="category"
              value={data.category}
              onChange={handleChange}
            >
              {/*given categories and mapped them */}
              {Categories.map((category, i) => {
                return (
                  <option key={category.id} value={category.value}>
                    {category.label}
                  </option>
                );
              })}
            </select>
            <label htmlFor="pd" className="font-monospace ms-2">
              Description:
            </label>
            <textarea
              className="mx-auto d-flex w-100 mx-4 font-monospace rounded  form-control-sm bg-info-subtle"
              name="description"
              onChange={handleChange}
              placeholder="Enter Description"
              value={data.description}
              id="pd"
              required
            ></textarea>
            
            <div className="mx-auto h-25 d-flex object-fit-contain">
                <p className="">Image:</p>

                <img src={product.productImage} className="w-50 h-50 object-fit-lg-fill rounded mx-auto p-4 " alt="previous"></img>
            </div>

            <label htmlFor="sp" className=" font-monospace ms-2">
              Selling Price:
            </label>
            <input
              className="mx-auto d-flex w-100 mx-4 font-monospace rounded  form-control-sm bg-info-subtle"
              name="sellingPrice"
              onChange={handleChange}
              placeholder="Enter Selling Price"
              type="number"
              value={data.sellingPrice}
              id="sp"
              required
            ></input>

            
            {
            //displaying buttons based on actions being performed
            !show ? (
              <button
                className="d-flex btn btn-primary  ms-auto my-4"
                type="submit"
              >
                Save Changes
              </button>
            ) : (
              <button
                className="btn btn-primary d-flex btn btn-primary  ms-auto my-4"
                type="button"
                disabled
              >
                <span
                  className="spinner-grow spinner-grow-sm align-self-center"
                  role="status"
                  aria-hidden="true"
                ></span>
                Saving...
              </button>
            )}
          </form>
        </div>
      </div>
  );
};

export default UpdateProduct;
