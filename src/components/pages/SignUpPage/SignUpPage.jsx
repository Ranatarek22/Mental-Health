import React from "react";
import AuthBackground from "../../UI/AuthBackground";
import { SignUpBox } from "./SignUpBox";
import { Col, Container, Row } from "react-bootstrap";
const SignUpPage = () => {
  return (
    <>
      <Container className="page-container">
        <Row className="h-100 p-3">
          <Col className="hide" sm={12} md={6}>
            <AuthBackground imgUrl={`/Register.png`} />
          </Col>
          <Col className="containerform" sm={12} md={6}>
            <SignUpBox />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUpPage;
