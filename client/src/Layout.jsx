import React from 'react';
import WithSubnavigation from './CFG components/Navbar';
import Sidebar from './CFG components/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <WithSubnavigation />
      <div className="content t-flex t-flex-row t-pt-[60px] t-pl-[240px]">
        <Sidebar />
        <main className='t-w-full'>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
