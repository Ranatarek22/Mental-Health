import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AppHeader = () => {
  const { removeActiveUser, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const logOutHandler = () => {
    removeActiveUser();
    toast.success("Log out successfully");
    navigate("/");
  };

  return (
    <Navbar className="w-100 mt-2" id="home" expand="md">
      <Container>
        <Navbar.Brand href="/">
          <h1 className="logo">MENTAL</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#services">Services</Nav.Link>
            <Nav.Link href="/#doctors">Doctors</Nav.Link>
            <Nav.Link href="/#articles">Articles</Nav.Link>
            <Nav.Link href="/#contact">Contact</Nav.Link>

            {isAuthenticated && <Nav.Link href="/profile">Profile</Nav.Link>}
          </Nav>
          {isAuthenticated ? (
            <Button type="button" onClick={logOutHandler}>
              Log out
            </Button>
          ) : (
            <Button type="button" onClick={() => navigate("/login")}>
              Log in
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
