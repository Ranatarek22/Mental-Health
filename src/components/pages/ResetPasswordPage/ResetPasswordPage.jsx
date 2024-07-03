import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import ResetPasswordForm from "../../forms/reset-password-form";

const ResetPasswordPage = () => {
  return (
    <>
      <Container className="page-container">
        <Row className="h-100 ">
          <Col className="containerform" sm={12} md={12}>
            <div className="rectangle">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="/headache.png" srcSet="/headache.png" />
              </div>
              <div className="group-3">
                <p className="fw-bold" style={{ color: "var(--new-color)" }}>
                  New Password
                </p>
              </div>
              <div className="group-3">
                <h6 className="text-muted px-4 py-2">
                  Set the new password for your account so you can login and
                  access all featuress.
                </h6>
              </div>
              <ResetPasswordForm />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPasswordPage;
