"use client";
import React from "react";
import { useState } from "react";

function NavBar() {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <React.Fragment>
      <button onClick={() => setToggle(true)}>toggle</button>
      <div
        className={`w-full h-screen bg-gray-100 text-black p-10 flex justify-between flex-col  absolute top-0 ${
          toggle ? "right-0 " : "right-[-100%] "
        }transition-all z-10`}
      >
        <div
          role="button"
          onClick={() => setToggle(false)}
          className="absolute top-10 right-10 w-fit bg-slate-300"
        >
          X
        </div>
        <div className="">sd</div>
        <div className="">sad</div>
        <div className="">asd</div>
      </div>
    </React.Fragment>
  );
}

export default NavBar;
