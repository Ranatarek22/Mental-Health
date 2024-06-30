import React from "react";

const Tips = ({content}) => {
  return (
    <div
      className="cont4 p-2 m-3 tips-container"
      style={{
        zIndex: "10",
        height: "310px",
        width: "29%",
        position: "fixed",
      }}
    >
      {content}
    </div>
  );
};

export default Tips;
