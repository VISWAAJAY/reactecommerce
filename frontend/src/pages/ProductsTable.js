import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import "./productstable.css";
import UpdateProduct from "./UpdateProduct";

const ProductsTable = () => {

  const[visible , setVisible] = useState(false);


  const [products, setProducts] = useState([]);

  const[updateProduct , setUpdateProduct] = useState(null);

  const handleUpdate = (product)=>{
      setUpdateProduct(product)
      setVisible(true);
  }

  const fetchProducts = async () => {
    const fetchallProducts = await fetch(
      "http://localhost:5000/api/allProducts",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const products = await fetchallProducts.json();

    if (products.message) {
      setProducts(products.data);
      console.log("allProducts", products);
    }

    if (products.error) {
      toast.error(products.err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className=" ms-2 container-fluid  w-100 shadow rounded customheight">
        <div className="container d-flex  w-100">
          <table className=" justify-content-evenly w-100  ">
            <thead className="bg-dark text-white">
              <tr>
                <th>Sr</th>
                <th>ProductName</th>
                <th>ProductBrand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody className="w-100">
              {products.map((product, i) => {
                return (
                  <tr key={product._id}>
                    <td>{i + 1}</td>
                    <td>{product.productTitle}</td>
                    <td>{product.productBrand}</td>
                    <td>{product.category}</td>
                    <td>{product.sellingPrice}</td>
                    <td>
                      <div>
                      
                        <button className="btn btn-outline-warning"
                        onClick={()=>handleUpdate(product)}
                        >
                          {/**" edit button "*/}
                          
                          <FaRegEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {console.log(products)}
      {
        
        visible?
        <UpdateProduct product={updateProduct} key={updateProduct._id}
          fetchProducts = {fetchProducts}
        onClose={()=>setVisible(false)} 
        />:""
      }
     
    </>
  );
};

export default ProductsTable;
