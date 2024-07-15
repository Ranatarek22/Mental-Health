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

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const forgetPasswordSchema = object().shape({
    password: string().required().min(8).max(100),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values) => {
      const cancelToken = axios.CancelToken.source();
      try {
        function getQueryParameter(name) {
          const urlParams = new URLSearchParams(window.location.search);
          return urlParams.get(name);
        }

        const encodedEmail = getQueryParameter("email");
        const endcodedToken = getQueryParameter("token");
        const email = decodeURIComponent(encodedEmail);
        const token = decodeURIComponent(endcodedToken);

        const searchParams = new URLSearchParams();

        searchParams.append("password", values.password);
        const resetPasswordPromise = await apiInstance.post(
          `/auth/reset-password`,
          {
            email: email,
            token: token,
            newPassword: values.password,
          },
          {
            cancelToken: cancelToken.token,
          }
        );
        if (resetPasswordPromise.status !== (200 || 204)) {
          if (resetPasswordPromise.response.data) {
            throw new Error(
              Object.values(resetPasswordPromise.response.data)[0]
            );
          } else {
            throw new Error(resetPasswordPromise.statusText);
          }
        }

        toast.success(resetPasswordPromise.data);
        navigate("/login");
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
      <Form.Group className="mb-3 inputfield" controlId="password">
        <Form.Label>Enter your new password</Form.Label>
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
        className="px-3 py-2"
        style={{
          backgroundColor: "var(--new-color)",
          borderColor: "var(--new-color)",
          alignSelf: "center",
          width: "100%",
        }}
        type="submit"
        disabled={isSubmitting}
      >
        Update Password
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Reset Password</title>
// </head>
// <body>
//     <h1>Reset Password</h1>
//     <form id="resetPasswordForm">
//         <label for="newPassword">New Password:</label>
//         <input type="password" id="newPassword" name="newPassword" required>
//         <button type="submit">Reset Password</button>
//     </form>

//     <script>
//         // Function to extract query parameters from the URL
//         function getQueryParameter(name) {
//             const urlParams = new URLSearchParams(window.location.search);
//             return urlParams.get(name);
//         }

//         // Extract email and token from the URL
//         const encodedEmail = getQueryParameter('email');
//         const endcodedToken = getQueryParameter('token');
//         const email = decodeURIComponent(encodedEmail);
//         const token = decodeURIComponent(endcodedToken);

//         // Add event listener to form submission
//         document.getElementById('resetPasswordForm').addEventListener('submit', async function(event) {
//             event.preventDefault(); // Prevent default form submission

//             const newPassword = document.getElementById('newPassword').value;

//             // Send data to the server endpoint
//             const response = await fetch('https://localhost:7235/api/auth/reset-password', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     token: token,
//                     newPassword: newPassword
//                 })
//             });

//             // Handle response
//             if (response.ok) {
//                 alert('Password reset successfully!');
//                 // Redirect to login page or any other page
//                 window.location.href = '/login.html';
//             } else {
//                 const errorData = await response.json();
//                 alert(Error: ${errorData.detail});
//             }
//         });
//     </script>
// </body>
// </html>
