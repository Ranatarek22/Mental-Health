import React from "react";
// import { Facebook } from "./Facebook";
// import { Google } from "./Google";
import SignUpForm from "../../forms/sign-up-form";
import { Link } from "react-router-dom";

export const SignUpBox = () => {
    return (
        <div
            className="rectangle"
            style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
            }}
        >
            <div className="content p-4">
                <div className="group-2">
                    <p className="welcome-to-mental">
                        <span className="text-wrapper">Welcome to </span>
                        <span className="span">Nexus</span>
                    </p>
                    <div className="text-wrapper-5">Sign up</div>
                </div>
                <div className="signup">
                    <p>
                        <span>Have an Account ?</span>
                        <br />
                        {/* <a href="#">Sign up</a> */}
                        <Link to="/login"> Sign in</Link>
                    </p>
                </div>
            </div>
            <SignUpForm />

            <div className="content-one">
                <p>
                    <span>Have an account ? </span>
                    <Link to="/"> Sign in</Link>
                </p>
            </div>
        </div>
    );
};
