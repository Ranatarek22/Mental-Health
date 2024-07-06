import React, { useState } from "react";
import { apiInstance } from "../../axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { date, object, string } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/use-auth-store";
import moment from "moment";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpForm = () => {
  const navigate = useNavigate();
  const updateActiveUser = useAuthStore((state) => state.updateActiveUser);
  const [showPassword, setShowPassword] = useState(false);

  const signupschema = object().shape({
    firstName: string("The email must be a string").required(
      "First name is required"
    ),
    lastName: string("The email must be a string").required(
      "Last name is required"
    ),
    email: string("The email must be a string")
      .required("Email is required")
      .email("Invalid email format"),
    birthDate: date()
      .required("Birth date is required")
      .test(
        "is-date-not-in-future",
        "Birth date shouldn't be in the future",
        (value) => moment(value).isBefore(moment(), "day")
      ),
    gender: string().required("Gender is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters")
      .matches(/(?=.*[0-9])/, "Password must contain at least one number")
      .matches(
        /(?=.*[!@#$%^&*])/,
        "Password must contain at least one special character"
      )
      .matches(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthDate: "",
      gender: "",
      role: "User",
    },
    validationSchema: signupschema,
    onSubmit: async (values) => {
      const cancelToken = axios.CancelToken.source();
      try {
        const tokenPromise = await apiInstance.post(`/auth/register`, values, {
          cancelToken: cancelToken.token,
        });

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
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error("cancelled");
        } else {
          console.error("Error details:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            toast.error(Object.values(error.response.data.errors)[0][1]);
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

  const isSubmitting = formik.isSubmitting;

  return (
    <Form onSubmit={formik.handleSubmit} className="signform">
      <div className="name-group">
        <Form.Group className="mb-3 inputfield" controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter first name"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
          />
          {formik.touched["firstName"] &&
            Boolean(formik.errors["firstName"]) && (
              <p className="error">{formik.errors["firstName"]}</p>
            )}
        </Form.Group>
        <Form.Group className="mb-3 inputfield" controlId="lastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter last name"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
          />
          {formik.touched["lastName"] && Boolean(formik.errors["lastName"]) && (
            <p className="error">{formik.errors["lastName"]}</p>
          )}
        </Form.Group>
      </div>
      <Form.Group className="mb-3 inputfield" controlId="email">
        <Form.Label>Email</Form.Label>
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
        <Form.Label>Password</Form.Label>
        <div style={{ position: "relative" }}>
          <Form.Control
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {formik.touched["password"] && Boolean(formik.errors["password"]) && (
          <p className="error">{formik.errors["password"]}</p>
        )}
        <p className="text-muted">
          Password must contain at least one special character, one number, and
          one capital letter.
        </p>
      </Form.Group>
      <Form.Group className="mb-3 inputfield" controlId="birthDate">
        <Form.Label>Birth date</Form.Label>
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
          value="female"
          checked={formik.values.gender === "female"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          inline
        />
        <Form.Check
          type="radio"
          label="Male"
          name="gender"
          id="male"
          value="male"
          checked={formik.values.gender === "male"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          inline
        />
        {formik.touched["gender"] && Boolean(formik.errors["gender"]) && (
          <p className="error">{formik.errors["gender"]}</p>
        )}
      </Form.Group>

      <Button
        className="BTN"
        style={{ backgroundColor: "#4caf50", borderColor: "#4caf50" }}
        type="submit"
        disabled={isSubmitting}
      >
        Sign up
      </Button>
    </Form>
  );
};

export default SignUpForm;
