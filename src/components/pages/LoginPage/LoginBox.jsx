import React from "react";
import Button from "react-bootstrap/Button";
import LoginForm from "../../forms/login-form";
import { useNavigate } from "react-router-dom";
import TokenHandler from "./TokenHandler";

const LoginBox = () => {
  const navigate = useNavigate();

  const SignInWithGoogle = () => {
    window.location.href =
      "https://nexus-api-h3ik.onrender.com/api/auth/external-login";
  };

  return (
    <div className="rectangle">
      <TokenHandler />
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
            <a href="#" onClick={() => navigate("/signup")}>
              Sign up
            </a>
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
          <a href="#" onClick={() => navigate("/signup")}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginBox;
