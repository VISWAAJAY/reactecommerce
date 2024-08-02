import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Userdetails = () => {
    //UPDATING USER DETAILS
    const user = useSelector((state) => state.user?.user);
    const initialData = {
        fullName: user?.fullName || '',
        phoneNumber: user?.phoneNumber || '',
    };
    //DISABLING BUTTON IF NO CHANGES ARE MADE
    const [disable, setDisable] = useState(true);
    const [data, setData] = useState(initialData);

    
    useEffect(() => {
        setData(initialData);
    }, [user]);

    //HANDLING CHANGES
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
        setDisable(false);
    };

    //UPDATE AT BACKEND
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/updateUserDetails", {
                method: 'put',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user._id,
                    fullName: data.fullName,
                    phoneNumber: data.phoneNumber,
                }),
            });

            const result = await response.json();
            setDisable(true);
            if (response.ok) {
                toast.success(result.message);
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("An error occurred while updating user details.");
        }
    };

    

    return (
        <div className='container justify-self-center mt-4'>
            <form className='card justify-content-center' onSubmit={handleSubmit}>
                <label htmlFor='name' className='mx-4 mb-3 mt-3'>
                    FullName: <span className='ms-3 fw-bold'>{data.fullName}</span>
                </label>
                <input
                    id='name'
                    className='form-control mx-4 w-auto mb-3'
                    onChange={handleChange}
                    name='fullName'
                    value={data.fullName}
                />
                <label htmlFor='num' className='mx-4 mb-3'>
                    PhoneNumber: <span className='ms-3 fw-bold'>{data.phoneNumber}</span>
                </label>
                <input
                    id='num'
                    className='form-control mx-4 w-auto mb-3'
                    onChange={handleChange}
                    name='phoneNumber'
                    value={data.phoneNumber}
                />
                <button
                    type='submit'
                    disabled={disable}
                    className='btn btn-warning w-25 justify-content-center align-self-center mb-3'
                >
                    Update Details
                </button>
            </form>
        </div>
    );
};

export default Userdetails;
