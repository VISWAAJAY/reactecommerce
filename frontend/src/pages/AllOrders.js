import React, { useEffect, useState } from 'react';
import './AllOrders.css'
//ALL ORDERS TABLE
const AllOrders = () => {
    const [orders, setOrders] = useState([]);
//GETTING ALL ORDERS FROM BACKEND
    const getOrders = async () => {
        const response = await fetch("http://localhost:5000/api/allorders", {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json'
            },
            credentials: 'include',
        });
        const allOrders = await response.json();

        setOrders(allOrders.data);
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        //TABLE
        <div className='h-100 overflow-y-scroll w-auto shadow'>
            <div className="d-flex w-auto container-fluid ms-5 shadow-lg h-auto justify-content-evenly">
                <table className="customtable rounded-full">
                    <thead className="">
                        <tr className="bg-dark text-light">
                            <th className="customrow">Sr</th>
                            <th>UserName</th>
                            <th>Products</th>
                            <th>PhoneNumber</th>
                            <th>Price</th>
                            <th>Paid</th>
                            <th>Date:</th>
                        </tr>
                    </thead>
                    <tbody className="w-100">
                        {/**MAPPING EACH ROW */}
                        {orders?.map((order, i) => (
                            <tr className=" h-auto text-capitalize" key={order._id}>
                                <td>{i + 1}</td>
                                <td className="text-capitalize">{order?.user?.fullName}</td>
                                <td>
                                    {order?.product?.map((product, index) => (
                                        <div key={product._id} className='restirctwidth'>
                                            {product.productTitle}
                                        </div>
                                    ))}
                                </td>
                                <td>{order?.user?.phoneNumber}</td>
                                <td>₹{order?.product?.reduce((total, product) => total + product.sellingPrice, 0)}</td>
                                <td className="text-capitalize">No</td>
                                <td>{order.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;
