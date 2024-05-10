import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaSignsPost, FaBell, FaRegHandPointRight } from "react-icons/fa6";
import {
  BsFillPencilFill,
  BsFillHouseDoorFill,
  BsCalculator,
} from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { useRef, useState, useEffect } from "react";

const NavUser = () => {
  const { removeActiveUser, isAuthenticated, userName, email, photoUrl } =
    useAuthStore();
  const navigate = useNavigate();

  const logOutHandler = () => {
    removeActiveUser();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <Navbar className="p-2 " id="navbar" expand="md">
      <>
        <div className="d-flex align-items-center justify-content-start flex-row-reverse w-100">
          <div className="">
            <FaBell
              className=" pr-3 dropdown-toggle"
              style={{ fontSize: "1.8rem" }}
            />
          </div>
          {/* <div className="dropdown pb-3">
            <a
              href="#"
              className="d-flex align-items-center text-black text-decoration-none "
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                // src={photoUrl ? photoUrl : "/user.png"}
                alt="user profile"
                className="rounded-circle me-2 mt-2 user-img"
                // srcSet={photoUrl ? photoUrl : "/user.png"}
                style={{ width: "60px", height: "60px" }}
              />
              <div className="">
                <FaBell
                  className="ms-2 pr-3 dropdown-toggle"
                  style={{ fontSize: "1.8rem" }} // Adjust the size here
                />
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark custom-dropdown-menu text-small shadow">
              <li>
                <a className="dropdown-item" href="/profile">
                  Profile Settings
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={logOutHandler}>
                  Sign out
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </>
    </Navbar>
  );
};

export default NavUser;
