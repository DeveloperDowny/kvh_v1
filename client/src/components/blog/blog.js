import React from "react";

const Blog = (props) => {
  return (
    <div className="bg-white shadow-md flex rounded-lg mx-36 my-12">
      <img src={props.img} alt="" className="w-72 rounded-l-md" />
      <div className="pl-8 py-16">
        <div className="text-4xl font-semibold">{props.heading}</div>
        <div className="text-lg">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos pariatur
          nam eaque eveniet similique, illum deserunt veritatis temporibus,
          dicta sapiente impedit ea, voluptate voluptatum dolorum odio assumenda
          sunt officiis. Architecto?
        </div>
      </div>
    </div>
  );
};

export default Blog;
