import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/homepage";
import Register from "../pages/register";
import Login from "../pages/Login";
import AdminPanel from "../pages/adminPanel";
import Allusers from "../pages/Allusers";
import CartPage from "../pages/cartPage";
import OrderHistory from "../pages/OrderHistory";
import Userdetails from "../pages/Userdetails";
import ProductsTable from "../pages/ProductsTable";
import UploadProduct from "../pages/uploadProduct";
import CategoryPage from "../pages/categoryPage";
import ProductDetails from "../pages/ProductDetails";
import SearchPage from "../pages/SearchPage";
import Shipping from "../components/Shipping-details/Shipping";
import Payment from "../components/Shipping-details/Payment";
import OrderSummary from "../components/Shipping-details/OrderSummary";
import AllOrders from "../pages/AllOrders";

//ROUTES FOR APPLICATION -THE ERRORS IS REGARDING FILE NAMES I CHANGED THEM AND IMPORTED AGAIN BUT IT STILL SHOWS ERROR

const Router = createBrowserRouter([
    {
    path:'/',
    element:<App/>,
    children:[
        {
            path: "",
            element:<Homepage/>
        },
        {
            path:"/login",
            element:<Login/>       
        },
        {
            path:"/register",
            element:<Register/>
        },
        {
            path:"/category/:category",
            element:<CategoryPage/>
        },
        {
            path:"/productDetails/:id",
            element:<ProductDetails/>
        },

        {
            path:"/category/:category/productDetails/:id",
            element:<ProductDetails/>
        },

        {
            path:"/cartpage/:id",
            element:<CartPage/>
        },

        {
            path:"/adminPanel",
            element:<AdminPanel/>,
            children:[{
                    path:"allUsers",
                    element:<Allusers/>
                },
                {
                    path:"uploadProduct",
                    element:<UploadProduct/>
                },
                {
                    path:'tableproducts',
                    element:<ProductsTable/>
                },{
                    path:'allorders',
                    element:<AllOrders/>
                }

                ]
        },
        {
            path:"/search",
            element:<SearchPage/>
        },
        {
            path:"/cart",
            element:<CartPage/>
        },
        {
            path:'/orderhistory',
            element:<OrderHistory/>
        },
        {
            path:"/userdetails",
            element:<Userdetails/>
        },{
            path:"/Shipping",
            element:<Shipping/>
        },
        {
            path:"/checkout",
            element:<Payment/>
        },{
            path:"/orderSummary",
            element:<OrderSummary/>
        }
    ]
    }
])

export default Router