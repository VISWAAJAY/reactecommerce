import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { toast } from 'react-toastify';

//usermodal for updating userrole
const Usermodal = ({ //getting all details of user when button is pressed
    user_id,
    fullName,
    email,
    role,
    onClose,
    fetchallUsers
}) => {

    const[userRole , setuserrole] = useState(role)

    //update api for updating at backend

    const updateApi = async()=>{
        const updateApi = await fetch("http://localhost:5000/api/updateUser", {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id : user_id,
                role: userRole
            })
          });

        const apiResponse = await updateApi.json()
        //giving users respective messages on their actions
        if(apiResponse.err){
            toast.error(apiResponse.error)
        }

        if(apiResponse.message){
            toast.success(apiResponse.message)
            fetchallUsers()
            onClose()
        }
    }

    //setting user role on changing role in menu
    const handleUserRole = (e)=>{
        setuserrole(e.target.value)
    }

    //html for ui displaying
  return (
   <div className=' position-fixed d-flex top-0 bottom-0 start-0 end-0'>
    <div className='mx-auto bg-light  w-25 h-auto my-auto mx-auto container rounded '>
        <button className='btn btn-outline-none ms-auto d-flex fs-3'onClick={onClose}><IoCloseOutline /></button>
        <h4 className='mx-auto d-flex w-100 justify-content-center'>Change user Role</h4>
        <p className='mx-auto d-flex w-100 ms-2 font-monospace'>
            Name :{fullName} 
        </p>
        <p className='mx-auto d-flex w-100 ms-2 font-monospace'>
            Email : {email}
        </p>
        <div className='d-flex w-100 justify-content-between border-3 my-3'>
        <p className='mx-auto d-flex w-100 ms-2 font-monospace mt-3 mb-2'>
            Role : {role}
        </p>
        <select className='rounded-pill p-2 border-success' value={userRole} onChange={(e)=>handleUserRole(e)}>
            <option>admin</option>
            <option>general</option>
        </select>
        </div>
        <button className='d-flex btn btn-primary  ms-auto my-4' type='submit'onClick={updateApi}>
            Save Changes
        </button>
    </div>
    
   </div>
  )
}

export default Usermodal
