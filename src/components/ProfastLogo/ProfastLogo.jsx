import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const ProfastLogo = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img className="mb-2" src={logo} alt="" />
        <p className="text-2xl md:text-4xl font-semibold -ml-3">Profast</p>
      </div>
    </Link>
  );
};

export default ProfastLogo;
