import React from "react";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="text-gray-700">
      <section className="container mx-auto p-4 flex justify-between items-center overflow-hidden">
        <Logo />
        <ul className="hidden md:flex gap-4 items-center justify-center ">
          <a href={"#About"}>
            <li className="hover:text-gray-700 transition-all md:text-xl">
              About
            </li>
          </a>
          <a href={"#Services"}>
            <li className="hover:text-gray-700 transition-all md:text-xl">
              Services
            </li>
          </a>
          <a href={"#Doctors"}>
            <li className="hover:text-gray-700 transition-all md:text-xl">
              Doctors
            </li>
          </a>
          <a href={"#Articles"}>
            <li className="hover:text-gray-700 transition-all md:text-xl">
              Articles
            </li>
          </a>
        </ul>
        <div className="hidden md:flex gap-4">
          <a href={"/login"}>
            <button className="border-2 border-[#e4ffe5] text-black font-medium px-4 py-2 rounded-full shadow-lg transition-all hover:scale-105 hover:bg-[#b8ddb9]">
              Login
            </button>
          </a>
          <a href={"/signup"}>
            <button className="bg-[#1d491f] text-white font-medium px-4 py-2 rounded-full shadow-lg transition-all hover:scale-105 hover:bg-[#143116]">
              Get Start
            </button>
          </a>
        </div>
        {/* <NavBar /> */}
      </section>
    </header>
  );
};
export default Header;
