import React from "react";

const AuthBackground = (props) => {
  const { imgUrl } = props;
  return (
    <div className="login">
      <div className="right-side-wrapper">
        <div className="right-side">
          <div className="txt">
            <h1 className="text-wrapper">Welcome to our Mental Community</h1>
            <p className="text-wrapper-2">
              We're delighted to see you here. Join us to unlock a world of
              support, encouragement, and resources designed to uplift your
              mental well-being.
            </p>
          </div>
          <div className="artwork-register">
            <img alt="register-icon" src={imgUrl} srcSet={imgUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBackground;
