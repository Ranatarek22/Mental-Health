import React from "react";
import Container from "react-bootstrap/Container";

export function Communication() {
    return (
        <div
            className="container-fluid"
            style={{
                width: "100vw",
                marginLeft: "calc((100% - 100vw) / 2)",
                paddingLeft: "140px",
                paddingRight: "140px",
                paddingTop: "40px",
            }}
        >
            <div className="hero-section">
                <div className="up-section">
                    <div className="text">
                        <div className="text-up">
                            <h3
                                className="mb-5"
                                style={{
                                    fontSize: "4rem",
                                    fontWeight: 300,
                                }}
                            >
                                Share Your Thoughts Anonymously
                            </h3>
                            <p
                                className="mt-3"
                                style={{
                                    fontSize: "1.2rem",
                                    color: "#0000008a",
                                }}
                            >
                                We understand that discussing personal
                                experiences can be difficult, especially when it
                                comes to mental health. That’s why we offer an
                                anonymous post option
                            </p>

                            <p
                                className="mt-3"
                                style={{
                                    fontSize: "1.2rem",
                                    color: "#0000008a",
                                }}
                            >
                                You can share your thoughts, feelings, and
                                experiences without revealing your identity.
                                It’s a safe space where you can express yourself
                                freely.
                            </p>
                        </div>
                    </div>

                    <img
                        src={"/landingImages/depressed2.png"}
                        alt="hero"
                        style={{
                            width: "40%",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
