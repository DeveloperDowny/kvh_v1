import React from "react";
import WithSubnavigation from "./CFG components/Navbar";
import Sidebar from "./CFG components/Sidebar";
import { useSelector } from "react-redux";
import { NavbarImg, NavbarImgWO } from "./assets";
import { Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

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
      <div className="t-h-[42px] t-bg-[#0262AF] t-flex t-flex-row t-justify-between t-items-center t-text-white t-px-[1rem]">
        <div>GOVERNMENT OF INDIA</div>
        <div>
          <Select
            color="black"
            variant="unstyled"
            iconSize="0rem" // Adjust the size of the dropdown arrow icon
            iconColor="white" // Set the color of the dropdown arrow icon
            marginLeft="0.5rem" // Add margin to the left of the dropdown button
            // marginTop="2rem"
            onChange={(e) => {
              const selectedLanguage = e.target.value;
              changeLanguage(selectedLanguage);

              // Handle language change logic here
            }}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </Select>
        </div>
      </div>
      <img src={NavbarImgWO} />
      <WithSubnavigation />
      {shouldShowSidebar ? (
        <div className="content t-flex t-flex-row t-pt-[60px] t-pl-[240px]">
          <Sidebar />
          <main className="t-w-full">{children}</main>
        </div>
      ) : (
        <div className="content t-flex t-flex-row t-pt-[60px]">
          {/* <Sidebar /> */}
          <main className="t-w-full">{children}</main>
        </div>
      )}
    </div>
  );
};

export default Layout;
