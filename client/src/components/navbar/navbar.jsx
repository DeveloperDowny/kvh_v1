import React, { useEffect, useState } from "react";
import "./navbar.css";
import searchBar from "../searchbar/searchbar";
import { CgProfile } from "react-icons/cg";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"; // Assuming you have imported Chakra's icons

// import styled from "styled-components";

const Navbar = () => {
  // const userData = useSelector((state) => state.auth.authData);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("profile"));
    console.log("userData:", userData);
    setUserName(userData?.name);
    // setUserName();
  }, []);

  return (
    // <nav className="nav1 t-bg-white t-border-t-2 t-border-cyan-300">
    // <nav className="nav1 t-bg-[#0262AF] t-border-t-2 t-">
    <nav className="nav1 t-bg-white t-border-t-[1px] ">
      <div className="logo t-flex t-items-center">
        {/* <h2 className="nazar t-text-white">NAZAR</h2> */}
        {/* <h2 className="t-italic t-font-bold t-text-[2rem] t-text-white"> */}
        <h2 className="t-italic t-font-bold t-text-[2rem] t-text-[#0262AF]">
          NAZAR
        </h2>
      </div>
      {/* <div className="search-bar"> */}
      <div className="t-flex t-justify-center">
        <div className="t-flex t-items-center t-w-[500px]">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              // placeholder="Search here"
              placeholder="Enter Crypto Address Here..."
              background={"white"}
              borderRadius={100}
              onChange={(e) => {
                const val = e.target.value;
                console.log("in on change : ", e.target.value);
                // TODO: find which network the address belongs to
              }}
            />
          </InputGroup>
        </div>
      </div>

      {!userName && (
        <div className="t-flex t-justify-center t-flex-row t-items-center">
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"/auth/signin"}
            color={"black"}
          >
            Sign In
          </Button>
          <div className="t-w-[1rem]"></div>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"#0262AF"}
            href={"/auth/signup"}
            borderRadius={100}
            _hover={{
              bg: "#1476D8",
            }}
          >
            Sign Up
          </Button>
        </div>
      )}

      {userName && (
        <div className="user">
          <div className="user-bar t-flex t-flex-row t-h-[40px] ">
            {userName && <CgProfile className="profile" size={30} />}

            <div className="t-ml-[0.5rem] t-font-semibold">
              {" "}
              {userName ? userName : "Sign In"}
            </div>
          </div>{" "}
          {!userName && (
            <div className=" t-ml-[0.5rem] user-bar t-flex t-flex-row t-h-[40px] t-justify-center">
              {/* {userName && <CgProfile className="profile" size={30} />}

          <div className="t-ml-[0.5rem] t-font-semibold">
            {" "}
            {userName ? userName : "Sign In"}
          </div> */}

              <div className="t-ml-[0.5rem] t-font-semibold">
                {userName ? userName : "Sign Up"}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
