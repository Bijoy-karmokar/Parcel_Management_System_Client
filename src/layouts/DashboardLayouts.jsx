import React from "react";
import { NavLink, Outlet } from "react-router";
import ProfastLogo from "../components/ProfastLogo/ProfastLogo";
import { AiOutlineHome } from "react-icons/ai";
import { FaBoxOpen, FaUserCog } from "react-icons/fa";
import { RiHistoryLine } from "react-icons/ri";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaMotorcycle } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import useUserRole from "../hooks/useUserRole";

const DashboardLayouts = () => {
  const {role,roleLoading} =useUserRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-xl font-bold lg:hidden">
            DashBoard
          </div>
          <div className="hidden flex-none lg:hidden">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <a>Navbar Item 1</a>
              </li>
              <li>
                <a>Navbar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <ProfastLogo></ProfastLogo>
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <AiOutlineHome size={20} />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/myParcels"
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <FaBoxOpen size={20} />
              My Parcels
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/paymentHistory"
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <RiHistoryLine size={20} />
              Payment History
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/track"
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <MdOutlineTrackChanges size={20} />
              Track a Package
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/profile"
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <RiUserSettingsLine size={20} />
              Update Profile
            </NavLink>
          </li>

         {
          !roleLoading && role ==="admin" &&
          <>
           <li>
            <NavLink
              to="/dashboard/activeRiders"
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <FaMotorcycle size={20} />
              Active Riders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/pendingRiders"
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <MdPendingActions size={20} />
              Pending Riders
            </NavLink>
          </li>
           <li>
        <NavLink
          to="/dashboard/makeAdmin"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600" : ""
          }
        >
         <FaUserCog size={20}></FaUserCog>
          Make Admin
        </NavLink>
      </li>
          </>
         }
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayouts;
