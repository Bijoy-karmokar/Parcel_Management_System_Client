import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Authentication/LogIn/Login";
import Register from "../pages/Authentication/Register/Register";
import PrivateRoute from './../Router/PrivateRoute';
import SendParcel from "../pages/sendParcel/SendParcel";
import DashboardLayouts from "../layouts/DashboardLayouts";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";

const router = createBrowserRouter([
    {
        path:"/",
        Component: MainLayouts,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:"/sendParcel",
                element:<PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
                loader: async ()=>{
                    const res = (await fetch('/warehouses.json'));
                    return res.json();
                }
            }
        ]
    },
    {
        path:"/",
        Component:AuthLayouts,
        children:[
            {
                path:"login",
                Component:Login
            },
            {
                path:"register",
                Component:Register
            }
        ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoute>
            <DashboardLayouts></DashboardLayouts>
        </PrivateRoute>,
        children:[
            {
             path:"myParcels",
             Component:MyParcels
            }
        ]
    }
])
export default router;