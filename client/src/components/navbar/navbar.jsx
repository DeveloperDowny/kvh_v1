import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import searchBar from "../searchbar/searchbar";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  IconButton,
  InputRightAddon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"; // Assuming you have imported Chakra's icons
import {
  AdaImg,
  BitImg,
  EthImg,
  QImg,
  SolImg,
  TonImg,
  TromImg,
  XmrImg,
} from "../../assets";
import { useDispatch } from "react-redux";
import { setAddress, setMCryptoType } from "../../reducers/SiteCustom";

// import styled from "styled-components";

export const typeToImgMap = {
  btc: BitImg,
  eth: EthImg,
  xmr: XmrImg,
  ada: AdaImg,
  tron: TromImg,
  sol: SolImg,
  ton: TonImg,
  unk: QImg,
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
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const navigate = useNavigate();
  // const userData = useSelector((state) => state.auth.authData);
  const [userName, setUserName] = useState("");
  const [cryptoType, setCryptoType] = useState("unk");
  const mref = useRef(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Iterate through the regex patterns and check if the input matches any of them
    for (const type in regexes) {
      if (regexes[type].some((pattern) => pattern.test(inputValue))) {
        setCryptoType(type); // Set the matched crypto type in state
        dispatch(setMCryptoType(type));
        // dispatch(setAddress(inputValue));
        return; // Break the loop once a match is found
      }
    }

    setCryptoType("unk"); // Reset the crypto type if no match is found
    dispatch(setMCryptoType("unk"));
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
    <nav className="nav1 t-bg-white t-border-t-[1px] t-border-b-[1px]  ">
      <div className="logo t-flex t-items-center">
        {/* <h2 className="nazar t-text-white">NAZAR</h2> */}
        {/* <h2 className="t-italic t-font-bold t-text-[2rem] t-text-white"> */}
        {/* <h2 className="t-italic t-font-bold t-text-[2rem] t-text-[#0262AF]">
          NAZAR
        </h2> */}
      <img src="/nazar-logo.png" alt="Nazar" />
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
              padding={2}
              children={
                <Image
                  src={typeToImgMap[cryptoType]}
                  alt="crypto logo"
                  // className="t-h-[32px]"
                  className="t-h-[22px]"
                />
              }
              borderRadius="100px 0 0 100px"
            />
            <Input
              ref={mref}
              type="text"
              placeholder="Enter Crypto Address Here..."
              background={"white"}
              borderRadius={100}
              onChange={handleInputChange}
            />
            {/* <InputRightElement>
              <SearchIcon color="gray.300" />
            </InputRightElement> */}

            <InputRightAddon
              padding={0}
              children={
                <IconButton
                  icon={<SearchIcon />}
                  colorScheme="gray"
                  aria-label="Search"
                  borderRadius="0 100px 100px 0"
                  onClick={() => {
                    const inputValue = mref.current.value;
                    for (const type in regexes) {
                      if (
                        regexes[type].some((pattern) =>
                          pattern.test(inputValue)
                        )
                      ) {
                        setCryptoType(type); // Set the matched crypto type in state
                        dispatch(setMCryptoType(type));
                        dispatch(setAddress(inputValue));
                        navigate(`/boards/${inputValue}`);
                        return; // Break the loop once a match is found
                      }
                    }

                    setCryptoType("unk"); // Reset the crypto type if no match is found
                    dispatch(setMCryptoType("unk"));
                    console.log(cryptoType);
                  }} // Replace with your search logic function
                />
              }
              borderRadius="0 100px 100px 0"
            />
          </InputGroup>
          {/* <IconButton
              icon={<SearchIcon />}
              colorScheme="gray"
              aria-label="Search"
              borderRadius="0 100px 100px 0"
              onClick={() => {}} // Replace with your search logic function
            />
          </InputGroup> */}
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
