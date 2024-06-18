import React from "react";
import { Button, Container, Col } from "react-bootstrap";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaSignsPost,
  FaBell,
  FaRegHandPointRight,
  FaFileSignature,
} from "react-icons/fa6";

import {
  BsFillPencilFill,
  BsFillHouseDoorFill,
  BsCalculator,
} from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { useRef, useState, useEffect } from "react";
import { Postage } from "react-bootstrap-icons";
const Sidebar = () => {
  const { removeActiveUser, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const userName = useAuthStore((state) => state.userName);
  const email = useAuthStore((state) => state.email);
  const image = useAuthStore((state) => state.photoUrl);
  // console.log(email);

  const logOutHandler = () => {
    removeActiveUser();
    toast.success("Log out successfully");
    navigate("/");
    // window.location.reload();
  };

  return (
    <div className=" container-sidebar">
      <div className=" sidebar">
        <div className="d-flex flex-column align-items-center  text-white min-vh-100 ">
          <div className="user p-2">
            <img src="/logo.png" srcSet="/logo.png" />
          </div>
          <div className="logo p-2">
            <img src="/logo1.png" srcSet="/logo1.png" />
          </div>
          <div className="links  pe-2">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item  align-items-center w-100">
                <a href="/" className="nav-link align-middle px-0 m-2">
                  <BsFillHouseDoorFill className="fs-4 mx-3 me-1 text-black" />
                  <span
                    className=" ms-2  text-black user-link"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </span>
                </a>
              </li>

              <li className="nav-item  align-items-center w-100">
                <a
                  href="/depressiontest"
                  className="nav-link px-0 align-middle m-2 w-100"
                >
                  <FaRegHandPointRight className="fs-4 mx-3 me-1 text-black" />
                  <span className="ms-1text-black text-black user-link">
                    Depression Test
                  </span>
                </a>
              </li>
              <li className="nav-item align-items-center w-100">
                <a
                  href="/forums/forumlist"
                  className="nav-link px-0 align-middle m-2 "
                >
                  <FaSignsPost className="fs-4 mx-3 me-1 text-black " />
                  <span
                    className="ms-1  text-black user-link"
                    onClick={() => navigate("/forums/forumlist")}
                  >
                    Forums
                  </span>{" "}
                </a>
              </li>
              <li className="nav-item align-items-center w-100">
                <a href="/myposts" className="nav-link px-0 align-middle m-2 ">
                  <FaFileSignature className="fs-4 mx-3 me-1 text-black " />
                  <span
                    className="ms-1  text-black user-link"
                    onClick={() => navigate("/myposts")}
                  >
                    My posts
                  </span>{" "}
                </a>
              </li>
              <li className="nav-item align-items-center w-100">
                <a href="/doctors" className="nav-link px-0 align-middle m-2 ">
                  <FaFileSignature className="fs-4 mx-3 me-1 text-black " />{" "}
                  <span
                    className="ms-1  text-black user-link"
                    onClick={() => navigate("/doctors")}
                  >
                    Doctors
                  </span>{" "}
                </a>
              </li>
              <li className="nav-item align-items-center w-100">
                <a
                  href="/weeklyschedule"
                  className="nav-link px-0 align-middle m-2 "
                >
                  <FaFileSignature className="fs-4 mx-3 me-1 text-black " />{" "}
                  <span
                    className="ms-1  text-black user-link"
                    onClick={() => navigate("/weeklyschedule")}
                  >
                    Weekly Schedule
                  </span>{" "}
                </a>
              </li>
              <li className="nav-item align-items-center w-100">
                <a
                  href="/appointments"
                  className="nav-link px-0 align-middle m-2 "
                >
                  <FaFileSignature className="fs-4 mx-3 me-1 text-black " />{" "}
                  <span
                    className="ms-1  text-black user-link"
                    onClick={() => navigate("/appointments")}
                  >
                    Appointment
                  </span>{" "}
                </a>
              </li>
            </ul>
          </div>

          {isAuthenticated ? (
            <div className="mt-auto  p-3 logout d-flex align-items-center justify-content-center ">
              <Button
                className="ms-2 text-white user-link "
                onClick={logOutHandler}
                style={{
                  backgroundColor: "black",
                  borderColor: "black",
                  width: "98%",
                }}
              >
                <HiOutlineLogout className="fs-4 text-white" />
                <span className="user-link ">Log Out</span>
              </Button>
            </div>
          ) : (
            <Button type="button" onClick={() => navigate("/login")}>
              Log in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
