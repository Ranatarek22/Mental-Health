import React from "react";
// import { Facebook } from "./Facebook";
// import { Google } from "./Google";
import Button from "react-bootstrap/Button";
import LoginForm from "../../forms/login-form";
import { Link } from "react-router-dom";

export const Box = () => {
  const SignInWithGoogle = () => {
    window.location.href =
      "https://mentalmediator.somee.com/api/auth/external-login";
  };
  return (
    <div className="rectangle">
      <div className="content p-4">
        <div className="group-2">
          <p className="welcome-to-mental">
            <span className="text-wrapper">Welcome to </span>
            <span className="span">Mental</span>
          </p>
          <div className="text-wrapper-5">Sign in</div>
        </div>
        <div className="signup">
          <p>
            <span>No Account ?</span>
            <br />
            {/* <a href="#">Sign up</a> */}
            <Link to="/signup"> Sign up</Link>
          </p>
        </div>
      </div>
      <div className="group-3">
        <Button
          style={{
            backgroundColor: "#e8f1ff",
            borderColor: "#e8f1ff",
            color: "black",
            width: "70%",
          }}
          className="google"
          onClick={SignInWithGoogle}
        >
          Sign in with Google
        </Button>
      </div>

      <LoginForm />
      <div className="content-one">
        <p>
          <span>No Account ? </span>
          <Link to="/signup"> Sign up</Link>
        </p>
      </div>
    </div>
  );
};
