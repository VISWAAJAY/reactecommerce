
import { toast } from "react-toastify";



    const addToCart = async (e,product) => { 
        e?.stopPropagation()
        e?.preventDefault()
        //adding to cart 
        const response = await fetch("http://localhost:5000/api/addtocart", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials:'include',
            body: JSON.stringify({
                product_id: product._id 
            })
        });
        const responseData = await response.json();
        //appropriate messages to user 
        if (responseData.message) {
            toast.success(responseData.message);
        }
        if (responseData.error) {
            toast.error(responseData.error);
        }
    }


export default addToCart;
