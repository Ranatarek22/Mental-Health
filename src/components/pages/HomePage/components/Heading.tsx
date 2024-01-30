import React from "react";
type props = {
  heading: string;
  subHeading: string;
};
function Heading({ subHeading, heading }: props) {
  return (
    <div className="flex flex-col text-center">
      <h2 className="text-3xl text-[#4CAF50] font-medium">{subHeading}</h2>
      <h1 className="text-5xl text-[#0B570E] font-bold">{heading}</h1>
    </div>
  );
}

export default Heading;
