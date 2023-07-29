import React from 'react'
import APIRequests from '../api';

const Home = () => {
  return (
    <div onClick={async () => {
      

      const res = await APIRequests.testGet().catch(err => console.log("Error in testGet: ", err));
      if (!res) return;
      console.log(res);
    }}
    className='t-cursor-pointer t-bg-blue-500 t-text-white t-p-4'
    >
      Hello From Home
    </div>
  )
}

export default Home
