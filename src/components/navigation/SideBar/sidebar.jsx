import React from "react";
import { Button } from "react-bootstrap";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Sidebar = () => {
  const { removeActiveUser, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const logOutHandler = () => {
    removeActiveUser();
    toast.success("Log out successfully");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav>
      Sidebar
      {isAuthenticated ? (
        <Button type="button" onClick={logOutHandler}>
          Log out
        </Button>
      ) : (
        <Button type="button" onClick={() => navigate("/login")}>
          Log in
        </Button>
      )}
    </nav>
  );
};

export default Sidebar;
