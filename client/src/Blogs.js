import React from "react";
import Blog from "./components/blog/blog.js";
import blog3 from "./assets/blog3.png";
import blog2 from "./assets/blog2.jpg";
import blog1 from "./assets/blog1.jpg";
// import AddBlog from "../components/AddBlog";
const Blogs = () => {
  return (
    <div className='bg-[url("assets/blobBg.svg")] bg-no-repeat bg-cover min-h-screen h-full'>
      <div className="p-10 bg-[#2b343b] text-white text-5xl pl-16 font-bold">
        Blogs
      </div>
      <div className="">
        <Blog img={blog3} heading="Blog1" />
        <Blog img={blog2} heading="Blog2" />
        {/* <AddBlog/> */}
      </div>
    </div>
  );
};

export default Blogs;
