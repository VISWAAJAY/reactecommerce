
import './App.css';
import {Outlet} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import userContext from './context/context';
import { useDispatch } from 'react-redux';
import { setUser} from './store/userSlice';


function App() {
const dispatch = useDispatch();
const[cartCount , setCartCount] = useState(0);
const userdetails = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/userdetails", {
            method: 'GET',
            credentials: "include",
        });

        if (!response.ok) {
            toast.error(`Session expired Login again to continue`);
        }

       
        const userdata = await response.json();
        if(response.ok){
            
            dispatch(setUser(userdata.data))
        }
        console.log(userdata.data);
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
};
const addtocart = async () => {
   
        const response = await fetch("http://localhost:5000/api/count", {
            method: 'GET',
            credentials: "include",
        });

        if (!response.ok) {
            
            toast.error('dont need this');
        }

        setCartCount(response.data);

       
        const cartdata = await response.json();
        setCartCount(cartdata.data)

};


useEffect(() => {
    /**user details */
    userdetails();
    /**cart-details */

},); 

  return (
    <>
    <userContext.Provider value={{
        userdetails,
        addtocart, 
    }}>
    <ToastContainer />
    <Header/>
    <main className='custombodyheight'>
    <Outlet/>
    </main>
    
    <Footer/>
    </userContext.Provider>
    </>
  );
}

export default App;
