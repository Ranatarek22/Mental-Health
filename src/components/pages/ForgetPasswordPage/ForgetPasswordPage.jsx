import React from "react";
import ForgetPasswordForm from "../../forms/forget-password-form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";

const ForgetPasswordPage = () => {
  return (
    <>
      <Container className="page-container">
        <Row className="h-100 ">
          <Col className="containerform" sm={12} md={12}>
            <div className="rectangle m-2">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="/headache.png" srcSet="/headache.png" />
              </div>
              <div className="group-3">
                <p className="fw-bold" style={{ color: "var(--new-color)" }}>
                  Forgot Your Password?
                </p>
              </div>
              <div className="group-3">
                <h6 className="text-muted px-4 py-2">
                  Don’t worry our team will help you to Login again
                </h6>
              </div>
              <ForgetPasswordForm />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgetPasswordPage;
