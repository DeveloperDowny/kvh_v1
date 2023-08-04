import React, { useContext, useRef, useState, useEffect } from 'react'
import APIRequests from '../api';
import { MenuContext } from 'react-flexible-sliding-menu';
import { Button } from '@chakra-ui/react';
import "./Home.css"

import MenuProvider from "react-flexible-sliding-menu"
import ReportComponent from "./Report";

const Home = () => {
  const [open, setOpen] = useState(true);

  const closeSideBar = () => {
    setOpen(false);
  }

  return (
    // <MenuProvider MenuComponent = {ReportComponent} animation = "slide" direction = "right">
    //   <InsideHome />
    // </MenuProvider>
    <div className="home">
      <ReportComponent open={open} close={closeSideBar} address={"0x28c6c06298d514db089934071355e5743bf21d60"}/>
      <Button onClick={() => setOpen(!open)} colorScheme="blue">Test</Button>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam consequatur quidem laboriosam cum debitis odio, quas, eveniet consectetur illum ullam nesciunt tempora cupiditate obcaecati! Molestiae iste iusto architecto totam a?
    </div>
  );
}

export default Home

// const InsideHome = () => {

//   const  {toggleMenu, setMenuProps}  = useContext(MenuContext);

//   const handleClick = () => {
//     setMenuProps({
//       address: "0x1234567890abcdef"
//     });
//     toggleMenu();
//   }

//   return (
//     <div>
//       <h2>Inside Home</h2>
//       <Button onClick={handleClick} colorScheme="blue">Test</Button>
//     </div>
//   )
// }