import React from "react";
import "./navbar.css";
import searchBar from "../searchbar/searchbar";
import { CgProfile } from "react-icons/cg";
import { GoSearch } from "react-icons/go";
// import styled from "styled-components";

const Navbar = () => {
  return (
    // <nav className="nav1 t-bg-white t-border-t-2 t-border-cyan-300">
    <nav className="nav1 t-bg-[#0262AF]">
      <div className="logo">
        {/* <h2 className="nazar t-text-white">NAZAR</h2> */}
        <h2 className="t-italic t-font-bold t-text-[2rem] t-text-white">
          NAZAR
        </h2>
      </div>
      <div className="search-bar">
        <div className="search-input">
          {/* <div class="search-icon"> */}
          <GoSearch />
          {/* </div> */}
          <input type="text" placeholder="Search here" className="prompt" />
        </div>
      </div>
      <div className="user">
        <div className="user-bar">
          <CgProfile className="profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
