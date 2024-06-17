import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaBell, FaPlus } from "react-icons/fa6";
import UserProfile from "./userprofile";
import { NotificationsProvider } from "../../../context/NotificationsContext";
import NotificationIcon from "../../pages/notifications/NotificationIcon";

const NavUser = () => {
  const {
    removeActiveUser,
    isAuthenticated,
    userName,
    email,
    photoUrl,
    token,
  } = useAuthStore();
  const navigate = useNavigate();
  const image = useAuthStore((state) => state.photoUrl);
  const [showProfileCard, setShowProfileCard] = useState(false);

  const logOutHandler = () => {
    removeActiveUser();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowProfileCard(!showProfileCard);
  };

  const handleCreatePost = () => {
    navigate("/createforum");
  };

  return (
    <>
      <Navbar className="p-2" id="navbar" expand="md">
        <div className="d-flex align-items-center justify-content-between w-100 position-relative">
          <div style={{ width: "30%" }}>
            <input
              type="text"
              className="p-2 pe-3 m-2 cont4"
              placeholder="Search for forum"
              style={{ backgroundColor: "#e0dede" }}
            />
          </div>
          <div className="ml-auto p-2 d-flex align-items-center">
            <FaPlus
              className="pr-2"
              style={{ fontSize: "1.8rem", cursor: "pointer", color: "grey" }}
              onClick={handleCreatePost}
            />
            <Button
              variant="link"
              className="ml-2  m-2 text-decoration-none "
              onClick={handleCreatePost}
              style={{
                padding: 0,
                border: "none",
                background: "none",
                color: "grey",
              }}
            >
              Create
            </Button>
            <NotificationsProvider token={token}>
              <NotificationIcon />
            </NotificationsProvider>
            <img
              src={image ? image : "/user.png"}
              alt="user profile"
              className="rounded-circle p-2 ml-2 m-2 mt-2 user-img"
              srcSet={image ? image : "/user.png"}
              onClick={handleProfileClick}
            />
          </div>
        </div>
      </Navbar>

      {/* Profile Card */}
      {showProfileCard && (
        <div className="user-card ">
          <img
            src={image ? image : "/user.png"}
            alt="user profile"
            className="rounded-circle mb-2"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
          <p className="mb-2">{userName}</p>
          <Button variant="danger" onClick={logOutHandler}>
            Sign Out
          </Button>
        </div>
      )}
    </>
  );
};

export default NavUser;
