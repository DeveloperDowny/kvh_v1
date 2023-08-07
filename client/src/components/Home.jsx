  import React, { useContext, useRef, useState, useEffect } from 'react'
import APIRequests from '../api';
import { Button } from '@chakra-ui/react';
import "./Home.css"

import ReportComponent from "./Report";

const Home = () => {
  const [open, setOpen] = useState(true);

  const closeSideBar = () => {
    setOpen(false);
  }

  return (
    <div className="home">
      <ReportComponent open={open} close={closeSideBar} address={"TRpn2AWwXLfYSVtRaxKGm5oMCPvrRyvBJv"}/>
      <Button onClick={() => setOpen(!open)} colorScheme="blue">Test</Button>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam consequatur quidem laboriosam cum debitis odio, quas, eveniet consectetur illum ullam nesciunt tempora cupiditate obcaecati! Molestiae iste iusto architecto totam a?
    </div>
  );
}

export default Home
