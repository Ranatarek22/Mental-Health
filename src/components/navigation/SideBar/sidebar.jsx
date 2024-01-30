import React from "react";
import { Button, Container, Col } from "react-bootstrap";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BsFillPencilFill,
  BsFillHouseDoorFill,
  BsCalculator,
} from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { useRef, useState, useEffect } from "react";
const Sidebar = () => {
  const { removeActiveUser, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const logOutHandler = () => {
    removeActiveUser();
    toast.success("Log out successfully");
    navigate("/");
    // window.location.reload();
  };

  return (
    <div className=" container-sidebar">
      <div className=" flex-nowrap">
        <div className=" sidebar">
          <div className="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100">
            <div className="user">
              <div className="dropdown pb-3">
                <a
                  href="#"
                  className="d-flex align-items-center text-black text-decoration-none  pt-3 px-3 m-2"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="/user.png"
                    alt="hugenerd"
                    className="rounded-circle me-2 mt-2 user-img"
                    srcSet="/user.png"
                  />
                  <div>
                    <span className=" pt-3 user-name">
                      Rana Tarek
                      <BsFillPencilFill className="ms-2 pr-3 dropdown-toggle" />
                    </span>
                    <span className=" text-muted user-email">
                      RanaTarek@yahoo.com
                    </span>
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark custom-dropdown-menu text-small shadow">
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="links">
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="nav-item d-flex align-items-center w-100">
                  <a href="#" className="nav-link align-middle px-0 m-2">
                    <BsFillHouseDoorFill className="fs-4 mx-3 me-1 text-black" />{" "}
                    <span className=" ms-2  text-black user-link">Home</span>
                  </a>
                </li>

                <li className="nav-item d-flex align-items-center w-100">
                  <a href="#" className="nav-link px-0 align-middle m-2 w-100">
                    {" "}
                    <BsCalculator className="fs-4 mx-3 me-1 text-black" />{" "}
                    <span className="ms-1text-black text-black user-link">
                      Depression Test
                    </span>
                  </a>
                </li>
                <li className="nav-item d-flex align-items-center w-100">
                  <a href="#" className="nav-link px-0 align-middle m-2 ">
                    <BsFillHouseDoorFill className="fs-4 mx-3 me-1 text-black " />{" "}
                    <span className="ms-1  text-black user-link">Forums</span>{" "}
                  </a>
                </li>
              </ul>
            </div>

            {!isAuthenticated ? (
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
                  <HiOutlineLogout className="fs-4 mx-3 me-1 text-white" />
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
    </div>
  );
};

export default Sidebar;
