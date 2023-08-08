import React from "react";
import "./navbar2.css";
import { AiFillSave, AiFillCamera } from "react-icons/ai";
import { RiArrowGoBackFill, RiShareForwardFill } from "react-icons/ri";
import { BiSolidHide } from "react-icons/bi";
import { FaFileCsv } from "react-icons/fa";

const Navbar2 = () => {
  return (
    <nav className="nav2 t-h-[30px]">
      <div className="icons t-h-[30px]">
        <AiFillSave className="icon" />
        <RiArrowGoBackFill className="icon" />
        <BiSolidHide className="icon" />
        <FaFileCsv className="icon" />
        <AiFillCamera className="icon" />
        <RiShareForwardFill className="icon" />
      </div>
    </nav>
  );
};

export default Navbar2;
