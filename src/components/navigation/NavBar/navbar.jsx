import React from "react";
import { Button, Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AppHeader = () => {
  const { removeActiveUser, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const image = useAuthStore((state) => state.photoUrl);
  const userName = useAuthStore((state) => state.userName);

  const logOutHandler = () => {
    removeActiveUser();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const profileHandler = () => {
    navigate("/profile");
  };

  return (
    <Navbar className="w-100" id="home" expand="md">
      <Container className="navbar-custom">
        <img
          src={"/nexus.png"}
          alt="logo"
          style={{ width: "200px", marginTop: "1%" }}
        />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="nav-links">
          <Nav
            className="me-auto"
            style={{
              fontSize: "1.2rem",
            }}
          >
            <Nav.Link href="/#services" className="nav-link">
              Services
            </Nav.Link>
            <Nav.Link href="/#depressiontest" className="nav-link">
              Depression Test
            </Nav.Link>
            <Nav.Link href="/#doctors" className="nav-link">
              Doctors
            </Nav.Link>
            <Nav.Link href="/#articles" className="nav-link">
              Articles
            </Nav.Link>
          </Nav>
          {isAuthenticated ? (
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                id="dropdown-user"
                className="p-0 custom-dropdown-toggle"
                style={{ border: "none", boxShadow: "none" }}
              >
                <img
                  src={image ? image : "/user.png"}
                  alt="user profile"
                  className="rounded-circle p-2 ml-2 m-2 mt-4 user-img"
                  style={{ width: "60px", height: "60px" }}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.ItemText>
                  <div className="text-center">
                    <img
                      src={image ? image : "/user.png"}
                      alt="user profile"
                      className="rounded-circle"
                      style={{ width: "60px", height: "60px" }}
                    />
                    <p>{userName}</p>
                  </div>
                </Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item onClick={profileHandler}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={logOutHandler}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              className="login-button"
              type="button"
              onClick={() => navigate("/login")}
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "20px",
                color: "grey",
              }}
            >
              Log in
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
