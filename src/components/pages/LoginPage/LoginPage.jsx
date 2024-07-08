import React from "react";
import AuthBackground from "../../UI/AuthBackground";
import LoginBox from "./LoginBox";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();
  return (
    <>
      <Container className="page-container">
        <Row className="h-100 p-3">
          <Col className="hide" sm={12} md={6}>
            <AuthBackground imgUrl={`/Login.png`} />
          </Col>
          <Col className="containerform" sm={12} md={6}>
            <LoginBox key={location.search} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
