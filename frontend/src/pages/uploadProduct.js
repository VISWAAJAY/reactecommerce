import React, { useState } from 'react'
import Categories from '../products/products';
import { toast } from 'react-toastify';


const UploadProduct = () => {
  const [visbile, setvisible] = useState(false);

  const[image , setImage] = useState({preview: '' , data:''})

  const handleImage = (e)=>{
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data:e.target.files[0]
    }
    setImage(img);
  }

  const UploadImage = async()=>{
    
    let imgformData = new FormData();
    imgformData.append('productImage',image.data);
    console.log(imgformData);

    const response = await fetch("http://localhost:5000/api/uploadFile",{
      method:'POST',
      credentials:'include',
      body:imgformData
    })

    return response; 
  }
  
  //setting initial state of input fields
  const initialdata = {
    productTitle: "",
    productBrand: "",
    category: "",
    description: "",
    sellingPrice: "",
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
    e.preventDefault();
    
    const imageResponse = await UploadImage();
    const p2 = await imageResponse.json();
    const productImage = `http://localhost:5000/api/files/${p2.data}`
    debugger;
    console.log(productImage);
    //setting uploading button true 
    setvisible(true);
    
    //preventing default behaviour
    
    //server connection request and sending form data
    const response = await fetch("http://localhost:5000/api/createProduct",{
      method:'post',
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        data,
       productImage
      })
    })


    // awaiting response from server
    const apiresponse = await response.json();

    //if result then success and sending appropriate frontend message
    if (apiresponse.result) {
      setvisible(false);
      setData(initialdata);
      toast.success(apiresponse.result);
    }

    //if any err occured sending appropriate message to user
    if (apiresponse.err) {
      toast.error(apiresponse.err);
    }
  };

  //const[visible , setVisible] = useState(false)
  return (
    <>
    
    <div className='container rounded bg-black text-white d-flex justify-content-between align-content-center ms-2'>
      <div className='my-auto'>UPLOAD A PRODUCT</div>
      <button className='btn btn-primary my-2'  disabled>UPLOAD</button>
    </div>

    {/**form for uploading products */}
    <div className=" container-fluid d-flex w-100 rounded z-3">
        <div className="mx-auto bg-light  w-100 h-auto my-auto mx-auto container rounded">
          {/**form */}
          <form
            className="form ms-2 rounded h-100 w-100 me-2 align-content-center justify-content-center mx-auto"
            method="POST"
            onSubmit={productresponse}
          >
            <label htmlFor="pt" className="font-monospace  mb-4 mt-3">
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
              required
            >
              {/*given categories and mapped them to reduce complexity */}
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
            <label htmlFor="productImage" className="font-monospace ms-2">
              Product Image
            </label>

            {/**image */}
            <div className="mx-auto d-flex  flex-column w-100 mx-4 font-monospace rounded form-control-sm bg-info-subtle">
              <input
                type="file"
                accept="image/*"
                id="productImage"
                name="productImage"
                onChange={handleImage}
                className="h-100 w-100 bg-info"
              />
              <p>Preview:</p>
              {
                image.preview && <img src={image.preview} width='100' height='100' alt="preview"  className=" object-fit-contain"/>
              }
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
            !visbile ? (
              <button
                className="d-flex btn btn-primary  ms-auto my-4"
                type="submit"
              >
                Upload
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
                Uploading...
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default UploadProduct