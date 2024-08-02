import React, { useEffect, useState } from "react";
import "./allUsers.css";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import Usermodal from "../components/usermodal";

const Allusers = () => {

//fetching all user APi
 //declaring all users as an empty array and setting them from api response
  const [allUsers, setallUsers] = useState([]);

  //setting visibilty of updating UI
  const [visible , setVisible] = useState(false)

  //for updating user roles
  const[updateUserdetails , setUpdateUserDetails] = useState({
    _id:"",
    fullName:"",
    email:"",
    role:"",
  })

  const fetchusers = async () => {
    const fetchallUsers = await fetch("http://localhost:5000/api/allusers", {
      method: "GET",
      credentials: "include",
    });

    const users = await fetchallUsers.json();

    if (users.message) {
      setallUsers(users.data);
      console.log("allusers", allUsers);
    }

    if (users.error) {
      toast.error(users.err);
    }
  };

  useEffect(() => {
    fetchusers();
  }, []);

  return (
    <>
      <div className="d-flex w-100 container-fluid ms-5 shadow-lg h-100 justify-content-evenly">
        <table className="customtable rounded-full">
          <thead className="">
            <tr className="bg-dark text-light">
              <th className="customrow">Sr</th>
              <th>FullName</th>
              <th>PhoneNumber</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody className="w-100">
            {allUsers.map((user, i) => {
              return (
                <tr className=" h-auto" key={user._id}>
                  <td>{i + 1}</td>
                  <td className="text-capitalize">{user.fullName}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td className=" text-capitalize">{user.role}</td>
                  <td>
                    <div>
                      <button className="btn btn-outline-warning" 
                       onClick={
                        ()=>{
                          setVisible(true);
                          setUpdateUserDetails(user)
                       }}>
                      <FaRegEdit /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {
        visible?(
          <Usermodal onClose={()=>setVisible(false)} 
          fullName={updateUserdetails.fullName} 
          user_id = {updateUserdetails._id}
          email={updateUserdetails.email}
          role={updateUserdetails.role}
          fetchallUsers ={fetchusers}/>
        ): ("")
      }
      
    </>
  );
};
export default Allusers;
