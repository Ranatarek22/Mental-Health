import React from "react";
import { apiInstance } from "../../axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { date, object, string } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const signupschema = object().shape({
    firstName: string("The email must be a string").required(),
    lastName: string("The email must be a string").required(),
    email: string("The email must be a string").required().email(),
    birthDate: date().required(),
    gender: string().required(),
    password: string().required().min(8).max(100),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthDate: "",
      gender: "",
    },
    validationSchema: signupschema,
    onSubmit: async (values) => {
      //   alert(JSON.stringify(values));
      const cancelToken = axios.CancelToken.source();
      try {
        const tokenPromise = await apiInstance.post(`/auth/register`, values, {
          cancelToken: cancelToken.token,
        });
        // console.log(tokenPromise)
        if (tokenPromise.status !== 201) {
          if (tokenPromise.response.data) {
            throw new Error(Object.values(tokenPromise.response.data)[0]);
          } else {
            throw new Error(tokenPromise.statusText);
          }
        }
        const user_token = tokenPromise.data;

        localStorage.setItem("mental_auth", JSON.stringify(user_token));
        navigate("/login");
        window.location.reload();
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error("cancelled");
        } else {
          console.error("Error details:", error);
          if (typeof error === "object") {
            toast.error(Object.values(error.response.data));
          } else {
            toast.error(String(error));
          }
        }
      }

      return () => {
        cancelToken.cancel("cancelled by user");
      };
    },
  });

  const isSubmiting = formik.isSubmitting;

  return (
    <Form onSubmit={formik.handleSubmit} className="signform">
      <Form.Group className="mb-3 inputfield" controlId="firstName">
        <Form.Label>Enter your first name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          placeholder="Enter first name"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          onBlur={formik.handleBlur}
        />
        {formik.touched["firstName"] && Boolean(formik.errors["firstName"]) && (
          <p className="error">{formik.errors["firstName"]}</p>
        )}
      </Form.Group>
      <Form.Group className="mb-3 inputfield" controlId="lastName">
        <Form.Label>Enter your last name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          placeholder="Enter first name"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          onBlur={formik.handleBlur}
        />
        {formik.touched["lastName"] && Boolean(formik.errors["lastName"]) && (
          <p className="error">{formik.errors["lastName"]}</p>
        )}
      </Form.Group>
      <Form.Group className="mb-3 inputfield" controlId="email">
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
      <Form.Group className="mb-3 inputfield" controlId="password">
        <Form.Label>Enter your password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        {formik.touched["password"] && Boolean(formik.errors["password"]) && (
          <p className="error">{formik.errors["password"]}</p>
        )}
      </Form.Group>
      <Form.Group className="mb-3 inputfield" controlId="birthDate">
        <Form.Label>Enter your birth date</Form.Label>
        <Form.Control
          name="birthDate"
          type="date"
          placeholder="Date"
          onChange={formik.handleChange}
          value={formik.values.birthDate}
          onBlur={formik.handleBlur}
        />
        {formik.touched["birthDate"] && Boolean(formik.errors["birthDate"]) && (
          <p className="error">{formik.errors["birthDate"]}</p>
        )}
      </Form.Group>
      <Form.Group className="mb-3 inputfield" controlId="gender">
        <Form.Label>Gender</Form.Label>
        <br />
        <Form.Check
          type="radio"
          label="Female"
          name="gender"
          id="female"
          value="Female"
          checked={formik.values.gender === "Female"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          inline
        />
        <Form.Check
          type="radio"
          label="Male"
          name="gender"
          id="male"
          value="Male"
          checked={formik.values.gender === "Male"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          inline
        />
        {formik.touched["gender"] && Boolean(formik.errors["gender"]) && (
          <p>{formik.errors["gender"]}</p>
        )}
      </Form.Group>

      <Button
        className="BTN"
        style={{ backgroundColor: "#4caf50", borderColor: "#4caf50" }}
        type="submit"
        disabled={isSubmiting}
      >
        Sign up
      </Button>
    </Form>
  );
};

export default SignUpForm;
