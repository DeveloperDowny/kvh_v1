import React from "react";
import WithSubnavigation from "./CFG components/Navbar";
import Sidebar from "./CFG components/Sidebar";
import { useSelector } from "react-redux";
import { NavbarImg, NavbarImgWO } from "./assets";

const Layout = ({ children }) => {
  const shouldShowSidebar = useSelector(
    (state) => state.siteCustom.shouldShowSideBar
  );

  console.log("shouldShowSidebar", shouldShowSidebar);
  return (
    <div className="layout">
      <div className="t-h-[42px] t-bg-[#0262AF]"></div>
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
