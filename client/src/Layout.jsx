import React from "react";
import WithSubnavigation from "./CFG components/Navbar";
import Sidebar from "./CFG components/Sidebar";
import { useSelector } from "react-redux";
import { NavbarImg, NavbarImgWO } from "./assets";
import { Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Navbar from "./components/navbar/navbar";
import Navbar2 from "./components/navbar2/navbar2";

const Layout = ({ children }) => {
  const shouldShowSidebar = useSelector(
    (state) => state.siteCustom.shouldShowSideBar
  );
  const { i18n } = useTranslation();

  const changeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
  };

  console.log("shouldShowSidebar", shouldShowSidebar);
  return (
    <div className="layout">
      <div className="t-fixed t-z-[100] t-w-full t-flex t-flex-col">
        {/* <div className="t-h-[42px] t-bg-[#0262AF] t-flex t-flex-row t-justify-between t-items-center t-text-white t-px-[1rem] "> */}
        {/* <div className="t-h-[32px] t-bg-[#0262AF] t-flex t-flex-row t-justify-between t-items-center t-text-white t-px-[1rem] "> */}
        <div className="t-h-[25px] t-bg-[#0262AF] t-flex t-flex-row t-justify-between t-items-center t-text-white t-px-[1rem] t-text-sm">
          <div>GOVERNMENT OF INDIA</div>
          <div>
            <Select
              color="white"
              variant="unstyled"
              // iconSize="0rem" // Adjust the size of the dropdown arrow icon
              iconColor="white" // Set the color of the dropdown arrow icon
              marginLeft="0.5rem" // Add margin to the left of the dropdown button
              // top="50%"
              // marginTop="2rem"

              onChange={(e) => {
                const selectedLanguage = e.target.value;
                changeLanguage(selectedLanguage);

                // Handle language change logic here
              }}
            >
              <option value="en" className="t-text-black">
                English
              </option>
              <option value="hi" className="t-text-black">
                Hindi
              </option>
            </Select>
          </div>
        </div>
        {/* <div className="t-w-full t-bg-white t-flex t-justify-center">
          <img src={NavbarImgWO} className="t-h-[80px] t-object-contain" />
        </div> */}
        {/* <WithSubnavigation /> */}
        <Navbar />
        <Navbar2 />
      </div>
      {shouldShowSidebar ? (
        // <div className="content t-flex t-flex-row t-pt-[60px] t-pl-[240px]">
        <div className="content t-flex t-flex-row t-pt-[92px] t-pl-[240px]">
          <Sidebar />
          <main className="t-w-full">{children}</main>
        </div>
      ) : (
        <div className="content t-flex t-flex-row t-pt-[92px]">
          {/* <Sidebar /> */}
          <main className="t-w-full">{children}</main>
        </div>
      )}
    </div>
  );
};

export default Layout;
