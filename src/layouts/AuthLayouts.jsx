import React from "react";
import { Outlet } from "react-router";
import AuthImg from "../assets/authImage.png"
import ProfastLogo from "../components/ProfastLogo/ProfastLogo";

const AuthLayouts = () => {
  return (
    <div className="p-12 bg-base-200">
        <ProfastLogo></ProfastLogo>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
            <img
          src={AuthImg}
          className="max-w-sm rounded-lg "
        />
        </div>
        <div className="flex-1 w-11/12 mx-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
