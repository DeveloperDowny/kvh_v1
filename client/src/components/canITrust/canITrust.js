import React from "react";
import { Input } from "@chakra-ui/react";

const Trust = () => {
  return (
    <div className="t-bg-white t-shadow-md t-flex t-rounded-lg t-mx-36 t-my-20">
      <div style={{ flex: 1, marginLeft: "30px", marginTop: "10px" }}>
        <h4>Can I trust?</h4>
      </div>
      <Input
        placeholder="Enter the value"
        style={{
          width: "75%",
          marginRight: "20px",
          marginBottom: "10px",
          marginTop: "3px",
        }}
      />
    </div>
  );
};
export default Trust;
