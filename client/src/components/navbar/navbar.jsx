import React, { useEffect, useState } from "react";
import "./navbar.css";
import searchBar from "../searchbar/searchbar";
import { CgProfile } from "react-icons/cg";
// import { GoSearch } from "react-icons/go";
// import { useSelector } from "react-redux";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Image,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"; // Assuming you have imported Chakra's icons
import {
  AdaImg,
  BitImg,
  EthImg,
  SolImg,
  TonImg,
  TromImg,
  XmrImg,
} from "../../assets";

// import styled from "styled-components";

const typeToImgMap = {
  btc: BitImg,
  eth: EthImg,
  xmr: XmrImg,
  ada: AdaImg,
  tron: TromImg,
  sol: SolImg,
  ton: TonImg,
};
{
  /* <Image src={typeToImgMap[cryptoType]} alt="crypto logo" /> */
}

const regexes = {
  btc: [
    /^1[a-zA-Z0-9]{25,33}$/,
    /^3[a-zA-Z0-9]{25,33}$/,
    /^bc1[a-zA-Z0-9]{23,42}$/,
    /^bc1p[a-zA-Z0-9]{23,42}$/,
  ],
  eth: [/^0x[a-fA-F0-9]{40}$/],
  xmr: [/^(4|8)[1-9A-Za-z]{94}$/],
  ada: [
    /^Ae2[1-9A-HJ-NP-Za-km-z]+$/,
    /^DdzFF[1-9A-HJ-NP-Za-km-z]+$/,
    /^addr1[a-z0-9]+$/,
    /^stake1[a-z0-9]+$/,
  ],
  tron: [/^T[A-HJ-NP-Za-km-z1-9]{33}$/],
  sol: [/^[1-9A-HJ-NP-Za-km-z]{32,44}$/],
  ton: [/^0:[a-z0-9]{64}$/, /^[a-zA-Z0-9\-\_]{48}$/, /^\w\s\w\s\w$/],
};

const Navbar = () => {
  // const userData = useSelector((state) => state.auth.authData);
  const [userName, setUserName] = useState("");
  const [cryptoType, setCryptoType] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Iterate through the regex patterns and check if the input matches any of them
    for (const type in regexes) {
      if (regexes[type].some((pattern) => pattern.test(inputValue))) {
        setCryptoType(type); // Set the matched crypto type in state
        return; // Break the loop once a match is found
      }
    }

    setCryptoType(""); // Reset the crypto type if no match is found
    console.log(cryptoType);
  };

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
            {/* <InputLeftAddon
              children={cryptoType}
              borderRadius="100px 0 0 100px"
              // onChange={handleInputChange}
            /> */}
            <InputLeftAddon
              children={
                <Image
                  src={typeToImgMap[cryptoType]}
                  alt="crypto logo"
                  className="t-h-[32px]"
                />
              }
              borderRadius="100px 0 0 100px"
            />
            {/* <Image src={typeToImgMap[cryptoType]} alt="crypto logo" /> */}
            <Input
              type="text"
              // placeholder="Search here"
              placeholder="Enter Crypto Address Here..."
              background={"white"}
              borderRadius={100}
              // onChange={(e) => {
              //   const val = e.target.value;
              //   console.log("in on change : ", e.target.value);
              // TODO: find which network the address belongs to
              onChange={handleInputChange}
            />
            <InputRightElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputRightElement>
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

// 1Awyd1QWR5gcfrn1UmL8dUBj2H1eVKtQhg - btc
// mswUGcPHp1YnkLCgF1TtoryqSc5E9Q8xFa - sol
