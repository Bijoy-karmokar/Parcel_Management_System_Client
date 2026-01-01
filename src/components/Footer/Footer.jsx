import React from "react";
import ProfastLogo from "../ProfastLogo/ProfastLogo";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const Footer = () => {
    
  return (
    <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content w-11/12 mx-auto p-10">
      <aside>
       <ProfastLogo></ProfastLogo>
        <p className="font-semibold">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.
        </p>
      </aside>
      <div className="flex items-center gap-5 justify-center list-none">
         <li><NavLink className={({isActive})=>isActive? "text-blue-600 underline underline-offset-2 font-bold" : "font-bold"} to={"/"}>Home</NavLink></li>
        <li><NavLink className={({isActive})=>isActive? "text-blue-600 underline underline-offset-2 font-bold" : "font-bold"} to={"/about"}>About us</NavLink></li>
      </div>
      <nav className="space-y-3">
        <div className="grid grid-flow-col gap-4">
          <Link to="https://www.facebook.com"><FaFacebook className="text-blue-500" size={25}></FaFacebook></Link>
          <Link to={"https://www.instagram.com"}><FaInstagram size={25}></FaInstagram></Link>
          <Link to={"https://www.youtube.com"}><FaYoutube className="text-red-500" size={25}></FaYoutube></Link>
          <Link to={"https://www.linkedin.com"}><FaLinkedin className="text-blue-800" size={25}></FaLinkedin></Link>
        </div>
      <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </nav>
    </footer>
  );
};

export default Footer;
