import React from "react";

const Blog = (props) => {
  const points = props.text ? props.text.split("\n") : [];
  return (
    <div className="t-bg-white t-shadow-md t-flex t-rounded-lg t-mx-36 t-my-12">
      <img src={props.img} alt="" className="t-w-72 t-rounded-l-md" />
      <div className="t-pl-8 t-py-16">
        <div
          className="t-text-4xl t-font-semibold"
          style={{ marginTop: "-50px", marginBottom: "30px" }}
        >
          {props.heading}
        </div>
        <div className="t-text-lg">
          {points.map((point, index) => (
            <p key={index}>{point}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
