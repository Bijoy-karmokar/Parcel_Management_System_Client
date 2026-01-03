import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Authentication/LogIn/Login";
import Register from "../pages/Authentication/Register/Register";

const router = createBrowserRouter([
    {
        path:"/",
        Component: MainLayouts,
        children:[
            {
                index:true,
                Component:Home
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
    }
])
export default router;