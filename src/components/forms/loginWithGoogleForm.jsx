import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";

const LoginWithGoogleForm = () => {
  const navigate = useNavigate();

  const signupSchema = object().shape({
    email: string("The email must be a string").required().email(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      
      console.log("Form values:", values);
      navigate("/"); 
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="signup-form">
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Enter your email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.touched["email"] && Boolean(formik.errors["email"]) && (
          <p className="error">{formik.errors["email"]}</p>
        )}
      </Form.Group>
      <Button
        type="submit"
        style={{ backgroundColor: "#4caf50", borderColor: "#4caf50" }}
      >
        Sign up
      </Button>
    </Form>
  );
};

export default LoginWithGoogleForm;