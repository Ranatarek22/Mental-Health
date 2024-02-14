import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { apiInstance } from "../../axios";
import toast from "react-hot-toast";
import { object, string } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/use-auth-store";

const LoginForm = () => {
  const navigate = useNavigate();
  const updateActiveUser = useAuthStore((state) => state.updateActiveUser);
  const signupschema = object().shape({
    email: string("The email must be a string").required().email(),
    password: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signupschema,
    onSubmit: async (values) => {
      //   alert(JSON.stringify(values));
      const cancelToken = axios.CancelToken.source();
      try {
        const tokenPromise = await apiInstance.post(`/auth/signin`, values, {
          cancelToken: cancelToken.token,
        });
        // console.log(tokenPromise)
        if (tokenPromise.status !== 200) {
          if (tokenPromise.response.data) {
            throw new Error(Object.values(tokenPromise.response.data)[0]);
          } else {
            throw new Error(tokenPromise.statusText);
          }
        }
        const user_token = tokenPromise.data;

        localStorage.setItem("mental_auth", JSON.stringify(user_token));
        updateActiveUser(user_token);
        toast.success("Successfully logged");
        navigate("/createforum");
        // window.location.reload();
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error("cancelled");
        } else {
          // console.error("Error details:", error);
          if (typeof error === "object") {
            toast.error(Object.values(error.response.data.errors[0])[1]);
          } else {
            // toast.error(String(error));
            console.error(error);
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
      <Button
        className="BTN"
        style={{ backgroundColor: "#4caf50", borderColor: "#4caf50" }}
        type="submit"
        disabled={isSubmiting}
      >
        Sign in
      </Button>
    </Form>
  );
};

export default LoginForm;
