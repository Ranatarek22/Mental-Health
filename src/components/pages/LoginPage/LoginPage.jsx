import React from "react";
import AuthBackground from "../../UI/AuthBackground";
import { Box } from "./LoginBox";
import { Col, Container, Row } from "react-bootstrap";
const LoginPage = () => {
  return (
    <>
      <Container className="page-container">
        <Row className="h-100 p-3">
          <Col className="hide" sm={12} md={6}>
            <AuthBackground imgUrl={`/Login.png`} />
          </Col>
          <Col className="containerform" sm={12} md={6}>
            <Box />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
