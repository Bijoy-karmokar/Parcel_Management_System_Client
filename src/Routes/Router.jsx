import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Authentication/LogIn/Login";
import Register from "../pages/Authentication/Register/Register";
import PrivateRoute from "./../Router/PrivateRoute";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashboardLayouts from "../layouts/DashboardLayouts";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import ParcelHistory from "../pages/Dashboard/paymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminRoute from "../Router/AdminRoute";
import Forbidden from "../pages/Forbidden/Forbidden";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";
import RiderRoute from "../Router/RiderRoute";
import PendingDeliveries from "../pages/Dashboard/PendingDeliveries/PendingDeliveries";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: async () => {
          const res = await fetch("/warehouses.json");
          return res.json();
        },
      },
      {
        path: "/beARider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json"),
      },
      {
        path:"/forbidden",
        Component:Forbidden
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayouts,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayouts></DashboardLayouts>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: ParcelHistory,
      },
      {
        path: "track",
        Component: TrackParcel,
      },
      // Riders only routes
      {
        path:'pendingDelivery',
        element:<RiderRoute>
          <PendingDeliveries></PendingDeliveries>
        </RiderRoute>
      },
      // Admin only routes
      {
        path:"assignRider",
        element:<AdminRoute>
          <AssignRider></AssignRider>
        </AdminRoute>
      },
      {
        path: "activeRiders",
        element:<AdminRoute>
           <ActiveRiders/>
        </AdminRoute>,
      },
      {
        path: "pendingRiders",
        element:<AdminRoute>
           <PendingRiders />
        </AdminRoute>,
      },
      {
        path:"makeAdmin",
        element:<AdminRoute>
          <MakeAdmin></MakeAdmin>
        </AdminRoute>
      }
    ],
  },
]);
export default router;
