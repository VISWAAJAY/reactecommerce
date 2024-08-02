import React, { useEffect, useState } from 'react'
import './orderHistory.css'
const OrderHistory = () => {
  const[orders , setOrders] = useState([]);
//GETTING ORDER HISTORY AND SETTING DATA OF HISTORY
  const getOrders = async()=>{
    const response = await fetch("http://localhost:5000/api/getOrdersById",{
      method:'GET',
      headers:{
        'Content-Type':'Application/json',
      },
      credentials:'include'

    })
    const res = await response.json();
    setOrders(res.data);
  }
//FETCHING ONLY ONCE WHEN PAGE IS RENDERED
  useEffect(()=>{
    getOrders()
  },[])
//FORMATING DATE
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

  return (
//DISPLAYING ORDERS TABLE
    <div className="d-flex w-auto  container-fluid  shadow-lg h-100 justify-content-evenly customsize">
        <table className="customtable rounded-full">
          <thead className="">
            <tr className="bg-dark text-light">
              <th className="customrow">Sr</th>
              <th>ProductName</th>
              <th>Price</th>
              <th>Paid</th>
              <th>OrderedDate</th>
            </tr>
          </thead>
          <tbody className='w-100'>
          {orders?.map((order, i) => (
                            <tr className=" h-auto text-capitalize" key={order._id}>
                                <td>{i + 1}</td>
                                <td>
                                    {order?.product?.map((product, index) => (
                                        <div key={product._id} className='restirctwidth'>
                                            {product.productTitle}
                                        </div>
                                    ))}
                                </td>
                                <td>₹{order?.product?.reduce((total, product) => total + product.sellingPrice, 0)}</td>
                                <td className="text-capitalize">No</td>
                                <td>{formatDate(order.createdAt)}</td>
                            </tr>
                        ))}
          </tbody>
        </table>
    </div>    
  )

}

export default OrderHistory