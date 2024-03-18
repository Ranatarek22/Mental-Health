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

const ForgetPasswordForm = () => {
  const navigate = useNavigate();
  const forgetPasswordSchema = object().shape({
    email: string("The email must be a string").required().email(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values) => {
      const cancelToken = axios.CancelToken.source();
      try {
        const searchParams = new URLSearchParams();

        searchParams.append("email", values.email);
        const forgetPasswordPromise = await apiInstance.post(
          `/auth/send-reset-password-link?${searchParams.toString()}`,
          // values,
          {
            cancelToken: cancelToken.token,
          }
        );
        if (forgetPasswordPromise.status !== (200 || 204)) {
          if (forgetPasswordPromise.response.data) {
            throw new Error(
              Object.values(forgetPasswordPromise.response.data)[0]
            );
          } else {
            throw new Error(forgetPasswordPromise.statusText);
          }
        }
        // navigate("/forgetpassword/resetpassword");

        toast.success(forgetPasswordPromise.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error("cancelled");
        } else {
          if (typeof error === "object") {
            toast.error(Object.values(error.response.data.errors[0])[1]);
          } else {
            console.error(error);
          }
        }
      }
    },
  });

  const isSubmitting = formik.isSubmitting;

  return (
    <Form onSubmit={formik.handleSubmit} className="signform px-4 py-2">
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

      <Button
        className="px-3 py-2"
        style={{
          backgroundColor: "#01579B",
          borderColor: "#01579B",
          alignSelf: "center",
          width: "100%",
        }}
        type="submit"
        disabled={isSubmitting}
      >
        Continue
      </Button>
    </Form>
  );
};

export default ForgetPasswordForm;
